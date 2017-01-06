import CryptoJS, { HmacSHA256 } from 'crypto-js';


export function awsSignature(paramString) {

  stringToSign = "GET\n" + "ecs.amazonaws.com\n" + "/onca/xml\n" + paramString

  privateKey = "iryC4E0zSPkuiOeUkxH+sxPU271joY/jpPFIv1Oq"

  return encodeURIComponent(sha256(stringToSign, privateKey));
}

function sha256(stringToSign, secretKey) {
  var hex = CryptoJS.HmacSHA256(stringToSign, secretKey);
  return hex.toString(CryptoJS.enc.Base64);
}
