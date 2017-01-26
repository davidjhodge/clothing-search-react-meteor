import { HTTP } from 'meteor/http';
import { awsSignature } from '../../utils/awsSignature.js';
import { parseString } from 'xml2js';
import { get } from 'lodash';

export default class Api {
   static searchShopstyle(searchQuery, page, filters, callback) {
    // Get products for a search query from searchShopstyle
    check(searchQuery, String);
    check(page, Number);

    // Page number is (page - 1) * limit
    limit = 10;
    page = (page - 1) * limit;

    var baseUrl = 'https://api.shopstyle.com/api/v2/products';

    var params = {
      "fts": searchQuery,
      "offset": page,
      "limit": 10,
      "pid": Meteor.settings.shopstyle.pid
    }

    params = this.addShopstyleFilters(filters, params);

    // Make http call
    HTTP.get(baseUrl, {
      "params": params,
    }, function(error, response) {
      if (error) {
        callback(error, null);
        console.log(error);
      } else {
        products = response.data.products;
        if (products && products != 'undefined') {
          // Product response object exists
          simpleProducts = []
          products.forEach(function(product) {
            simple = {};
            simple["id"] = product["id"];
            simple["title"] = product["brandedName"];
            simple["brand"] = get(product, "brand.name");
            simple["price"] = product["priceLabel"];
            simple["salePrice"] = product["salePriceLabel"];
            simple["imageUrl"] = get(product, "image.sizes.Large.url");
            simple["outboundUrl"] = product["clickUrl"];
            simple["source"] = "shopstyle";
            simpleProducts.push(simple)
          });
          callback(null, simpleProducts);
        } else {
          // Product response does not exist
          callback("Response object is undefined.", null);
        }
      }
    });
  }

  static addShopstyleFilters(filters, params) {
    categories = filters.categories;
    if (categories.length > 0) {
      categoryParams = this.arrayToParamString(categories);
      params["cat"] = categoryParams;
    }

    priceRanges = filters.priceRanges;
    if (priceRanges.length > 0) {
      priceRangeParams = this.priceArrayToParamString(priceRanges);
      params["fl"] = priceRangeParams;
    }

    brands = filters.brands;
    if (brands.length > 0) {
      brandParams = this.arrayToParamString(brands);
      params["b"] = brandParams;
    }

    return params;
  }

  static arrayToParamString(array) {
    paramString = "";
    if (array.length > 0) {
      array.forEach(function(item) {
        if (typeof key === 'string') {}
        paramString = paramString + item + ",";
      });

      paramString = paramString.slice(0, -1);
      return paramString;
    }

    return "";
  }

  // Adds a p in front of each price id
  static priceArrayToParamString(array) {
    paramString = "";
    if (array.length > 0) {
      array.forEach(function(item) {
        if (typeof key === 'string') {}
        paramString = paramString + "p" + item + ",";
      });

      paramString = paramString.slice(0, -1);
      return paramString;
    }

    return "";
  }

  static searchAmazon(searchQuery, page, callback) {
    // Get products for a search query from Amazon
    check(searchQuery, String);
    check(page, Number);

    // Amazon only returns the first 10 pages
    if (page >= 10) {
      callback("Amazon doesn't return more than 10 pages of results", null);
    }

    var date = new Date();
    var baseUrl = "http://ecs.amazonaws.com/onca/xml"
    var params = [];
    params.push("AWSAccessKeyId=" + Meteor.settings.amazon.AWSAccessKeyId);
    params.push("AssociateTag=" + Meteor.settings.amazon.AssociateTag);
    params.push("Keywords=" + encodeURIComponent(searchQuery));
    params.push("Operation=" + "ItemSearch");
    params.push("ResponseGroup=" +encodeURIComponent("Images,ItemAttributes,Offers"));
    params.push("SearchIndex=" + "Fashion");
    params.push("ItemPage=" + page.toString())
    params.push("Service=" + "AWSECommerceService");
    params.push("Timestamp=" + encodeURIComponent(date.toISOString()));
    params.push("Version=" + "2011-08-01");

    params.sort();
    paramString = params.join('&');

    signature = awsSignature(paramString);

    paramString = paramString + "&Signature=" + signature;

    HTTP.get(baseUrl, {"query": paramString}, function(error,response) {
      if (error) {
        callback(error, null);
        console.log(error);
      } else {

        // Parse response (as xml) to json
        parseString(response.content, function (parseError, result) {
          if (parseError) {
            callback(parseError, null);
            console.log("xml parsing error");
          } else {
            // Success
            jsonResponse = result

            if (jsonResponse) {
              simpleItems = [];

              items = get(jsonResponse,'ItemSearchResponse.Items[0].Item');
              if (items && items != 'undefined') {
                // Response exists
                items.forEach(function(item) {

                  simple = {};
                  simple["id"] = get(item, 'ASIN[0]');
                  simple["title"] = get(item, 'ItemAttributes[0].Title[0]');
                  simple["brand"] = get(item, 'ItemAttributes[0].Brand[0]');
                  simple["price"] = get(item, 'ItemAttributes[0].ListPrice[0].FormattedPrice[0]');
                  simple["salePrice"] = null;
                  simple["imageUrl"] = get(item, 'MediumImage[0].URL[0]');
                  simple["outboundUrl"] = get(item, 'DetailPageURL[0]');
                  simple["source"] = "amazon";
                  // Ensure object is valid
                  if (typeof simple["id"] !== "undefined" &&
                      typeof simple["title"] !== "undefined" &&
                      typeof simple["brand"] !== "undefined" &&
                      typeof simple["price"] !== "undefined" &&
                      typeof simple["imageUrl"] !== "undefined" &&
                      typeof simple["outboundUrl"] !== "undefined") {
                      simpleItems.push(simple)
                  }
                });

                callback(null, simpleItems);
              } else {
                // Request was successful but response does not exist
                callback("Response object is undefined.", null);
              }
            }
          }
        });
      }
    });
  }
}
