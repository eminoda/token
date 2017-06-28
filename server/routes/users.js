var express = require('express');
var router = express.Router();
var jwtService = require('./jwtService.js');
var moment = require('moment');

// 登录页面
router.get('/login', function(req, res, next) {
  res.render('login.pug');
});
/**
 * [登录]
 * @Author   ShiXingHao
 * @DateTime 2017-06-27T18:10:05+0800
 */
router.post('/login',function(req,res,next){
  let user = req.body;
  // 验证用户
  if(user&&user.userName==='aaaa'&&user.password==='a111111'){
    // 验证通过
    let jwtToken = jwtService.buildJwt({
      userName:user.userName
    },'secret',10);
    // token保存到客户端
    res.cookie('jwtToken', jwtToken);
    res.render('loginSuccess.pug');
  }else{
    next(new Error('用户名or密码错误'));
  }
});
/**
 * [获取用户信息]
 * @Author   ShiXingHao
 * @DateTime 2017-06-27T14:25:17+0800
 */
router.get('/userInfo',function(req,res,next){

  let serverTime = moment(new Date().getTime()).unix();
  // 获取token
  let token = req.headers.jwtToken||req.body.jwtToken||req.cookies.jwtToken;
  // 解密token
  let deToken = jwtService.decode(token);
  // token有效，未过期
  if(deToken&&deToken.exp>serverTime){
    // 刷新失效时间
    let orign = jwtService.getJwtInfo(token);
    let jwtToken = jwtService.rebuildJwt(deToken,10);
    // token保存到客户端
    res.cookie('jwtToken', jwtToken);    
    // 查询用户信息
    res.json({status:true,
      token:token,
      orign:orign,
      jwtToken:jwtToken,
      orign2:jwtService.getJwtInfo(jwtToken)
    });
  }else{
    // res.json({status:false,resultMsg:'Token已失效'});
    res.redirect('login');
  }
});

module.exports = router;
