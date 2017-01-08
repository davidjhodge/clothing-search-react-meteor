import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

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

// Instead of a React Component, a stateless function is used for simplicity
const App = ( {children}) => (
  <div style={styles.horizontalContainer}>
    <div style={styles.verticalContainer}>
      <Navigation />
      { children }
      <Footer />
    </div>
  </div>
)

export default App;
