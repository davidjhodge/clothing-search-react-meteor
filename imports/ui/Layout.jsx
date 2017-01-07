import React, { Component } from 'react';
import ProductSearch from './ProductSearch.jsx';

const styles = {
  horizontalContainer: {
    margin: 0,
    flexDirection: 'row',
    flex: 1,
    background: 'transparent',
    alignSelf: 'stretch',
  },
  verticalContainer: {
    margin: 0,
    flexDirection: 'column',
    flex: 1,
    background: '#f5f5f5',
    alignSelf: 'stretch',
  },
}

class Layout extends Component {
  render() {
    return (
      <div style={styles.horizontalContainer}>
        <div style={styles.verticalContainer}>
          <ProductSearch />
        </div>
      </div>
    );
  }
}

export default Layout;
