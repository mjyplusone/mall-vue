var mongoose = require('mongoose');
// 定义表模型
var Schema = mongoose.Schema;

var productSchema = new Schema({
    "productId": String,
    "productName": String,
    "salePrice": Number,
    "productImage": String,
    "productNum": Number,
    "checked": String
});

// 输出model模型,可以基于它调用API
module.exports = mongoose.model('Good', productSchema, 'goods');
