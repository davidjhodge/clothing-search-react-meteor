import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

export const Products = new Mongo.Collection('products');

if (Meteor.isServer) {
  Meteor.methods({
    /**
      Search the shopstyle api based on aquery
    **/
    'searchShopstyle'(searchQuery) {
      // Get products for a search query from searchShopstyle
      check(searchQuery, String);
      // Build url
      baseUrl = 'https://api.shopstyle.com/api/v2/products'
      // Make http call
      HTTP.get(baseUrl, {
        "params": {
          "fts": searchQuery,
          "offset": 0,
          "limit": 10,
          "pid": "uid625-33622625-46"
        }
      }, function(error, response) {
        if (error) {
          console.log(error);
        } else {
          products = response.data.products;
          console.log("Received " + products.length + " products");
        }
      });
    }
  });
}

if (Meteor.isClient) {
  Meteor.methods({
    'searchShopstyle'(searchQuery) {
      Meteor.call("server_searchShopstyle", searchQuery, function(error, response) {

      });
    }
  });
}
