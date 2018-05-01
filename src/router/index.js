import Vue from 'vue';
import Router from 'vue-router';
import goods from 'components/goods/goods.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: goods
    }
  ]
});
