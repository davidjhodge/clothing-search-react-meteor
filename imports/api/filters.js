import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
var Future = Npm.require("fibers/future");

if (Meteor.isServer) {
  Meteor.methods({
    'fetchCategories'() {
      var baseUrl = 'https://api.shopstyle.com/api/v2/categories'

      var future = new Future();
      // Make http call
      HTTP.get(baseUrl, {
        "params": {
          "depth": 2,
          "pid": Meteor.settings.shopstyle.pid
        }
      }, function(error, response) {
        if (error) {
          callback(error, null);
          console.log(error);
        } else {
          categories = response.data.categories;
          if (categories && categories != 'undefined') {
            // Product response object exists
            var simpleCategories = []
            categories.forEach(function(category, index) {
              simpleCat = {}
              simpleCat["id"] = category["id"];
              simpleCat["name"] = category["name"];
              simpleCat["shortName"] = category["shortName"];
              if (index < 10) {
                simpleCategories.push(simpleCat);
              }
            });
            future.return(simpleCategories);
          } else {
            // Product response does not exist
            console.log("Response object is undefined.");
            future.return([]);
          }
        }
      });

      future.wait();
      // Returns either an empty array or a list of categories

      return future.value;
    },
    'fetchPrices'() {
      var baseUrl = 'https://api.shopstyle.com/api/v2/products/histogram?filters=Price'

      var future = new Future();
      // Make http call
      HTTP.get(baseUrl, {
        "params": {
          "pid": Meteor.settings.shopstyle.pid
        }
      }, function(error, response) {
        if (error) {
          callback(error, null);
          console.log(error);
        } else {
          priceRanges = response.data.priceHistogram;
          if (priceRanges && priceRanges != 'undefined') {
            // Product response object exists
            future.return(priceRanges);
          } else {
            // Product response does not exist
            console.log("Response object is undefined.");
            future.return([]);
          }
        }
      });

      future.wait();
      // Returns either an empty array or a list of categories

      return future.value;
    },
    'fetchBrands'() {
      var baseUrl = 'https://api.shopstyle.com/api/v2/brands'

      var future = new Future();
      // Make http call
      HTTP.get(baseUrl, {
        "params": {
          "limit": 10,
          "offset": 0,
          "pid": Meteor.settings.shopstyle.pid
        }
      }, function(error, response) {
        if (error) {
          callback(error, null);
          console.log(error);
        } else {
          brands = response.data.brands;
          if (brands && brands != 'undefined') {
            // Product response object exists
            var simpleBrands = []
            brands.forEach(function(brand, index) {
              simpleBrand = {}
              simpleBrand["id"] = brand["id"];
              simpleBrand["name"] = brand["name"];
              simpleBrands.push(simpleBrand);
            });
            future.return(simpleBrands);
          } else {
            // Product response does not exist
            console.log("Response object is undefined.");
            future.return([]);
          }
        }
      });

      future.wait();
      // Returns either an empty array or a list of categories

      return future.value;
    }
  });
}

if (Meteor.isClient) {
  Meteor.methods({
    'fetchCategories'() {

    },
    'fetchPrices'() {

    },
    'fetchBrands'() {

    }
  });
}
