import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
var Future = Npm.require("fibers/future");
import Api from './api.js';

export const Products = new Mongo.Collection('products');

if (Meteor.isServer) {
  Meteor.methods({
    'aggregateSearch'(searchQuery) {

      check(searchQuery, String);

      // Create futures to manage handling multiple async tasks at once
      var numRequests = 2
      var range = _.range(numRequests);
      var futures = _.map(range, function(index) {
        var future = new Future();

        switch (index) {
          // Get results from Shopstyle
          case 0:
            Api.searchShopstyle(searchQuery, function(error,response) {
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
            Api.searchAmazon(searchQuery, function(error,response) {
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
    'aggregateSearch'(searchQuery) {

    },
  });
}