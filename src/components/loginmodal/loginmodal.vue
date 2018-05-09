<template>
<modal :mdShow="isShowLogin" @closeModal="closeLoginModal">
    <div class="title-login">Login in</div>
    <div class="err" v-show="isShowErr">用户名或密码错误</div>
    <div class="textinput">
        <div class="icon icon-community"></div>
        <input type="text" v-model="userName">
    </div>
    <div class="textinput">
        <div class="icon icon-message"></div>
        <input type="text" v-model="userPwd" @keyup.enter="login">
    </div>
    <div class="btn-login" @click="login">登录</div>
</modal>
</template>

<script>
import modal from 'components/modal/modal.vue';
import {mapGetters, mapMutations} from 'vuex';
import {userLogin} from 'api/users.js';

export default {
    data () {
        return {
            userName: 'plusone',
            userPwd: '12345',
            isShowErr: false
        };
    },
    methods: {
        closeLoginModal () {
            this.setIsShowLogin(false);
            this.isShowErr = false;
        },
        login () {
            // 用户名密码不能为空
            if (!this.userName || !this.userPwd) {
                this.isShowErr = true;
                return;
            }

            userLogin(this.userName, this.userPwd).then((res) => {
                if (res.status === '0') {
                    // 登录成功
                    this.isShowErr = false;
                    this.setIsShowLogin(false);
                    // 设置登录后用户名,表示已登录
                    this.setLoginUserName(res.result.userName);
                } else {
                    // 登录失败
                    this.isShowErr = true;
                }
            });
        },
        ...mapMutations({
            setIsShowLogin: 'SET_ISSHOWLOGIN',
            setLoginUserName: 'SET_LOGINUSERNAME'
        })
    },
    computed: {
        ...mapGetters([
            'isShowLogin'
        ])
    },
    components: {
        modal
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .title-login
        position: absolute
        top: 24px
        font-size: 18px
        line-height: 24px
        color: #333
    .err
        margin-bottom: 10px
        font-size: 12px
        color: red
    .textinput
        width: 100%
        height: 42px
        margin-bottom: 15px
        padding: 9px 20px
        box-sizing: border-box
        border: 1px solid #ccc
        .icon
            display: inline-block
            font-size: 24px
            color: rgba(0, 0, 0, 0.3)
            line-height: 24px
        input
            display: inline-block
            vertical-align: top
            margin-left: 10px
            height: 24px
            width: 350px
            color: #333
            &:focus
                border: none
                outline: none
    .btn-login
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
        .title-login
            top: 14px
        .textinput
            padding: 9px 10px
            input
                width: 70%
        .btn-login
            margin-top: 28px
</style>
