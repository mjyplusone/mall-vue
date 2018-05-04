var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// 加载模型表(加载私有文件)
var Goods = require('../models/goods');

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
router.get('/', function (req, res, next) {
    // 从url中取参数(express封装后的方法)
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

module.exports = router;