import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class Collections extends Component {
  render() {
    return (
      <div></div>
    );
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
    recentCollections: [],
  };
}, Collections);
