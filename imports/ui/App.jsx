import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Layout from './Layout.jsx';

class App extends Component {
  render() {
    return(
      <MuiThemeProvider>
        <Layout />
      </MuiThemeProvider>
    );
  }
}

export default App;
