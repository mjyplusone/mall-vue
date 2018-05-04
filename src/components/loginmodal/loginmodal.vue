<template>
<transition name="slide">
  <div class="loginmodal" v-show="isShowLogin">
      <div class="login-content">
          <div class="title">Login in</div>
          <div class="err" v-show="isShowErr">用户名或密码错误</div>
          <div class="textinput">
              <div class="icon icon-community"></div>
              <input type="text">
          </div>
          <div class="textinput">
              <div class="icon icon-message"></div>
              <input type="text">
          </div>
          <div class="btn">登录</div>
          <div class="icon-close" @click="closeLogin"></div>
      </div>
  </div>
</transition>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
    data () {
        return {
            userName: '',
            userPwd: '',
            isShowErr: false
        };
    },
    methods: {
        closeLogin () {
            this.setIsShowLogin(false);
        },
        ...mapMutations({
            setIsShowLogin: 'SET_ISSHOWLOGIN'
        })
    },
    computed: {
        ...mapGetters([
            'isShowLogin'
        ])
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .loginmodal
        position: fixed
        top: 0
        bottom: 0
        left: 0
        right: 0
        background: rgba(0, 0, 0, 0.5)
        transition: all .5s
        &.slide-enter, &.slide-leave-to
            opacity: 0
        &.slide-enter .login-content, &.slide-leave-to .login-content
            opacity: 0
            transform: translate(-50%, 0)
        .login-content
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
            width: 535px
            padding: 60px 50px
            box-sizing: border-box
            background: #ffffff
            transition: all .5s
            .title
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
            .btn
                margin-top: 28px
                width: 100%
                height: 40px
                background: #009de6
                font-size: 18px
                line-height: 40px
                text-align: center
                color: #ffffff
                &:hover
                    background: rgba(0, 157, 230, 0.7)
            .icon-close
                position: absolute
                top: 10px
                right: 10px
                width: 24px
                height: 24px
                font-size: 24px
                color: rgba(0, 0, 0, 0.2)
                transition: all 0.5s
                &:hover
                    transform: rotate(-90deg)
        @media only screen and (max-width: 767px)
            .login-content
                width: 70%
                min-width: 160px
                padding: 60px 20px
                .title
                    top: 14px
                .textinput
                    padding: 9px 10px
                    input
                        width: 70%
                .btn
                    margin-top: 28px
</style>
