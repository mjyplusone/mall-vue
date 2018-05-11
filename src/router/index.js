import Vue from 'vue';
import Router from 'vue-router';
import goodslist from 'components/goodslist/goodslist.vue';
import shopcart from 'components/shopcart/shopcart.vue';
import address from 'components/address/address.vue';
import order from 'components/order/order.vue';
import ordersuccess from 'components/ordersuccess/ordersuccess.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: goodslist
    },
    {
      path: '/shopcart',
      component: shopcart
    },
    {
      path: '/address',
      component: address
    },
    {
      path: '/order',
      component: order
    },
    {
      path: '/ordersuccess',
      component: ordersuccess
    }
  ]
});
