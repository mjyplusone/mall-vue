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
                      <tr v-for="(item, index) in cartList" :key="item.productId">
                          <td class="item-name">
                              <div>
                                <div class="checkbtn" :class="{'checked': item.ischecked}" @click="toggleCheck(item)"></div>
                                <img :src="'/static/' + item.productImage" alt="">
                                <span class="item-text">{{ item.productName }}</span>
                              </div>
                          </td>
                          <td class="item-price">￥{{ item.salePrice | formatPrice }}</td>
                          <td class="item-num">
                              <div class="counter">
                                  <span class="minus" @click="editProductNum('minus', item)">-</span>
                                  <span class="num">{{ item.productNum }}</span>
                                  <span class="plus" @click="editProductNum('plus', item)">+</span>
                              </div>
                          </td>
                          <td class="item-subprice">￥{{ item.salePrice * item.productNum | formatPrice }}</td>
                          <td class="item-edit">
                              <div class="icon-delete" @click="showDeleteModal(item.productId, index)"></div>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <div class="checkout">
              <div class="checkbtn" :class="{'checked': isAllChecked}" @click="toggleAllCheck"></div>
              <div class="selectall">Select all</div>
              <div class="total">Item total: <span class="totalnum">￥{{ totalPrice | formatPrice }}</span></div>
              <div class="checkout-btn" :class="{'checked': hasChecked}" @click="checkOut">CHECKOUT</div>
          </div>
      </div>
      <modal :mdShow="deleteMdShow" @closeModal="closeDeleteModal">
          <div class="modal-text">确定删除此商品?</div>
          <div class="modal-btn">
              <div class="btn-success left" @click="deleteProduct">YES</div>
              <div class="btn-success right" @click="closeDeleteModal">NO</div>
          </div>
      </modal>
  </div>
</template>

<script>
import navbread from 'components/navbread/navbread.vue';
import modal from 'components/modal/modal.vue';
import {getCartList, deleteProduct, editProductNum} from 'api/users.js';
import {formatPrice} from 'common/js/format.js';
import Vue from 'vue';

export default {
    data () {
        return {
            cartList: [],
            deleteMdShow: false,
            // 删除商品id
            deleteProductId: '',
            // 删除商品在前端的序号
            deleteIndex: -1
        };
    },
    mounted () {
        this._getCartList();
    },
    methods: {
        _getCartList () {
            getCartList().then((res) => {
                if (res.status === '0') {
                    this.cartList = res.result;
                    this.cartList.forEach((item) => {
                        // 添加新属性
                        Vue.set(item, 'ischecked', false);
                    });
                    console.log(this.cartList);
                }
            });
        },
        showDeleteModal (productId, index) {
            this.deleteMdShow = true;
            this.deleteProductId = productId;
            this.deleteIndex = index;
        },
        closeDeleteModal () {
            this.deleteMdShow = false;
        },
        deleteProduct () {
            deleteProduct(this.deleteProductId).then((res) => {
                if (res.status === '0') {
                    console.log(res.result);
                    // 删除成功关闭删除模态框
                    this.deleteMdShow = false;
                    // // 重新获取购物车列表数据
                    // this._getCartList();
                    // 此处应该在前端直接修改(使之与后端同步),如果重新获取购物车列表会重置checked状态
                    this.cartList.splice(this.deleteIndex, 1);
                }
            });
        },
        editProductNum (flag, item) {
            if (flag === 'minus') {
                // 数量小于1则不能继续减少
                if (item.productNum <= 1) {
                    return;
                }
                item.productNum--;
            } else {
                item.productNum++;
            }
            editProductNum(item.productId, item.productNum).then((res) => {
                if (res.status === '0') {
                    console.log(res.result);
                }
            });
        },
        toggleCheck (item) {
            item.ischecked = !item.ischecked;
        },
        toggleAllCheck () {
            if (this.isAllChecked) {
                this.cartList.forEach((item) => {
                    item.ischecked = false;
                });
            } else {
                this.cartList.forEach((item) => {
                    item.ischecked = true;
                });
            }
        },
        checkOut () {
            if (this.hasChecked) {
                this.$router.push({
                    path: '/address'
                });
            }
        }
    },
    computed: {
        totalPrice () {
            let sum = 0;
            this.cartList.forEach((item) => {
                if (item.ischecked) {
                    sum += parseFloat(item.salePrice) * parseFloat(item.productNum);
                }
            });
            return sum.toFixed(2);
        },
        isAllChecked () {
            return this.cartList.every((item) => {
                return item.ischecked === true;
            });
        },
        hasChecked () {
            return this.cartList.some((item) => {
                return item.ischecked === true;
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
        modal
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
        .modal-text
            height: 80px
            margin-bottom: 10px
            text-align: center
            color: #666
        .modal-btn
            height: 40px
            .btn-success
                display: inline-block
                width: 45%
                margin: 0 2%
                line-height: 40px
                text-align: center
                border: 1px solid #d1434a
                box-sizing: border-box
                font-weight: 700
                cursor: pointer
                &.left
                    color: #d1434a
                    &:hover
                        background: rgba(209, 67, 74, 0.2)
                &.right
                    background: #d1434a
                    color: #ffffff
                    &:hover
                        background: rgba(209, 67, 74, 0.8)
            @media only screen and (max-width: 375px)
                .btn-success
                    margin: 0 1%
                    font-size: 13px
            .btn-fail
                width: 50%
                margin: 0 auto
                line-height: 40px
                text-align: center
                border: 1px solid #d1434a
                box-sizing: border-box
                font-weight: 700
                color: #d1434a
                cursor: pointer
                &:hover
                    background: rgba(209, 67, 74, 0.2)
</style>
