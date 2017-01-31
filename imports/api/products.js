import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
var Future = Npm.require("fibers/future");
import Api from './api.js';

if (Meteor.isServer) {
  Meteor.methods({
    'aggregateSearch'(searchQuery, page, filters) {
      this.unblock();

      check(searchQuery, String);
      check(page, Number);
      check(filters, Object);

      // Create futures to manage handling multiple async tasks at once
      var numRequests = 2
      var range = _.range(numRequests);
      var futures = _.map(range, function(index) {
        var future = new Future();

        switch (index) {
          // Get results from Shopstyle
          case 0:
            Api.searchShopstyle(searchQuery, page, filters, function(error,response) {
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
            Api.searchAmazon(searchQuery, page, filters, function(error,response) {
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
    },
    'typeaheadSearch'(searchQuery) {
      check(searchQuery, String);

      var baseUrl = 'https://api.shopstyle.com/api/v2/products'

      var future = new Future();
      // Make http call
      HTTP.get(baseUrl, {
        "params": {
          "fts": searchQuery,
          "limit": 10,
          "pid": Meteor.settings.shopstyle.pid
        }
      }, function(error, response) {
        if (error) {
          callback(error, null);
          console.log(error);
        } else {
          products = response.data.products;
          if (products && products != 'undefined') {
            // Product response object exists
            var suggestedSearches = []
            products.forEach(function(product) {
              title = product["brandedName"];
              if (title != 'undefined') {
                suggestedSearches.push(title);
              }
            });
            future.return(suggestedSearches);
          } else {
            // Product response does not exist
            console.log("Response object is undefined.");
            future.return([]);
          }
        }
      });

      future.wait();
      // Returns either an empty array or a list of searches
      return future.value;
    }
  });
}

if (Meteor.isClient) {
  Meteor.methods({
    'aggregateSearch'(searchQuery, page, filters) {

    },
    'typeaheadSearch'(searchQuery) {

    },
  });
}
