import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Responsive  from 'react-grid-layout';
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

import { GridList, GridTile } from 'material-ui/GridList';
import Product from './Product.jsx';

const styles = {
  grid: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    display: 'inline-block',
    flex: 1,
  },
};
//
// background: #f5f5f5;
// padding: 16px;
// /*overflow-y: auto;*/
// display: inline-block;
// margin: auto;

class ProductSearch extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      products: []
    };
  }
  aggregateSearch() {
    Meteor.call('aggregateSearch', 'mens clothing', (error,response) => {
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

  render() {
    var layout = [{i: 'default', x: 0, y: 0, w:2, h:8, static:true}];
    return (
      <div>
        <RaisedButton
          label="Aggregate Search"
          style={{margin: 16}}
          onTouchTap={this.aggregateSearch.bind(this)} />
        <Responsive
          className="layout"
          style={styles.grid}
          layout={layout}
          cols={8}
          rowHeight={30}
          width={600}>
          {this.state.products.map((product) => (
            <Product
              key={product.id}
              imageUrl={product.imageUrl}
              title={product.title}
              price={product.price}
              outboundUrl={product.outboundUrl} />
          ))}
        </Responsive>
      </div>
    );
  }
}

export default ProductSearch;
