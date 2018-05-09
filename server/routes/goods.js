var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// 加载模型表(加载私有文件)
var Goods = require('../models/goods');
var User = require('../models/user');

// 连接数据库,mongoose自带驱动
mongoose.connect('mongodb://127.0.0.1:27017/easymallDB');

// 监听是否连接成功
mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success!");
});

mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail!");
});

mongoose.connection.on("disconnected", function () {
    console.log("MongoDB disconnected!");
});

// 路由
// 查询商品列表
router.get('/', function (req, res, next) {
    // get取参(express封装后的方法)
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pagesize);
    let sort = req.query.sort;
    let priceStart = parseInt(req.query.pricestart);
    let priceEnd = parseInt(req.query.priceend);

    // 分页计算公式
    let skip = (page - 1) * pageSize;

    // 过滤参数
    let params;
    if (priceStart != -1 && priceEnd != -1) {
        params = {
            salePrice: {
                $gt: priceStart,
                $lte: priceEnd
            }
        };
    } else {
        params = {};
    }

    // find查找所有数据,skip默认跳过skip条数据,limit限制查询条数
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    // sort=1升序,sort=-1降序
    goodsModel.sort({'salePrice': sort});

    // Goods.find({}, function (err, doc) {
    goodsModel.exec(function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            });
        }
    })
});

// 加入购物车   /api/goods/addcart
router.post('/addcart', function (req, res, next) {
    var userId = '100000077';

    // post取参
    var productId = req.body.productId;
    console.log(productId);

    User.findOne({userId: userId}, function (userErr, userDoc) {
        if (userErr) {
            res.json({
                status: '1',
                msg: userErr.message
            });
        } else {
            // 用户存在
            if (userDoc) {
                // 判断用户购物车中是否已经有此商品
                let goodsItem = '';
                userDoc.cartList.forEach((item) => {
                    if (item.productId === productId) {
                        goodsItem = item;
                        item.productNum++;
                    }
                });
                // 用户购物车中已经有此商品
                if (goodsItem) {
                    // 保存
                    userDoc.save(function (err, doc) {
                        if (err) {
                            res.json({
                                status: '1',
                                msg: err.message
                            });
                        } else {
                            res.json({
                                status: '0',
                                msg: '',
                                result: 'success'
                            })
                        }
                    });
                } else {
                // 用户购物车中没有此商品
                    // 在商品列表里查询此商品
                    Goods.findOne({productId: productId}, function (goodsErr, goodsDoc) {
                        if (goodsErr) {
                            res.json({
                                status: '1',
                                msg: goodsErr.message
                            });
                        } else {
                            if (goodsDoc) {
                                goodsDoc.productNum = 1;
                                // 选中状态,默认选中
                                goodsDoc.checked = 1;

                                console.log(goodsDoc);
    
                                // 商品信息加到用户名下
                                userDoc.cartList.push(goodsDoc);

                                userDoc.save(function (err, doc) {
                                    if (err) {
                                        res.json({
                                            status: '1',
                                            msg: err.message
                                        });
                                    } else {
                                        res.json({
                                            status: '0',
                                            msg: '',
                                            result: 'success'
                                        })
                                    }
                                });
                            }
                        }
                    });
                } 
            }
        }
    });
});

module.exports = router;