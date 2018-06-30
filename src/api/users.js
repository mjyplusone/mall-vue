import axios from 'axios';
import {baseUrl, config} from './config.js';

export function userLogin (userName, userPwd) {
    const url = baseUrl + '/api/users/login';

    return axios.post(url, {
        userName: userName,
        userPwd: userPwd
    }, config).then((res) => {
        return Promise.resolve(res.data);
    });
    // return axios.create({
    //     baseURL: baseUrl,
    //     url: '/api/users/login',
    //     method: 'post',
    //     data: {
    //         userName: userName,
    //         userPwd: userPwd
    //     },
    //     withCredentials: true
    // }).then((res) => {
    //     return Promise.resolve(res.data);
    // });
}

export function userLogout () {
    const url = baseUrl + '/api/users/logout';

    return axios.post(url, {}, config)
    .then((res) => {
        return Promise.resolve(res.data);
    });

    // return axios.create({
    //     baseURL: baseUrl,
    //     url: '/api/users/logout',
    //     method: 'post',
    //     withCredentials: true
    // }).then((res) => {
    //     return Promise.resolve(res.data);
    // });
}

export function checkLogin () {
    const url = baseUrl + '/api/users/checklogin';

    return axios.get(url, {}, config)
    .then((res) => {
        return Promise.resolve(res.data);
    });

    // return axios.create({
    //     baseURL: baseUrl,
    //     url: '/api/users/checklogin',
    //     method: 'get',
    //     withCredentials: true
    // }).then((res) => {
    //     return Promise.resolve(res.data);
    // });
}

export function signIn (userName, userPwd) {
    const url = baseUrl + '/api/users/signin';

    return axios.post(url, {
        userName: userName,
        userPwd: userPwd
    }, config).then((res) => {
        return Promise.resolve(res.data);
    });

    // return axios.create({
    //     baseURL: baseUrl,
    //     url: '/api/users/signin',
    //     method: 'post',
    //     data: {
    //         userName: userName,
    //         userPwd: userPwd
    //     },
    //     withCredentials: true
    // }).then((res) => {
    //     return Promise.resolve(res.data);
    // });
}

export function getCartList () {
    const url = baseUrl + '/api/users/cartlist';

    return axios.get(url, config)
    .then((res) => {
        return Promise.resolve(res.data);
    });

    // return axios.create({
    //     baseURL: baseUrl,
    //     url: '/api/users/cartlist',
    //     method: 'get',
    //     withCredentials: true
    // }).then((res) => {
    //     return Promise.resolve(res.data);
    // });
}

export function deleteProduct (productId) {
    const url = baseUrl + '/api/users/deleteproduct';

    return axios.post(url, {
        productId: productId
    }, config).then((res) => {
        return Promise.resolve(res.data);
    });

    // return axios.create({
    //     baseURL: baseUrl,
    //     url: '/api/users/deleteproduct',
    //     method: 'post',
    //     data: {
    //         productId: productId
    //     },
    //     withCredentials: true
    // }).then((res) => {
    //     return Promise.resolve(res.data);
    // });
}

export function editProductNum (productId, productNum) {
    const url = baseUrl + '/api/users/editnum';

    return axios.post(url, {
        productId: productId,
        productNum: productNum
    }, config).then((res) => {
        return Promise.resolve(res.data);
    });

    // return axios.create({
    //     baseURL: baseUrl,
    //     url: '/api/users/editnum',
    //     method: 'post',
    //     data: {
    //         productId: productId,
    //         productNum: productNum
    //     },
    //     withCredentials: true
    // }).then((res) => {
    //     return Promise.resolve(res.data);
    // });
}

export function getAddressList () {
    const url = baseUrl + '/api/users/addresslist';

    return axios.get(url, config)
    .then((res) => {
        return Promise.resolve(res.data);
    });

    // return axios.create({
    //     baseURL: baseUrl,
    //     url: '/api/users/addresslist',
    //     method: 'get',
    //     withCredentials: true
    // }).then((res) => {
    //     return Promise.resolve(res.data);
    // });
}

export function setDefault (addressId) {
    const url = baseUrl + '/api/users/setdefault';

    return axios.post(url, {
        addressId: addressId
    }, config).then((res) => {
        return Promise.resolve(res.data);
    });

    // return axios.create({
    //     baseURL: baseUrl,
    //     url: '/api/users/setdefault',
    //     method: 'post',
    //     data: {
    //         addressId: addressId
    //     },
    //     withCredentials: true
    // }).then((res) => {
    //     return Promise.resolve(res.data);
    // });
}

export function deleteAddress (addressId) {
    const url = baseUrl + '/api/users/deleteaddr';

    return axios.post(url, {
        addressId: addressId
    }, config).then((res) => {
        return Promise.resolve(res.data);
    });

    // return axios.create({
    //     baseURL: baseUrl,
    //     url: '/api/users/deleteaddr',
    //     method: 'post',
    //     data: {
    //         addressId: addressId
    //     },
    //     withCredentials: true
    // }).then((res) => {
    //     return Promise.resolve(res.data);
    // });
}

export function addAddress (userName, streetName, tel) {
    const url = baseUrl + '/api/users/addaddr';

    return axios.post(url, {
        userName: userName,
        streetName: streetName,
        tel: tel
    }, config).then((res) => {
        return Promise.resolve(res.data);
    });

    // return axios.create({
    //     baseURL: baseUrl,
    //     url: '/api/users/addaddr',
    //     method: 'post',
    //     data: {
    //         userName: userName,
    //         streetName: streetName,
    //         tel: tel
    //     },
    //     withCredentials: true
    // }).then((res) => {
    //     return Promise.resolve(res.data);
    // });
}

export function createOrder (subPrice, shipping, addressId, orderList) {
    const url = baseUrl + '/api/users/payment';

    return axios.post(url, {
        subPrice: subPrice,
        shipping: shipping,
        addressId: addressId,
        orderList: orderList
    }, config).then((res) => {
        return Promise.resolve(res.data);
    });

    // return axios.create({
    //     baseURL: baseUrl,
    //     url: '/api/users/payment',
    //     method: 'post',
    //     data: {
    //         subPrice: subPrice,
    //         shipping: shipping,
    //         addressId: addressId,
    //         orderList: orderList
    //     },
    //     withCredentials: true
    // }).then((res) => {
    //     return Promise.resolve(res.data);
    // });
}

export function getOrderDetail (param) {
    const url = baseUrl + '/api/users/orderdetail';

    return axios.get(url, {
        params: param,
        withCredentials: true
    }).then((res) => {
        return Promise.resolve(res.data);
    });

    // return axios.create({
    //     baseURL: baseUrl,
    //     url: '/api/users/orderdetail',
    //     method: 'get',
    //     withCredentials: true
    // }).then((res) => {
    //     return Promise.resolve(res.data);
    // });
}

export function getUserOrder () {
    const url = baseUrl + '/api/users/userorder';

    return axios.get(url, config).then((res) => {
        return Promise.resolve(res.data);
    });

    // return axios.create({
    //     baseURL: baseUrl,
    //     url: '/api/users/userorder',
    //     method: 'get',
    //     withCredentials: true
    // }).then((res) => {
    //     return Promise.resolve(res.data);
    // });
}