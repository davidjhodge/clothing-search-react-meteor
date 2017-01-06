import React, { Component } from 'react';
import ProductSearch from './ProductSearch.jsx';

const styles = {
  container: {
    maxWidth: 600,
    margin: 0,
    flexDirection: 'column',
    flex: 1,
    background: 'white',
  },
}

class Layout extends Component {
  render() {
    return (
      <div className="container" style={styles.container}>
        <ProductSearch />
      </div>
    );
  }
}

export default Layout;
