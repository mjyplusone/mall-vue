import * as types from './mutation-types.js';

const mutations = {
    [types.SET_ISSHOWLOGIN] (state, flag) {
        state.isShowLogin = flag;
    },
    [types.SET_LOGINUSERNAME] (state, username) {
        state.loginUserName = username;
    },
    [types.SET_ORDERLIST] (state, list) {
        state.orderList = list;
    }
};

export default mutations;