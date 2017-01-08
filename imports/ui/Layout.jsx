import React, { Component } from 'react';
import ProductSearch from './ProductSearch.jsx';
import Navigation from './Navigation.jsx';
import Footer from './Footer.jsx';

const styles = {
  horizontalContainer: {
    flex: 1,
    alignItems: 'stretch',
    background: 'transparent',
    flexDirection: 'row',
  },
  verticalContainer: {
    flexDirection: 'column',
    flex: 1,
    background: '#f5f5f5',
  },
}

class Layout extends Component {
  render() {
    return (
      <div style={styles.horizontalContainer}>
        <div style={styles.verticalContainer}>
          <Navigation />
          <ProductSearch />
          <Footer />
        </div>
      </div>
    );
  }
}

export default Layout;
