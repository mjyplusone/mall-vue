import * as types from './mutation-types.js';

const mutations = {
    [types.SET_ISSHOWLOGIN] (state, flag) {
        state.isShowLogin = flag;
    }
};

export default mutations;