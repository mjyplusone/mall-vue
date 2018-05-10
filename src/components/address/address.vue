<template>
  <div class="address">
      <navbread>
          <span>My Address</span>
      </navbread>
      <div class="address-content">
          <m-progress :step="1"></m-progress>
          <div class="list shipping-address">
              <div class="title">收货地址</div>
              <ul>
                  <li v-for="(item, index) in filterAddressList" :key="item.addressId">
                      <div class="content" :class="{'selected': selectedAddrIndex === index}" @click="selectAddress(index, item.addressId)">
                          <div class="nickname">{{ item.userName }}</div>
                          <div class="useraddress">{{ item.streetName }}</div>
                          <div class="userphone">{{ item.tel }}</div>
                          <div class="default" v-show="item.isDefault">默认地址</div>
                          <div class="setdefault" v-show="!item.isDefault" @click="setDefault(item.addressId)">设置为默认地址</div>
                          <div class="icon-delete" @click="showDeleteMdModal(item.addressId)"></div>
                      </div>
                  </li>
                  <li>
                      <div class="content" @click="showAddModal">
                          <div class="add-wrapper">
                            <div class="icon-close"></div>
                            <div class="addtext">添加新地址</div>
                          </div>
                      </div>
                  </li>
              </ul>
              <div class="more">
                  <span @click="toggleAddressMore">more
                      <i class="icon-down" v-show="limit === 3"></i>
                      <i class="icon-up" v-show="limit > 3"></i>
                  </span>
              </div>
          </div>
          <div class="list shipping-method">
              <div class="title">收货方式</div>
              <ul>
                  <li>
                      <div class="content selected">
                          <div class="methodname">标准运送</div>
                          <div class="price">Free</div>
                          <div class="detail">发货后，订单将在1-7个工作日内运达</div>
                      </div>
                  </li>
              </ul>
          </div>
          <router-link tag="div" class="nextbtn" :to="{path: '/order', query: {'addressId': selectedAddrId}}">NEXT</router-link>
      </div>
      <modal :mdShow="deleteMdShow" @closeModal="closeDeleteModal">
          <div class="modal-text">确定删除此地址?</div>
          <div class="modal-btn">
              <div class="btn-success left" @click="deleteAddress">YES</div>
              <div class="btn-success right" @click="closeDeleteModal">NO</div>
          </div>
      </modal>
      <modal :mdShow="addMdShow" @closeModal="closeAddModal">
          <div class="title-add">新增收货地址</div>
          <div class="addinput">
              <label for="receiver">收货人姓名</label>
              <input type="text" v-model="userName" id="receiver">
          </div>
          <div class="addinput">
              <label for="address">详细地址</label>
              <input type="text" v-model="streetName" id="address">
          </div>
          <div class="addinput">
              <label for="phone">手机号码</label>
              <input type="text" v-model="tel" id="phone" @keyup.enter="saveAddress">
          </div>
          <div class="btn-save" @click="saveAddress">保存</div>
      </modal>
  </div>
</template>

<script>
import navbread from 'components/navbread/navbread.vue';
import modal from 'components/modal/modal.vue';
import MProgress from 'components/m-progress/m-progress.vue';
import {getAddressList, setDefault, deleteAddress, addAddress} from 'api/users.js';

