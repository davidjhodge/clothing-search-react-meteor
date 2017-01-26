import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Button } from 'react-bootstrap';
import ReactScrollPagination from 'react-scroll-pagination';

import Product from '../Product/Product.jsx';
import { Spinner } from '../spinner/Spinner.jsx';
import Filter from '../Filter/Filter.jsx';
import './ProductSearch.css';

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
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
  horizontalCentering: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }
};

class ProductSearch extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      searchString: "mens clothes",
      products: [],
      suggestedSearches: [],
      page: 1,
      isLoading: false,
      isFirstPage: false, // Button should show on first results page only
      lastSearch: '',
      filters: {"categories": [], "brands": []},
      lastFilters: {},
    };
  }

  // This executes after the component renders (is mounted)
  componentDidMount() {
    this.currentSearch();
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

  loadMore() {
    // Abort request if pagination is already occuring for this query
    if (this.state.isLoading && this.state.searchString == this.state.lastSearch) {
      return;
    }

    this.executeSearch(this.state.searchString, this.state.page);
  }

  executeSearch(searchString, page) {
    if (searchString.length > 0 && page > 0) {
      // Start spinner
      this.state.isLoading = true;
      // Make API call
      Meteor.call('aggregateSearch', searchString,
        this.state.page,
        this.state.filters,
        (error,response) => {
        if (error) {
          console.log(error);
        } else {
          // response is an array of simple products
          // If the last search is the same as this one, paginate
          if (this.state.lastSearch == searchString &&
              this.state.lastFilters == this.state.filters) {
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
          // And these are the last filters
          this.state.lastFilters = this.state.filters;
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
    // Update autocomplete with typeahead search
    this.typeaheadSearch();
    // Changing the search query resets the page
    this.state.page = 1;
  }

  typeaheadSearch() {
    Meteor.call('typeaheadSearch', this.state.searchString, (error,response) => {
      console.log(JSON.stringify(response));
      if (!error) {
        this.setState({
          suggestedSearches: response
        });
      }
    });
  }

  // Filtering
  filtersUpdated(categories, prices, brands) {
    var newFilters = {
      "categories": categories,
      "brands": brands
    };
    // if (prices.min || prices.max) {
    //   filters["prices"] = { "min": prices.min, "max": prices.max};
    // } else {
    //   filters["prices"] = {};
    // }

    this.state.filters = newFilters;
    this.state.page = 1;
    this.currentSearch();
  }

  render() {
    // Check if this page is 1 (meaning the next page is 2)
    this.state.isFirstPage = (this.state.page == 2)

    return (
      <div className="product-search-container">
        <Filter onFilterChange={this.filtersUpdated.bind(this)}/>
        <div style={styles.horizontalCentering}>
          <div className="constrained" style={styles.pageContainer}>
            <h1 hidden={true}>Search Clothing</h1>
            <div style={styles.headlineContainer}>
              <span
                className="headline">
                Search Amazon and Shopstyle at the same time.
              </span>
            </div>
            <form
              onSubmit={this.searchBarEntered.bind(this)}
              style={styles.searchContainer}
              className="search-container">
              <input
                type="text"
                placeholder="Search 1000s of brands..."
                style={styles.searchBar}
                className="search-bar"
                onChange={this.searchTextChanged.bind(this)} />
              <button
                className="search-button"
                onClick={this.currentSearch.bind(this)}
                >
                <img
                  src="images/search-glass.svg"
                  className="search-icon" />
              </button>
            </form>
            <ul className="grid">
              {this.state.products.map((product, index) => (
                <li
                  key={index}>
                  <Product
                    imageUrl={product.imageUrl}
                    title={product.title}
                    price={product.price}
                    {...this.props.currentUser ? {salePrice: product.salePrice} : {}}
                    outboundUrl={product.outboundUrl} />
                </li>
              ))}
            </ul>
            <div
              className="loadMoreContainer"
              hidden={!this.state.isFirstPage}>
              <button
                className="uk-button uk-button-default loadMore"
                onClick={this.currentSearch.bind(this)}>
                Load More
              </button>
            </div>
            { !(this.state.page == 1 || this.state.isFirstPage) &&
                <ReactScrollPagination
                  fetchFunc={this.loadMore.bind(this)} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, ProductSearch);
