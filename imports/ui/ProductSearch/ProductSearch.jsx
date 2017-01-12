import React, { Component, PropTypes } from 'react';
import Product from '../Product/Product.jsx';
import { Spinner } from '../spinner/Spinner.jsx';
import { RaisedButton } from 'material-ui';
import ReactScrollPagination from 'react-scroll-pagination'
import './ProductSearch.css';

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  headlineContainer: {
    minHeight: 100,
    maxWidth: 928,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    margin: 8,
  },
  headline: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 28,
    wordSpacing: 1.4,
  },
  headlineLink: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    textDecoration: 'none',
    color: 'black',
  },
  searchBar: {
    display: 'flex',
    flex: 1,
    borderRadius: 4,
    borderColor: 'transparent',
    outline: 0,
    color: 'black',
    maxWidth: 928,
    fontFamily: 'Lato',
  },
  searchContainer: {
    alignSelf: 'stretch',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 0,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 16,
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
    padding: 16,
    flex: 1,
    height: 'auto',
    alignSelf: 'center',
    maxWidth: 968,
  },
};

class ProductSearch extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      searchString: "mens clothes",
      products: [],
      page: 1,
      isLoading: false,
      isFirstPage: false, // Button should show on first results page only
      lastSearch: '',
    };
  }

  // This executes after the component renders (is mounted)
  componentDidMount() {
    this.executeSearch(this.state.searchString, this.state.page);
  }

  searchBarEntered(event) {
    // Cancels page refresh from form submission
    event.preventDefault();
    this.executeSearch(this.state.searchString, this.state.page);
  }

  // Helper to call the current search
  currentSearch() {
    this.executeSearch(this.state.searchString, this.state.page);
  }

  executeSearch(searchString, page) {
    // Abort request if pagination is already occuring for this query
    if (this.isLoading && searchString == this.state.lastSearch) {
      return;
    }

    if (searchString.length > 0 && page > 0) {
      // Start spinner
      this.state.isLoading = true;
      // Make API call
      Meteor.call('aggregateSearch', searchString, this.state.page, (error,response) => {
        if (error) {
          console.log(error);
        } else {
          // response is an array of simple products
          // If the last search is the same as this one, paginate
          if (this.state.lastSearch == searchString) {
            // Append products from existing response
            var arrayCopy = this.state.products.slice();
            arrayCopy.push.apply(arrayCopy, response),
            this.setState({
              products: arrayCopy
            });
          }
          else {
            // If the search query has changed, do not paginate and replace results
            this.setState({
              products: response
            });
          }
          // Now this is the last searched string
          this.state.lastSearch = searchString;
          // Increment page
          nextPage = page + 1;
          this.setState({
            page: nextPage
          });
        }
        // Stop spinner
        this.state.isLoading = false;
      });
    }
  }

  searchTextChanged(event) {
    // Each time the text field changes, update the state
    searchText = event.target.value;
    this.state.searchString = searchText;
    // Changing the search query resets the page
    this.state.page = 1;
  }
  // <span
  //   style={styles.headline}>
  //   Search Amazon and Shopstyle at the same time.
  // </span>
  render() {
    // Check if this page is 1 (meaning the next page is 2)
    this.state.isFirstPage = (this.state.page == 2)

    return (
      <div style={styles.pageContainer}>
        <div style={styles.headlineContainer}>
          <span
            className="headline">
            Search Amazon and Shopstyle at the same time.
          </span>
        </div>
        <form
          onSubmit={this.searchBarEntered.bind(this)}
          style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search 1000s of brands..."
            style={styles.searchBar}
            className="search-bar"
            onChange={this.searchTextChanged.bind(this)} />
        </form>
        <ul className="grid">
          {this.state.products.map((product, index) => (
            <li key={index}>
              <Product
                imageUrl={product.imageUrl}
                title={product.title}
                price={product.price}
                outboundUrl={product.outboundUrl} />
            </li>
          ))}
        </ul>
        <div
          className="loadMoreContainer"
          hidden={!this.state.isFirstPage || !this.state.isLoading}>
          <RaisedButton
            label="Load More"
            className="loadMore"
            onTouchTap={this.currentSearch.bind(this)} />
        </div>
        { !(this.state.page == 0 || this.state.isFirstPage) &&
            <ReactScrollPagination
              fetchFunc={this.currentSearch.bind(this)} />
        }
      </div>
    );
  }
}

export default ProductSearch;
