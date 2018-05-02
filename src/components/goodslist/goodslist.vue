<template>
  <div class="goodslist">
      <div class="goodslist-content">
        <div class="sort">
            <span class="sort-text">排序:&nbsp;&nbsp;&nbsp;&nbsp;<span class="pricesort">价格从低到高</span></span>
            <span class="filter-text" @click="showSideFilter">FILTER BY</span>
        </div>
        <div class="goodsinfo-container">
            <div class="price-filter">
                <div class="title">PRICE:</div>
                <ul class="price-list">
                    <li :class="{'selected': priceRange === 'all'}" @click="priceRange = 'all'">All</li>
                    <li v-for="(price, index) in priceFilter" :key="price.startPrice"
                        @click="priceRange = index" :class="{'selected': priceRange === index}">
                        {{ price.startPrice }}-{{ price.endPrice }}
                    </li>
                </ul>
            </div>
            <div class="goodsinfo">
                <ul class="goodsinfo-list clearfix">
                    <!-- 这里不绑定key VSCode会报错 -->
                    <li v-for="goods in goodsList" :key="goods.productId">
                        <div class="content">
                            <a href="/"><img v-lazy="goods.productImg" alt="" width="100%"></a>
                            <div class="info">
                                <div class="name">{{ goods.productName }}</div>
                                <div class="price">￥{{ goods.productPrice }}</div>
                                <div class="btn"><a href="/">加入购物车</a></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="content">
                            <a href="/"><img src="../../common/image/1.jpg" alt="" width="100%"></a>
                            <div class="info">
                                <div class="name">蓝牙音响</div>
                                <div class="price">￥129.00</div>
                                <div class="btn"><a href="/">加入购物车</a></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="content">
                            <a href="/"><img src="../../common/image/1.jpg" alt="" width="100%"></a>
                            <div class="info">
                                <div class="name">蓝牙音响</div>
                                <div class="price">￥129.00</div>
                                <div class="btn"><a href="/">加入购物车</a></div>
                            </div>
                        </div>
                    </li>
                    <!-- <li>
                        <div class="content">
                            <a href="/"><img src="../../common/image/1.jpg" alt="" width="100%"></a>
                            <div class="info">
                                <div class="name">蓝牙音响</div>
                                <div class="price">￥129.00</div>
                                <div class="btn"><a href="/">加入购物车</a></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="content">
                            <a href="/"><img src="../../common/image/1.jpg" alt="" width="100%"></a>
                            <div class="info">
                                <div class="name">蓝牙音响</div>
                                <div class="price">￥129.00</div>
                                <div class="btn"><a href="/">加入购物车</a></div>
                            </div>
                        </div>
                    </li> -->
                </ul>
            </div>
        </div>
      </div>
      <div class="side-wrapper" v-show="isShowSide" @click="hideSideFilter">
          <transition name="fade">
          <div class="side-filter" v-show="isShowSide">
                <div class="title">PRICE:</div>
                <ul class="price-list">
                    <li :class="{'selected': priceRange === 'all'}" @click="priceRange = 'all'">All</li>
                    <li v-for="(price, index) in priceFilter" :key="price.startPrice"
                        @click="priceRange = index" :class="{'selected': priceRange === index}">
                        {{ price.startPrice }}-{{ price.endPrice }}
                    </li>
                </ul>
          </div>
          </transition>
      </div>
  </div>
</template>

<script>
import {getGoodsList} from 'api/goods.js';

