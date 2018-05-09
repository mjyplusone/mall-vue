var mongoose = require('mongoose');

// 定义模型
var userSchema = new mongoose.Schema({
    "userId": String,
    "userName": String,
    "userPwd": String,
    "orderList": Array,
    "cartList": [
        {
            "productId": String,
            "productName": String,
            "salePrice": String,
            "productImage": String,
            "checked": String,
            "productNum": String
        }
    ],
    "addressList": [
        {
            "addressId": String,
            "userName": String,
            "streetName": String,
            "postCode": String,
            "tel": String,
            "isDefault": Boolean   
        }
    ]
});

module.exports = mongoose.model('User', userSchema, 'users');