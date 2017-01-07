import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { GridList, GridTile } from 'material-ui/GridList';
import Product from './Product.jsx';

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
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
    maxWidth: 1024,
  },
  searchBar: {
    display: 'flex',
    flex: 1,
    borderRadius: 4,
    borderColor: 'transparent',
    outline: 0,
    height: 48,
    fontSize: 14,
    color: 'black',
    paddingLeft: 16,
    maxWidth: 1024,
  },
  searchContainer: {
    alignSelf: 'stretch',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 16,
  }
};

class ProductSearch extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      searchString: "",
      products: [],
    };
  }
  aggregateSearch(event) {
    // Cancels page refresh from form submission
    event.preventDefault();

    if (this.state.searchString.length > 0) {
      Meteor.call('aggregateSearch', this.state.searchString, (error,response) => {
        if (error) {
          console.log(error);
        } else {
          // response is an array of simple products
          this.setState({
            products: response
          });
        }
      });
    }
  }

  searchTextChanged(event) {
    searchText = event.target.value;
    this.state.searchString = searchText;
  }

  render() {
    return (
      <div style={styles.pageContainer}>
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
          style={styles.grid}>
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
