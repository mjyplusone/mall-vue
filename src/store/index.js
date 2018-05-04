import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters.js';
import state from './state.js';
import mutations from './mutations.js';
// 通过mutation修改state时,会在控制台打logger
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

// 这里npm run dev时,debug为true
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    state,
    getters,
    mutations,
    // vuex中调试工具,不通过mutation直接修改state会报错
    // 有性能损耗,线上不使用
    // 线下调试的开启严格模式
    strict: debug,
    plugins: debug ? [createLogger()] : []
});