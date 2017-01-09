import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import Navigation from './Navigation.jsx';
import Footer from './Footer/Footer.jsx';
import './App.css';

// Instead of a React Component, a stateless function is used for simplicity
const App = ( {children}) => (
  <div className="parentContainer">
      <Navigation />
      <div className="contentsContainer">
        { children }
      </div>
      <Footer />
  </div>
)

export default App;
