import axios from 'axios';

export function getGoodsList () {
    return axios.get('/api/goods')
        .then((res) => {
            return Promise.resolve(res.data);
        });
}