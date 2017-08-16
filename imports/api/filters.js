import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
var Future = Npm.require("fibers/future");

if (Meteor.isServer) {
  Meteor.methods({
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
          console.log(error);
          return [];
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
          // "limit": limit,
          "offset": 0,
          "pid": Meteor.settings.shopstyle.pid
        }
      }, function(error, response) {
        if (error) {
          console.log(error);
          return [];
        } else {
          brands = response.data.brands;
          if (brands && brands != 'undefined') {
            // Product response object exists
            var simpleBrands = []
            brands.forEach(function(brand, index) {
              simpleBrand = {}
              simpleBrand["id"] = brand["id"];
              simpleBrand["name"] = brand["name"];
              // If the first letter is a number, do not show this brand
              brandName = brand["name"];
              firstChar = brandName.charAt(0);
              otherCharsToRemove = ["!", "'", "(", "+", "."];
              if (isNaN(parseInt(firstChar)) &&
                  !otherCharsToRemove.includes(firstChar)) {
                simpleBrands.push(simpleBrand);
              }
            });
            // Sort brands
            simpleBrands.sort(function(a,b) {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
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
    'fetchPrices'() {

    },
    'fetchBrands'() {

    }
  });
}
