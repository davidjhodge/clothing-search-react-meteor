import React, { Component, PropTypes } from 'react';
import Product from '../Product/Product.jsx';
import { Spinner } from '../spinner/Spinner.jsx';
import { RaisedButton } from 'material-ui';
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
    height: 100,
    maxWidth: 928,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  headline: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
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
    height: 48,
    fontSize: 16,
    color: 'black',
    paddingLeft: 16,
    maxWidth: 928,
    fontFamily: 'Lato',
    letterSpacing: 0.5,
  },
  searchContainer: {
    alignSelf: 'stretch',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 0,
    marginLeft: 16,
    marginRight: 16,
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
      searchString: "",
      products: [],
      page: 1,
      isLoading: false,
      isFirstPageOnly: false, // manages state of "Load More" button
    };
  }

  // This executes after the component renders (is mounted)
  componentDidMount() {
    this.makeSearch("mens clothes", this.state.page);
  }

  aggregateSearch(event) {
    // Cancels page refresh from form submission
    event.preventDefault();
    this.makeSearch(this.state.searchString, this.state.page);
  }

  makeSearch(searchString, page) {
    if (searchString.length > 0 && page > 0) {
      // Start spinner
      this.state.isLoading = true;
      // Make API call
      Meteor.call('aggregateSearch', searchString, this.state.page, (error,response) => {
        if (error) {
          console.log(error);
        } else {
          // response is an array of simple products
          this.setState({
            products: response,
            page: page + 1
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
  }
  // <span
  //   style={styles.headline}>
  //   Search Amazon and Shopstyle at the same time.
  // </span>
  render() {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.headlineContainer}>
          <span style={styles.headline}>Search</span>
          <span style={styles.headline}>&nbsp;</span>
          <a
            style={styles.headlineLink}
            href="https://www.amazon.com/"
            target="_blank">Amazon</a>
          <span style={styles.headline}>&nbsp;</span>
          <span style={styles.headline}>and</span>
          <span style={styles.headline}>&nbsp;</span>
          <a
            style={styles.headlineLink}
            href="http://www.shopstyle.com/"
            target="_blank">Shopstyle</a>
          <span style={styles.headline}>&nbsp;</span>
          <span style={styles.headline}>at the same time.</span>
        </div>
        <form
          onSubmit={this.aggregateSearch.bind(this)}
          style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search 1000s of brands..."
            style={styles.searchBar}
            onChange={this.searchTextChanged.bind(this)} />
        </form>
        <div
          style={styles.grid}
          hidden={this.state.isLoading}>
        {this.state.products.map((product) => (
            <Product
              key={product.id}
              imageUrl={product.imageUrl}
              title={product.title}
              price={product.price}
              outboundUrl={product.outboundUrl} />
          ))}
        </div>
        <div
          className="loadMoreContainer"
          hidden={this.state.isFirstPageOnly}>
          <RaisedButton
            label="Load More"
            className="loadMore" />
        </div>
      </div>
    );
  }
}

export default ProductSearch;
