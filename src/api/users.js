import axios from 'axios';

export function userLogin (userName, userPwd) {
    return axios.post('/api/users/login', {
        userName: userName,
        userPwd: userPwd
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}

export function userLogout () {
    return axios.post('/api/users/logout')
    .then((res) => {
        return Promise.resolve(res.data);
    });
}

export function checkLogin () {
    return axios.get('/api/users/checklogin')
    .then((res) => {
        return Promise.resolve(res.data);
    });
}

export function getCartList () {
    return axios.get('/api/users/cartlist')
    .then((res) => {
        return Promise.resolve(res.data);
    });
}

export function deleteProduct (productId) {
    return axios.post('/api/users/deleteproduct', {
        productId: productId
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}

export function editProductNum (productId, productNum) {
    return axios.post('/api/users/editnum', {
        productId: productId,
        productNum: productNum
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}

export function getAddressList () {
    return axios.get('/api/users/addresslist')
    .then((res) => {
        return Promise.resolve(res.data);
    });
}

export function setDefault (addressId) {
    return axios.post('api/users/setdefault', {
        addressId: addressId
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}

export function deleteAddress (addressId) {
    return axios.post('api/users/deleteaddr', {
        addressId: addressId
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}