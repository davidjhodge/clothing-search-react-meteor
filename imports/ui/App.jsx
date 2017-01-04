import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import RaisedButton from 'material-ui/RaisedButton';


class App extends Component {
  searchProducts() {
    Meteor.call('searchShopstyle', "men");
  }

  render() {
    return(
      <MuiThemeProvider>
        <div className="container">
          <RaisedButton
            label="Get Products"
            primary={true}
            onTouchTap={this.searchProducts.bind(this)} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
