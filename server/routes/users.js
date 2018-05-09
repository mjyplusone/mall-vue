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
        res.cookie('userName', doc.userName, {
          path: '/ ',
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
  res.cookie('userName', '', {
    path: '/',
    maxAge: -1
  });

  res.json({
    status: '0',
    msg: '',
    result: ''
  });
});

// 登录校验
router.get('/checklogin', function(req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName
    });
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    });
  }
});

// 获取用户购物车列表
router.get('/cartlist', function(req, res, next) {
  var userId = req.cookies.userId;

  User.findOne({userId: userId}, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        });
      }
    }
  });
});

// 删除购物车中商品
router.post('/deleteproduct', function(req, res, next) {
  // 获取cookie中的用户id和post请求中的商品id
  var userId = req.cookies.userId;
  var productId = req.body.productId;

  // update更新数据库,$pull删除商品
  User.update({userId: userId}, {$pull: {'cartList': {'productId': productId}}}, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'delete product success'
      });
    }
  });
})

// 改变商品数量
router.post('/editnum', function(req, res, next) {
  var userId = req.cookies.userId;
  var productId = req.body.productId;
  var productNum = req.body.productNum;

  User.update({'userId': userId, 'cartList.productId': productId}, {'cartList.$.productNum': productNum}, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'edit product num success'
      });
    }
  });

})

module.exports = router;
