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

    paramString = (
      "fts=" + encodeURI(searchQuery) + "&" +
      "offset=" + page + "&" +
      "limit=" + 10 + "&" +
      "pid=" + Meteor.settings.shopstyle.pid
    );

    url = baseUrl + "?" + paramString;

    filterParams = this.addShopstyleFilters(filters);
    url += ("&" + filterParams);
    console.log(url);

    // Make http call
    HTTP.get(url, function(error, response) {
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

  static addShopstyleFilters(filters) {
    genderString = "";
    gender = filters.gender;
    if (gender == "m") {
      genderString = "men";
    } else {
      genderString = "women";
    }
    genderString += "&";

    priceString = "";
    priceRanges = filters.priceRanges;
    if (priceRanges.length > 0) {
      priceRangeParams = this.shopstyleArrayToParamString(priceRanges, "price");
      priceString = priceRangeParams;
      // Add & to end. It will be removed if no more params are added
      if (priceRangeParams.length > 0) {
          priceString += "&";
      }
    }

    brandString = "";
    brands = filters.brands;
    if (brands.length > 0) {
      brandParams = this.shopstyleArrayToParamString(brands, "brand");
      brandString = brandParams;
      // Add & to end. It will be removed if no more params are added
      if (brandParams.length > 0) {
          brandString += "&";
      }
    }

    paramString = "";

    // Concatenate each set of parameters
    // These are done at the end of this method to make maintainability easier
    if (genderString.length > 0) {
      paramString += ("cat=" + genderString);
    }

    if (priceString.length > 0) {
      paramString += priceString;
    }
    if (brandString.length > 0) {
      paramString += brandString;
    }

    if (paramString.length > 0) {
      // Remove final "&" if it exists
      lastChar = paramString.substr(paramString.length - 1);
      if (lastChar == "&") {
        paramString = paramString.slice(0, -1);
      }
    }
    return paramString;
  }

  static shopstyleArrayToParamString(array, type) {
    prefix = "";
    if (type == "price") {
      prefix = "p";
    } else if (type == "brand") {
        prefix = "b";
    }
    paramString = "";
    if (array.length > 0) {
      array.forEach(function(item) {
        item = item.id;

        if (typeof item === 'string') {
          paramString += ("fl=" + prefix + item + "&");
        }
      });

      // paramString = paramString.slice(0, -1);
      return paramString;
    }

    return "";
  }

  static searchAmazon(searchQuery, page, filters, callback) {
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

    // Brand Filtering
    if (filters.brands.length > 0) {
      brandParamString = this.amazonArrayToParamString(filters.brands);
      params.push("Brand=" + brandParamString);
    }

    params.push("Keywords=" + encodeURIComponent(searchQuery));

    // Price Range Filtering
    if (filters.priceRanges.length > 0) {
      priceRange = this.amazonPriceExtractor(filters.priceRanges);
      params.push("MaximumPrice=" + priceRange.max * 100);
      params.push("MinimumPrice=" + priceRange.min * 100);
    }

    params.push("Operation=" + "ItemSearch");
    params.push("ResponseGroup=" +encodeURIComponent("Images,ItemAttributes,Offers"));

    // Gender Filtering
    searchIndex="Fashion";
    if (filters.gender == "m") {
      searchIndex = "FashionMen";
    } else if (filters.gender == "f") {
      searchIndex = "FashionWomen";
    }
    params.push("SearchIndex=" + searchIndex);
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

  static amazonPriceExtractor(prices) {
    if (prices.length > 0) {
      possiblePrices = [];

      min = 0;
      max = 99999;

      prices.forEach((priceObj) => {
        priceString = priceObj.name.substr(1);
        // Check 5000+ case
        if (priceString.substr(0,5) == "5,000") {
          possiblePrices.push("5000");
          possiblePrices.push("99999");
        }
        // Handle all other price ranges manually
        lowerBound = priceString.substr(0,priceString.indexOf(' '));
        // Manually apply filters based on known price groups
        if (lowerBound == "0") {
          possiblePrices.push(0);
          possiblePrices.push(25);
        } else if (lowerBound == "25") {
          possiblePrices.push(25);
          possiblePrices.push(50);
        } else if (lowerBound == "50") {
          possiblePrices.push(50);
          possiblePrices.push(100);
        }
        else if (lowerBound == "100") {
          possiblePrices.push(100);
          possiblePrices.push(150);
        }
        else if (lowerBound == "150") {
          possiblePrices.push(150);
          possiblePrices.push(250);
        }
        else if (lowerBound == "250") {
          possiblePrices.push(250);
          possiblePrices.push(500);
        }
        else if (lowerBound == "500") {
          possiblePrices.push(500);
          possiblePrices.push(1000);
        }
        else if (lowerBound == "1,000") {
          possiblePrices.push(1000);
          possiblePrices.push(2500);
        }
        else if (lowerBound == "2,500") {
          possiblePrices.push(2500);
          possiblePrices.push(5000);
        }

        min = Math.min(...possiblePrices);
        max = Math.max(...possiblePrices);
      });

      return {
        "min": min,
        "max": max,
      };
    }
  }

  static amazonArrayToParamString(array) {
    paramString = "";
    if (array.length > 0) {
      array.forEach(function(item) {
        item = item.name;

        if (typeof item === 'string') {
          // Remove spaces and hope (yes hope) that Amazon recognizes the Brand key
          item = item.replace(/\s/g, '');
          paramString += (item + ",");
        }
      });

      // Remove last character if it's a comma
      lastChar = paramString.slice(-1);
      if (lastChar == ",") {
        paramString = paramString.slice(0, -1);
      }

      // paramString = paramString.slice(0, -1);
      return paramString;
    }

    return "";
  }
}
