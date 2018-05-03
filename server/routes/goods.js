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
    Goods.find({}, function (err, doc) {
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