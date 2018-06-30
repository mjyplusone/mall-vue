import axios from 'axios';
import {baseUrl, config} from './config.js';

export function getGoodsList (param) {
    const url = baseUrl + '/api/goods';

    return axios.get(url, {
        params: param
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}

export function addCartPost (productId) {
    const url = baseUrl + '/api/goods/addcart';

    return axios.post(url, {
        productId: productId
    }, config).then((res) => {
        return Promise.resolve(res.data);
    });
}