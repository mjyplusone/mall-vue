<template>
  <div class="myshopcart">
      <navbread>
          <span>Shopcart</span>
      </navbread>
      <div class="cartlist">
          <h2 class="cartlist-title">我的购物车</h2>
          <div class="carlist-content">
              <table>
                  <thead>
                      <th>ITEMS</th>
                      <th>PRICE</th>
                      <th>QUANTITY</th>
                      <th>SUBPRICE</th>
                      <th>EDIT</th>
                  </thead>
                  <tbody>
                      <tr>
                          <td class="item-name">
                              <div>
                                <div class="checkbtn checked"></div>
                                <img src="../../common/image/1.jpg" alt="">
                                <span class="item-text">头戴式耳机</span>
                              </div>
                          </td>
                          <td class="item-price">￥80.00</td>
                          <td class="item-num">
                              <div class="counter">
                                  <span class="minus">-</span>
                                  <span class="num">4</span>
                                  <span class="plus">+</span>
                              </div>
                          </td>
                          <td class="item-subprice">￥320.00</td>
                          <td class="item-edit">
                              <div class="icon-delete"></div>
                          </td>
                      </tr>
                      <tr>
                          <td class="item-name">
                              <div>
                                <div class="checkbtn checked"></div>
                                <img src="../../common/image/1.jpg" alt="">
                                <span class="item-text">头戴式耳机</span>
                              </div>
                          </td>
                          <td class="item-price">￥80.00</td>
                          <td class="item-num">
                              <div class="counter">
                                  <span class="minus">-</span>
                                  <span class="num">4</span>
                                  <span class="plus">+</span>
                              </div>
                          </td>
                          <td class="item-subprice">￥320.00</td>
                          <td class="item-edit">
                              <div class="icon-delete"></div>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <div class="checkout">
              <div class="checkbtn checked"></div>
              <div class="selectall">Select all</div>
              <div class="total">Item total: <span class="totalnum">￥640.00</span></div>
              <div class="checkout-btn checked">CHECKOUT</div>
          </div>
      </div>
  </div>
</template>

<script>
import navbread from 'components/navbread/navbread.vue';

export default {
    components: {
        navbread
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .myshopcart
        background: #f5f7fc
        flex: 1
        .cartlist
            width: 100%
            max-width: 1280px
            margin: 0 auto
            padding: 50px 10px
            box-sizing: border-box
            .cartlist-title
                font-size: 25px
                font-weight: 700
            .carlist-content
                margin-top: 30px
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
                                .checkbtn
                                    display: inline-block
                                    margin-left: 20px
                                    width: 20px
                                    height: 20px
                                    border-radius: 50%
                                    border: 1px solid rgba(0, 0, 0, 0.3)
                                    vertical-align: middle
                                    cursor: pointer
                                    &.checked
                                        background: #ee7a23
                                        border: 1px solid #ee7a23
                                        text-align: center
                                    &.checked::after
                                        content: "\2713"
                                        font-size: 20px
                                        color: #ffffff
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
                                    span
                                        display: inline-block
                                        width: 40px
                                        height: 30px
                                        font-size: 16px
                                        line-height: 30px
                                        background: #f0f0f0
                                    .num
                                        background: #ffffff
                                    .minus, .plus
                                        cursor: pointer
                            &.item-subprice
                                color: #d1434a
                            &.item-edit
                                font-size: 25px
                                cursor: pointer
                                &:hover
                                    color: #ee7a23
            .checkout
                position: relative
                margin-top: 30px
                height: 56px
                border: 1px solid rgba(0, 0, 0, 0.1)
                background: #ffffff
                .checkbtn
                    position: absolute
                    top: 17px
                    left: 20px
                    width: 20px
                    height: 20px
                    border-radius: 50%
                    border: 1px solid rgba(0, 0, 0, 0.3)
                    cursor: pointer
                    &.checked
                        background: #ee7a23
                        border: 1px solid #ee7a23
                        text-align: center
                    &.checked::after
                        content: "\2713"
                        font-size: 20px
                        color: #ffffff
                .selectall
                    position: absolute
                    top: 20px
                    left: 60px
                    line-height: 1
                    color: #666
                    cursor: pointer
                    &:hover
                        color: #d1434a
                .total
                    position: absolute
                    top: 0
                    right: 160px
                    line-height: 56px
                    color: #666
                    .totalnum
                        font-size: 20px
                        font-weight: 700
                        color: #d1434a
                .checkout-btn
                    position: absolute
                    top: 0
                    right: 0
                    width: 130px
                    height: 56px
                    line-height: 56px
                    text-align: center
                    font-weight: 700
                    letter-spacing: 2px
                    background: #ccc
                    color: #ffffff
                    cursor: pointer
                    &.checked
                        background: #d1434a
                    &:hover
                        background: rgba(209, 67, 74, 0.8)
</style>
