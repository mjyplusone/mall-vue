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