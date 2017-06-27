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
    },'secret',60);
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
  // 验证token有效性
  let result = jwtService.decode(req.cookies.jwtToken);
  console.log(result);
  let serverTime = moment(new Date().getTime()).unix();
  console.log(moment(new Date().getTime()).unix());
  if(result.exp>serverTime){
    // 查询用户信息
    // 
    res.render('userInfo.pug');
  }else{
    next(new Error('Token已失效'));
  }
});

module.exports = router;
