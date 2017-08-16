import CryptoJS, { HmacSHA256 } from 'crypto-js';
import { Meteor } from 'meteor/meteor';

export function awsSignature(paramString) {

  stringToSign = "GET\n" + "ecs.amazonaws.com\n" + "/onca/xml\n" + paramString

  privateKey = Meteor.settings.amazon.AWSPrivateKey

  return encodeURIComponent(sha256(stringToSign, privateKey));
}

function sha256(stringToSign, secretKey) {
  var hex = CryptoJS.HmacSHA256(stringToSign, secretKey);
  return hex.toString(CryptoJS.enc.Base64);
}
