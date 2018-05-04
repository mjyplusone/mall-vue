import axios from 'axios';

export function getGoodsList (param) {
    return axios.get('/api/goods', {
        params: param
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}

export function addCartPost (productId) {
    return axios.post('/api/goods/addcart', {
        productId: productId
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}