export default {
    data () {
        return {
            goodsList: [],
            priceFilter: [
                {
                    startPrice: '0.00',
                    endPrice: '100.00'
                },
                {
                    startPrice: '100.00',
                    endPrice: '500.00'
                },
                {
                    startPrice: '500.00',
                    endPrice: '1000.00'
                },
                {
                    startPrice: '1000.00',
                    endPrice: '2000.00'
                }
            ],
            priceRange: 'all',
            isShowSide: false
        };
    },
    created () {
        this._getGoodsList();
    },
    methods: {
        _getGoodsList () {
            getGoodsList().then((res) => {
                if (res.status === 0) {
                    console.log(res);
                    this.goodsList = res.result;
                }
            });
        },
        showSideFilter () {
            this.isShowSide = true;
        },
        hideSideFilter () {
            this.isShowSide = false;
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .goodslist
        background: #f5f7fc
        flex: 1
        .goodslist-content
            width: 100%
            max-width: 1280px
            margin: 0 auto
            padding: 30px 10px
            box-sizing: border-box
            .sort
                position: relative
                height: 55px
                line-height: 55px
                font-size: 14px
                color: #333333
                background: #ffffff
                .sort-text
                    position: absolute
                    right: 40px
                    .pricesort
                        &:hover
                            color: #ee7a23
                .filter-text
                    position: absolute
                    left: 40px
                    display: none
                    &:hover
                        color: #ee7a23
                @media only screen and (max-width: 767px)
                    .filter-text
                        display: block
            .goodsinfo-container
                margin-top: 30px
                display: flex
                .price-filter
                    width: 190px
                    margin: 0 25px 0 15px
                    .title
                        margin-bottom: 30px
                        height: 20px
                        font-weight: bolder
                        letter-spacing: 2px
                        line-height: 20px
                        color: #605f5f
                    ul.price-list li
                        height: 27px
                        line-height: 28px
                        margin: 20px 0
                        font-size: 14px
                        color: #666666
                        transition: padding .3s ease-out
                        &:hover
                            padding: 0 15px
                            border-left: 2px solid #ee7a23
                            color: #ee7a23
                        &.selected
                            padding: 0 15px
                            border-left: 2px solid #ee7a23
                            color: #ee7a23
                            font-weight: bolder
                @media only screen and (max-width: 767px)
                    .price-filter
                        display: none
                .goodsinfo
                    flex: 1
                    margin-top: -10px        /* 配合li中的margin-top */
                    ul.goodsinfo-list
                        overflow: hidden     /* BFC清除浮动 */
                        margin-left: -20px
                        li
                            float: left
                            width: 25%
                            padding-left: 20px
                            box-sizing: border-box
                            background-clip: content-box
                            margin-top: 10px       /* 给transform留出足够的空间 */
                            margin-bottom: 20px
                            background-color: #ffffff
                            font-size: 15px
                            .content
                                border: 3px solid #f0f0f0
                                box-sizing: border-box
                                transition: all 0.3s ease-out
                                &:hover
                                    border: 2px solid #ee7a23
                                    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.2)
                                    transform: translateY(-5px)
                                .info
                                    padding: 20px 10px 10px 10px
                                    .name
                                        height: 50px
                                        margin-bottom: 10px
                                        font-weight: 700
                                    .price
                                        height: 30px
                                        line-height: 30px
                                        font-size: 1.5em
                                        color: #d1434a
                                    .btn
                                        width: 100%
                                        height: 40px
                                        margin-top: 10px
                                        border: 1px solid #d1434a
                                        box-sizing: border-box
                                        a
                                            display: block
                                            height: 38px
                                            line-height: 38px
                                            text-align: center
                                            letter-spacing: 2px
                                            font-size: 1em
                                            font-weight: 700
                                            color: #d1434a
                                            &:hover
                                                background: #ffe5e6
                    @media only screen and (max-width: 991px)
                        ul.goodsinfo-list
                            margin-left: -20px
                            li
                                width: 33.33%
                                padding-left: 20px
                    @media only screen and (max-width: 767px)
                        ul.goodsinfo-list
                            margin-left: 0
                            li
                                width: 100%
                                height: 132px
                                padding-left: 0
                                font-size: 12px
                                .content
                                    width: 100%
                                    height: 134px
                                    border: 2px solid #f0f0f0
                                    box-sizing: border-box
                                    padding: 10px
                                    transition: none
                                    &:hover
                                        border: 2px solid #f0f0f0
                                        box-shadow: none
                                        transform: none
                                    img
                                        float: left
                                        width: 108px
                                        height: 108px
                                        margin-right: 20px
                                        border: .7px solid rgba(209, 67, 74, 0.3)
                                    .info
                                        position: relative
                                        overflow: hidden
                                        padding: 0
                                        height: 100%
                                        .name
                                            height: 40px
                                            line-height: 1.1
                                        .btn
                                            position: absolute
                                            right: 0
                                            bottom: 0
                                            width: 84px
                                            height: 30px
                                            a
                                                height: 28px
                                                line-height: 28px

                    // .clearfix:after
                    //     display: block
                    //     content: ''
                    //     height: 0
                    //     line-height: 0
                    //     visibility: hidden
                    //     clear: both
                    // .clearfix
                    //     zoom: 1
        .side-wrapper
            position: fixed
            top: 0
            bottom: 0
            left: 0
            right: 0
            background: rgba(0, 0, 0, 0.5)
            .side-filter
                position: absolute
                top: 0
                right: 0
                width: 230px
                height: 100%
                background: #ffffff
                transition: all .5s
                &.fade-enter, &.fade-leave-to
                    right: -230px
                .title
                    height: 55px
                    padding-left: 20px
                    font-weight: bolder
                    letter-spacing: 2px
                    line-height: 55px
                    color: #605f5f
                    background: #f0f0f0
                ul.price-list li
                    height: 42px
                    padding: 0 15px
                    border-bottom: 1px solid #f0f0f0
                    box-sizing: border-box
                    line-height: 42px
                    color: #666666
                    cursor: pointer
                    &:hover
                        padding: 0 15px
                        border-left: 2px solid #ee7a23
                        color: #ee7a23
                    &.selected
                        padding: 0 15px
                        border-left: 2px solid #ee7a23
                        color: #ee7a23
                        font-weight: bolder
</style>
