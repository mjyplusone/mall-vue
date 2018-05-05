var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 登录 /api/users/login
router.post('/login', function(req, res, next) {
  // post取参
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  };

  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      // 登录成功
      if (doc) {
        // 写入cookie, 3个参数: cookie名称, cookie的值, 设定的参数
        res.cookie('userId', doc.userId, {
          // cookie放在服务器根目录
          path: '/ ',
          // cookie周期(ms)
          maxAge: 1000 * 60 * 60
        });

        // 存入session, session是客户端发过来的, 所以req
        // req.session.user = doc;

        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      } else {
        // 用户名密码不对
        res.json({
          status: '1',
          msg: '用户名或密码错误'
        })
      }
    }
  });
});

// 登出
router.post('/logout', function (req, res, next) {
  // 清除cookie
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  });

  res.json({
    status: '0',
    msg: '',
    result: ''
  });
});

module.exports = router;
