var express = require('express');
var router = express.Router();
var util =  require('../util/util.js');

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

// 注册
router.post('/signin', function(req, res, next) {
  var userName = req.body.userName;
  var userPwd =  req.body.userPwd;

  // 取User表中数据长度
  User.count({}, function(err, count) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      User.findOne({userName: userName}, function(err, doc) {
        if (err) {
          res.json({
            status: '1',
            msg: err.message,
            result: ''
          });
        } else {
          // 用户名不存在,则可以注册
          if (!doc) {
            
            var user = new User({
              // 利用表中已有数据量生成userId
              userId: 100000077 + count + '',
              userName: userName,
              userPwd: userPwd,
              orderList: [],
              cartList: [],
              addresslist: []
            });

            user.save(function(err, doc) {
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
                  result: '已添加userName: ' + userName
                });
              }
            });
          } else {
            res.json({
              status: '1',
              msg: '账户已存在'
            })
          }
        }
      });
    }
  });
})

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

// 获取用户地址列表
router.get('/addresslist', function(req, res, next) {
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
          result: doc.addressList
        });
      }
    }
  });
})

// 设置默认地址
router.post('/setdefault', function(req, res, next) {
  var userId = req.cookies.userId;
  var addressId = req.body.addressId;

  User.findOne({userId: userId}, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      if (doc) {
        doc.addressList.forEach((item) => {
          if (item.addressId === addressId) {
            item.isDefault = true;
          } else {
            item.isDefault = false;
          }
        });
        
        // 修改完isDefault字段,保存
        doc.save(function(err, doc) {
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
              result: ''
            });
          }
        });
      }
    }
  });
})

// 删除地址
router.post('/deleteaddr', function(req, res, next) {
  var userId = req.cookies.userId;
  var addressId = req.body.addressId;

  User.update({userId: userId}, {$pull: {'addressList': {'addressId': addressId}}}, function(err, doc) {
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
        result: 'delete address success'
      });
    }
  });
})

// 新增地址
router.post('/addaddr', function(req, res, next) {
  var userId = req.cookies.userId;
  var userName = req.body.userName;
  var streetName = req.body.streetName;
  var tel = req.body.tel;

  User.findOne({userId: userId}, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      if (doc) {
        doc.addressList.push({
          'addressId': '10000' + (doc.addressList.length + 1),
          'userName': userName,
          'streetName': streetName,
          'postCode': '',
          'tel': tel,
          'isDefault': false
        });

        doc.save(function(err, doc) {
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
              result: 'add address success'
            });
          }
        });
      }
    }
  });
})

// 生成订单
router.post('/payment', function(req, res, next) {
  var userId = req.cookies.userId;
  var subPrice = req.body.subPrice;
  var shipping = req.body.shipping;
  var addressId = req.body.addressId;
  var orderList =  req.body.orderList;

  User.findOne({userId: userId}, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      var address = '';
      // 获取用户当前使用的地址信息
      doc.addressList.forEach((item) => {
        if (item.addressId === addressId) {
          address = item;
        }
      });

      // 自动生成orderId
      var platform = '1212'
      // 生成0-9随机数
      var random1 = Math.floor(Math.random() * 10);
      var random2 = Math.floor(Math.random() * 10);

      var sysDate = util.formatDate(new Date(), 'yyyyMMddhhmmss');
      var createDate = util.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

      var orderId = platform + random1 + sysDate + random2;

      var order = {
        orderId: orderId,
        subPrice: subPrice,
        shipping: shipping,
        orderTotal: subPrice + shipping,
        addressInfo: address,
        orderList: orderList,
        orderStatus: '1',
        createDate: createDate
      };

      // 新订单写入数据库
      doc.orderList.push(order);

      doc.save(function(err2, doc2) {
        if (err2) {
          res.json({
            status: '1',
            msg: err2.message,
            result: ''
          });
        } else {
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: order.orderId,
              orderTotal: order.orderTotal
            }
          });
        }
      });
    }
  });
})

// 查询orderId对应订单信息
router.get('/orderdetail', function(req, res, next) {
  var userId = req.cookies.userId;
  var orderId = req.query.orderId;

  User.findOne({userId: userId}, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      if (doc.orderList.length > 0) {
        var order = {};
        doc.orderList.forEach((item) => {
          // 从用户所有订单中找到orderId对应的订单
          if (item.orderId === orderId) {
            order = item;
          }
        });
        if (order) {
          res.json({
            status: '0',
            msg: '',
            result: order
          });
        } else {
          res.json({
            status: '1',
            msg: 'no order',
            result: ''
          });
        }
      } else {
        res.json({
          status: '1',
          msg: 'no order',
          result: ''
        });
      }
    }
  });
})

// 查询用户所有订单
router.get('/userorder', function(req, res, next) {
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
          result: doc.orderList
        });
      }
    }
  });
})

module.exports = router;