export default {
    data () {
        return {
            addressList: [],
            // 默认显示地址条数
            limit: 3,
            // 选中地址索引
            selectedAddrIndex: 0,
            // 选中地址id
            selectedAddrId: '',
            // 删除地址模态框
            deleteMdShow: false,
            // 要删除的地址id
            deleteAddressId: '',
            // 增加地址模态框
            addMdShow: false,
            // 增加地址相关
            userName: '',
            streetName: '',
            tel: ''
        };
    },
    mounted () {
        this._getAddressList();
    },
    methods: {
        _getAddressList () {
            getAddressList().then((res) => {
                if (res.status === '0') {
                    this.addressList = res.result;
                    console.log(this.addressList);
                    // 设置初始选中地址id
                    this.addressList.forEach((item) => {
                        if (item.isDefault) {
                            this.selectedAddrId = item.addressId;
                        }
                    });
                }
            });
        },
        toggleAddressMore () {
            if (this.limit === 3) {
                // 当前为不展开状态,点击展开
                this.limit = this.addressList.length;
            } else {
                // 当前为展开状态,点击收起
                this.limit = 3;
            }
        },
        selectAddress (index, addressId) {
            this.selectedAddrIndex = index;
            this.selectedAddrId = addressId;
        },
        setDefault (addressId) {
            setDefault(addressId).then((res) => {
                if (res.status === '0') {
                    console.log('setdedault success');
                    this._getAddressList();
                    // 因为刚选中的默认地址放到了第一个,索引要跟着变
                    this.selectedAddrIndex = 0;
                }
            });
        },
        showDeleteMdModal (addressId) {
            this.deleteMdShow = true;
            this.deleteAddressId = addressId;
        },
        closeDeleteModal () {
            this.deleteMdShow = false;
        },
        deleteAddress () {
            deleteAddress(this.deleteAddressId).then((res) => {
                if (res.status === '0') {
                    console.log('delete address success');
                    this.deleteMdShow = false;
                    this._getAddressList();
                }
            });
        },
        closeAddModal () {
            this.addMdShow = false;
        },
        showAddModal () {
            this.addMdShow = true;
        },
        saveAddress () {
            addAddress(this.userName, this.streetName, this.tel).then((res) => {
                if (res.status === '0') {
                    console.log('add address success');
                }
                this.addMdShow = false;
                this._getAddressList();
            });
        }
    },
    computed: {
        filterAddressList () {
            let list1 = [];
            let list2 = [];
            this.addressList.forEach((item) => {
                if (item.isDefault) {
                    list1.push(item);
                } else {
                    list2.push(item);
                }
            });
            return list1.concat(list2).slice(0, this.limit);
            // return this.addressList.slice(0, this.limit);
        }
    },
    components: {
        navbread,
        modal,
        MProgress
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .address
        background: #f5f7fc
        flex: 1
        .address-content
            width: 100%
            max-width: 1280px
            margin: 0 auto
            padding: 50px 10px
            box-sizing: border-box
            .list
                margin-top: 50px
                .title
                    font-size: 18px
                    font-weight: 700
                    color: #605f5f
                    letter-spacing: 2px
                ul
                    margin-top: 20px
                    margin-left: -20px
                    overflow: hidden
                    li
                        float: left
                        width: 25%
                        padding-left: 20px
                        box-sizing: border-box
                        margin-bottom: 20px
                        height: 160px
                        color: #605f5f
                        .content
                            position: relative
                            height: 100%
                            padding: 20px
                            border: 1.5px solid #e9e9e9
                            box-sizing: border-box
                            background: #ffffff
                            font-size: 14px
                            cursor: pointer
                            &.selected
                                border: 1.5px solid #ee7a23
                            &:hover
                                border: 1.5px solid #ee7a23
                .more
                    text-align: center
                    color: #ee7a23
                    cursor: pointer
                @media only screen and (max-width: 991px)
                    ul > li
                        width: 50%
                @media only screen and (max-width: 767px)
                    ul
                        margin-left: 0
                        li
                            width: 100%
                            padding-left: 0
            .shipping-address
                .content
                    .nickname
                        margin-bottom: 12px
                    .useraddress
                        height: 44px
                        line-height: 1.25
                    .userphone
                        margin-bottom: 20px
                    .default
                        color: #ee7a23
                    .setdefault
                        display: none
                    .icon-delete
                        position: absolute
                        bottom: 15px
                        right: 15px
                        font-size: 20px
                        color: #605f5f
                    .add-wrapper
                        position: relative
                        margin: 20px 0
                        height: 80px
                        .icon-close
                            position: absolute
                            top: 0
                            left: 50%
                            transform: translateX(-50%) rotate(45deg)
                            font-size: 50px
                            color: rgba(0, 0, 0, 0.5)
                        .addtext
                            position: absolute
                            bottom: 0
                            left: 50%
                            transform: translateX(-50%)
                    &.selected:hover
                        .setdefault
                            display: block
                            color: #ee7a23
            .shipping-method
                .methodname
                    margin-bottom: 12px
                .price
                    font-weight: 700
                    margin-bottom: 30px
                .detail
                    line-height: 1.25
                    color: #999
            .nextbtn
                margin-top: 20px
                margin-bottom: 70px
                float: right
                width: 200px
                height: 40px
                background: #d1434a
                text-align: center
                line-height: 40px
                font-weight: 700
                letter-spacing: 2px
                color: #ffffff
                cursor: pointer
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
        .title-add
            position: absolute
            top: 22px
            font-size: 18px
            font-weight: 700
            line-height: 24px
            color: #333
        .addinput
            width: 100%
            height: 42px
            margin-bottom: 15px
            label
                display: inline-block
                width: 80px
                line-height: 42px
                text-align: right
            input
                display: inline-block
                vertical-align: top
                margin-left: 10px
                margin-top: 6px
                height: 30px
                width: 335px
                border: 1px solid #ccc
                padding: 0 10px
                box-sizing: border-box
                color: #333
        .btn-save
            margin-top: 28px
            width: 100%
            height: 40px
            background: #009de6
            font-size: 18px
            line-height: 40px
            text-align: center
            color: #ffffff
            cursor: pointer
            &:hover
                background: rgba(0, 157, 230, 0.7)
        @media only screen and (max-width: 767px)
            .title-save
                top: 14px
            .addinput
                input
                    width: 50%
            .btn-login
                margin-top: 28px
        @media only screen and (max-width: 350px)
            .addinput
                label
                    font-size: 14px
                input
                    width: 40%
</style>
