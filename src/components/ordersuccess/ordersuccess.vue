<template>
  <div class="ordersuccess">
      <navbread>
          <span>Order Success</span>
      </navbread>
      <div class="ordersuccess-content">
          <m-progress :step="4"></m-progress>
          <div class="okimg">
              <img div="okimg" src="../../common/image/ok.png" alt="" width="100">
          </div>
          <div class="text">
              <p>下单成功</p>
              <p>您的订单正在处理中</p>
          </div>
          <div class="info">
              <span>订单号: {{ orderId }}</span>
              <span>订单总价: ￥{{ orderTotal | formatPrice }}</span>
          </div>
          <div class="btn-wrapper">
              <router-link tag="div" class="btn btn-cartlist" to="/shopcart">查看购物车</router-link>
              <router-link tag="div" class="btn btn-goodlist" to="/goods">继续购物</router-link>
          </div>
      </div>
  </div>
</template>

<script>
import navbread from 'components/navbread/navbread.vue';
import MProgress from 'components/m-progress/m-progress.vue';
import {getOrderDetail} from 'api/users.js';
import {formatPrice} from 'common/js/format.js';

export default {
    data () {
        return {
            orderId: '',
            orderTotal: 0
        };
    },
    mounted () {
        this._getOrderDetail();
    },
    methods: {
        _getOrderDetail () {
            var param = {
                orderId: this.$route.query.orderId
            };
            getOrderDetail(param).then((res) => {
                if (res.status === '0') {
                    this.orderId = res.result.orderId;
                    this.orderTotal = res.result.orderTotal;
                }
            });
        }
    },
    filters: {
        formatPrice (price) {
            return formatPrice(price);
        }
    },
    components: {
        navbread,
        MProgress
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .ordersuccess
        background: #f5f7fc
        flex: 1
        .ordersuccess-content
            width: 100%
            max-width: 1280px
            margin: 0 auto
            padding: 50px 10px
            box-sizing: border-box
            text-align: center
            color: #000
            .okimg
                margin-top: 100px
            .text
                margin-top: 50px
                line-height: 2
                font-size: 18px
                color: #666
            .info
                margin-top: 20px
                font-size: 18px
                font-weight: 700
                color: #999
                span:first-child
                    margin-right: 20px
            .btn-wrapper
                margin-top: 40px
                .btn
                    display: inline-block
                    width: 200px
                    height: 40px
                    line-height: 40px
                    font-weight: 700
                    letter-spacing: 2px
                    cursor: pointer
                .btn-cartlist
                    margin-right: 20px
                    border: 1px solid #d1434a
                    color: #d1434a
                    &:hover
                        background: rgba(209, 67, 74, 0.2)
                .btn-goodlist
                    background: #d1434a
                    color: #ffffff
                    &:hover
                        background: rgba(209, 67, 74, 0.8)
</style>
