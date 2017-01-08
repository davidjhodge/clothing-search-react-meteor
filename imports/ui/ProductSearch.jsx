import React, { Component, PropTypes } from 'react';
import Product from './Product.jsx';
import { Spinner } from './spinner/Spinner.jsx';

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
  },
  headline: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 28,
    // alignSelf: 'center',
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
  },
  searchContainer: {
    alignSelf: 'stretch',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 16,
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
    minHeight: 600,
  },
};

class ProductSearch extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      searchString: "",
      products: [],
      isLoading: false,
    };
  }
  aggregateSearch(event) {
    // Cancels page refresh from form submission
    event.preventDefault();

    if (this.state.searchString.length > 0) {
      // Start spinner
      this.state.isLoading = true;
      // Make API call
      Meteor.call('aggregateSearch', this.state.searchString, (error,response) => {
        if (error) {
          console.log(error);
        } else {
          // response is an array of simple products
          this.setState({
            products: response
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

  render() {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.headlineContainer}>
          <span
            style={styles.headline}>
            Search Amazon and Shopstyle at the same time.
          </span>
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

      </div>
    );
  }
}

export default ProductSearch;
