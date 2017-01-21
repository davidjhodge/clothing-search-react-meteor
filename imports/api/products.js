import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
var Future = Npm.require("fibers/future");
import Api from './api.js';

if (Meteor.isServer) {
  Meteor.methods({
    'aggregateSearch'(searchQuery, page) {

      check(searchQuery, String);
      check(page, Number);

      // Create futures to manage handling multiple async tasks at once
      var numRequests = 2
      var range = _.range(numRequests);
      var futures = _.map(range, function(index) {
      var future = new Future();

        switch (index) {
          // Get results from Shopstyle
          case 0:
            Api.searchShopstyle(searchQuery, page, function(error,response) {
              if (error) {
                console.error(error);
              } else {

                future.return(response);
              }
            });
            return future;
            break;

          // Get search results on Amazon
          case 1:
            Api.searchAmazon(searchQuery, page, function(error,response) {
              if (error) {
                console.error(error);
              } else {
                future.return(response);
              }
            });
            return future;
            break;

          default:
            return future;
            break;
        }
      });

      // Wait for all results to return as futures
      var results = _.map(futures, function(future, index) {
        // Ensure the future exists
        if (typeof future != "undefined") {
          // Wait for the future to return a result
          var result = future.wait();
          if (result == "undefined") {
            return [];
          }

          return result;
        }
      });

      // Merges the results of all product arrays
      allProducts = [].concat.apply([], results);

      return allProducts;
    }
  });
}

if (Meteor.isClient) {
  Meteor.methods({
    'aggregateSearch'(searchQuery, page) {

    },
  });
}
