import axios from 'axios';

export function getGoodsList (param) {
    return axios.get('/api/goods', {
        params: param
    }).then((res) => {
            return Promise.resolve(res.data);
    });
}