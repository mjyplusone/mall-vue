<template>
  <div class="userorder">
      <navbread>
          <span>My Order</span>
      </navbread>
      <div class="userorder-content">
          <h2 class="userorder-title">我的订单</h2>
          <ul class="order-list">
              <li v-for="order in orderList" :key="order.orderId">
                  <p>订单号: {{ order.orderId }}</p>
                  <p>创建时间: {{ order.createDate }}</p>
                  <p>收货人: {{ order.addressInfo.userName }}</p>
                  <p>联系电话: {{ order.addressInfo.tel }}</p>
                  <p>收货地址: {{ order.addressInfo.streetName }}</p>
                  <div class="goods-list">
                      <table>
                          <thead>
                              <th>商品</th>
                              <th>单价</th>
                              <th>数量</th>
                              <th>总价</th>
                          </thead>
                          <tbody>
                              <tr v-for="item in order.orderList" :key="item.productId">
                                  <td class="item-name">
                                      <div>
                                          <img :src="'/static/' + item.productImage" alt="">
                                          <span class="item-text">{{ item.productName }}</span>
                                      </div>
                                  </td>
                                  <td class="item-price">￥{{ item.salePrice | formatPrice }}</td>
                                  <td class="item-num">
                                      <div class="counter">
                                          <span class="num">{{ item.productNum }}</span>
                                      </div>
                                  </td>
                                  <td class="item-subprice">￥{{ item.salePrice * item.productNum | formatPrice }}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                  <div class="priceinfo">
                      <div class="info-content">
                          <div class="info-item"><span class="text">商品总价:</span><span>￥{{ order.subPrice | formatPrice }}</span></div>
                          <div class="info-item"><span class="text">运费:</span><span>￥{{ order.shipping | formatPrice }}</span></div>
                          <div class="info-item"><span class="text">实付款:</span><span class="finalprice">￥{{ order.orderTotal | formatPrice }}</span></div>
                      </div>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import navbread from 'components/navbread/navbread.vue';
import {getUserOrder} from 'api/users.js';
import {formatPrice} from 'common/js/format.js';

export default {
    data () {
        return {
            orderList: []
        };
    },
    mounted () {
        this._getUserOrder();
    },
    methods: {
        _getUserOrder () {
            getUserOrder().then((res) => {
                if (res.status === '0') {
                    this.orderList = res.result;
                    console.log(this.orderList);
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
        navbread
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .userorder
        background: #f5f7fc
        flex: 1
        .userorder-content
            width: 100%
            max-width: 1280px
            margin: 0 auto
            padding: 50px 10px
            box-sizing: border-box
            .userorder-title
                margin-bottom: 50px
                font-size: 25px
                font-weight: 700
            ul.order-list > li
                margin-top: 30px
                padding-bottom: 30px
                border-bottom: 1px solid rgba(0, 0, 0, 0.1)
                &:last-child
                    border: none
                p
                    line-height: 1.5
                .goods-list
                    margin-top: 20px
                    table
                        width: 100%
                        border: 1px solid rgba(0, 0, 0, 0.1)
                        thead
                            text-align: center
                            // background: #605f5f
                            background: #999
                            color: #ffffff
                            th
                                height: 40px
                                line-height: 40px
                                letter-spacing: 3px
                        tbody
                            background: #ffffff
                            tr
                                border: 1px solid rgba(0, 0, 0, 0.1)
                            td
                                height: 145px
                                text-align: center
                                vertical-align: middle
                                &:first-child
                                    width: 40%
                                    text-align: left
                                &.item-name
                                    img
                                        margin-left: 20px
                                        width: 78px
                                        height: 78px
                                        border: 1px solid rgba(0, 0, 0, 0.1)
                                        vertical-align: middle
                                    .item-text
                                        margin-left: 20px
                                        font-weight: 700
                                &.item-num
                                    .counter
                                        width: 120px
                                        height: 30px
                                        margin: 0 auto
                                        border: 1px solid #f0f0f0
                                        vertical-align: middle
                                        // 消除子元素span默认空隙
                                        font-size: 0
                                        .num
                                            display: inline-block
                                            width: 40px
                                            height: 30px
                                            font-size: 16px
                                            line-height: 30px
                                            background: #f0f0f0
                                            background: #ffffff
                                &.item-subprice
                                    color: #d1434a
                .priceinfo
                    margin-top: 30px
                    overflow: hidden
                    .info-content
                        float: right
                        .info-item
                            height: 36px
                            span
                                display: inline-block
                                width: 120px
                                text-align: right
                                &.text
                                    color: #666
                                &.finalprice
                                    font-size: 20px
                                    font-weight: 700
                                    color: #d1434a
</style>
