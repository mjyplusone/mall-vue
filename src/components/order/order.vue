<template>
    <div class="order">
        <navbread>
            <span>View Your Order</span>
        </navbread>
        <div class="order-content">
            <h2 class="order-title">确认订单</h2>
            <m-progress :step="2"></m-progress>
            <div class="order-list">
                <div class="title">订单内容</div>
                <table>
                    <thead>
                        <th>商品</th>
                        <th>单价</th>
                        <th>数量</th>
                        <th>总价</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in orderList" :key="item.productId">
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
                    <div class="info-item"><span class="text">商品总价:</span><span>￥{{ subPrice | formatPrice }}</span></div>
                    <div class="info-item"><span class="text">运费:</span><span>￥{{ shipping | formatPrice }}</span></div>
                    <div class="info-item"><span class="text">实付款:</span><span class="finalprice">￥{{ subPrice + shipping | formatPrice }}</span></div>
                </div>
            </div>
            <div class="btn-wrapper">
                <router-link tag="div" class="btn prev" to="/address">PREVIOUS</router-link>
                <div class="btn next">提交订单</div>
            </div>
        </div>
    </div>
</template>

<script>
import navbread from 'components/navbread/navbread.vue';
import MProgress from 'components/m-progress/m-progress.vue';
import {mapGetters} from 'vuex';
import {formatPrice} from 'common/js/format.js';

export default {
    data () {
        return {
            // 运费
            shipping: 10
        };
    },
    computed: {
        subPrice () {
            var sum = 0;
            this.orderList.forEach((item) => {
                sum += item.salePrice * item.productNum;
            });
            return sum;
        },
        ...mapGetters([
            'orderList'
        ])
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
    .order
        background: #f5f7fc
        flex: 1
        .order-content
            width: 100%
            max-width: 1280px
            margin: 0 auto
            padding: 50px 10px
            box-sizing: border-box
            color: #000
            .order-title
                margin-bottom: 50px
                font-size: 25px
                font-weight: 700
            .order-list
                margin-top: 50px
                .title
                    font-size: 18px
                    font-weight: 700
                    margin-bottom: 20px
                    color: #605f5f
                table
                    width: 100%
                    border: 1px solid rgba(0, 0, 0, 0.1)
                    thead
                        background: #605f5f
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
                margin-top: 50px
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
            .btn-wrapper
                height: 40px
                margin-top: 30px
                .btn
                    display: inline-block
                    height: 100%
                    padding: 10px
                    line-height: 20px
                    letter-spacing: 2px
                    box-sizing: border-box
                    font-weight: 700
                    cursor: pointer
                .prev
                    border: 1px solid #d1434a
                    color: #d1434a
                    &:hover
                        background: rgba(209, 67, 74, 0.2)
                .next
                    float: right
                    background: #d1434a
                    color: #ffffff
                    &:hover
                        background: rgba(209, 67, 74, 0.8)
</style>
