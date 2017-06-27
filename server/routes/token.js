var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs');

router.get('/jwt', function(req, res, next) {

  var payload = { foo: 'bar' };
  var secretOrPrivateKey = 'abcd';
  var expiresIn = 1;
  var token = jwt.sign(payload, secretOrPrivateKey);
  console.log('token0:' + token);

  // 1小时
  var token1 = jwt.sign(payload, secretOrPrivateKey, {
    expiresIn: expiresIn,
    audience: 'audience',
    issuer: 'issuer',
    jwtid: 'jwtid',
    subject: 'subject',
    noTimestamp:false,
    header: {
      'typ': 'JWT',
      'alg': 'HS256'
    }
  });
  console.log('token1:' + token1);
  // 1小时
  var token2 = jwt.sign(payload, secretOrPrivateKey, {
    expiresIn: '1h'
  });
  console.log('token2:' + token2);
  // 1小时,有不同
  var token3 = jwt.sign({
    foo: 'bar',
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  }, secretOrPrivateKey);
  console.log('token3:' + token3);

  // var decoded = jwt.decode(token1, secretOrPrivateKey);

  res.send(token1);
});

// iss: jwt签发者
// sub: jwt所面向的用户
// aud: 接收jwt的一方
// exp: jwt的过期时间，这个过期时间必须要大于签发时间
// nbf: 定义在什么时间之前，该jwt都是不可用的.
// iat: jwt的签发时间
// jti: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。
router.get('/jwt2', function(req, res, next) {
  var secretOrPrivateKey = 'abcd';
  var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE0OTg1NTU5MDMsImV4cCI6MTQ5ODU1NTkwNCwiYXVkIjoiYXVkaWVuY2UiLCJpc3MiOiJpc3N1ZXIiLCJzdWIiOiJzdWJqZWN0IiwianRpIjoiand0aWQifQ.1ZzI4IzzGb2Eez-v0uMtVUuRE6Yq7gN6lbTz_PlqRaA';
  var decoded = jwt.decode(token, {complete: true});
  console.log(decoded.header);
  res.send(decoded);
});
module.exports = router;
