var jwt = require('jsonwebtoken');

module.exports = {
  // iss: jwt签发者
  // sub: jwt所面向的用户
  // aud: 接收jwt的一方
  // exp: jwt的过期时间，这个过期时间必须要大于签发时间
  // nbf: 定义在什么时间之前，该jwt都是不可用的.
  // iat: jwt的签发时间
  // jti: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。
  buildJwt: function(payload, secretOrPrivateKey, expiresIn) {
    return jwt.sign(payload, secretOrPrivateKey, {
      expiresIn: expiresIn
        // audience: 'audience',
        // issuer: 'issuer',
        // jwtid: 'jwtid',
        // subject: 'subject',
        // noTimestamp: false,
        // header: {
        //   'typ': 'JWT',
        //   'alg': 'HS256'
        // }
    });
  },
  decode:function(jwtToken){
    return jwt.decode(jwtToken,'123456');
  }
};
