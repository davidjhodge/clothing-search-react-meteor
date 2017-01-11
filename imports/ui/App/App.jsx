import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import Navigation from '../Navigation/Navigation.jsx';
import Footer from '../Footer/Footer.jsx';
import './App.css';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Instead of a React Component, a stateless function is used for simplicity
const App = ( {children}) => (
  <MuiThemeProvider>
    <div className="parentContainer">
        <Navigation />
        <div className="contentBackground">
          <div className="contentsContainer">
            { children }
          </div>
        </div>
        <Footer />
    </div>
  </MuiThemeProvider>
)

export default App;
