var express = require('express');
var router = express.Router();
var moment = require('moment');
const jwtService = require('./jwtService.js');
const jwt = require('jsonwebtoken');
const base64url = require('base64url');
const jwa = require('jwa')('HS256');

/* GET home page. */
router.get('/', function(req, res, next) {
  // 自己生产token
  // Header
  let header = base64url(JSON.stringify({
    "alg": "HS256",
    "typ": "JWT"
  }));
  // Payload
  let serverTime = moment(new Date().getTime()).unix();
  let payload = base64url(JSON.stringify({
    test: 123,
    iat:serverTime
  }));
  // Signature
  let signature = jwa.sign(header+'.'+payload,'secret');
  // console.log(header+'.'+payload+'.'+signature);

  // jwt自动生成
  let jwtToken = jwt.sign({test:123,iat:serverTime},'secret');
  // console.log(jwtToken);
  let result = jwt.decode(jwtToken,  'secret');
  res.json({
    myToken:header+'.'+payload+'.'+signature,
    jwtToken:jwtToken
  });
});

module.exports = router;
