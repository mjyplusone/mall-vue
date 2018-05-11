<template>
  <div class="signin">
      <navbread>
          <span>Sign In</span>
      </navbread>
      <div class="signin-content">
          <div class="headline">
              <div class="title">注册</div>
          </div>
          <div class="signinput">
              <input type="text" placeholder="昵称" v-model="userName">
              <input type="text" placeholder="密码" v-model="userPwd" @keyup.enter="signin">
              <div class="btn" @click="signin">注册</div>
          </div>
      </div>
  </div>
</template>

<script>
import navbread from 'components/navbread/navbread.vue';
import {signIn} from 'api/users.js';

export default {
    data () {
        return {
            userName: '',
            userPwd: ''
        };
    },
    methods: {
        signin () {
            // 用户名或密码为空则不发送请求
            if (!this.userName || !this.userPwd) {
                alert('用户名或密码为空');
                return;
            }
            signIn(this.userName, this.userPwd).then((res) => {
                if (res.status === '0') {
                    console.log(res.result);
                }
            });
        }
    },
    components: {
        navbread
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .signin
        background: #f5f7fc
        flex: 1
        .signin-content
            width: 100%
            max-width: 1280px
            margin: 0 auto
            padding: 50px 10px
            box-sizing: border-box
            .headline
                position: relative
                height: 20px
                border-bottom: 1px solid rgba(0, 0, 0, 0.1)
                .title
                    position: absolute
                    bottom: 0
                    left: 50%
                    width: 100px
                    transform: translate(-50%, 50%)
                    text-align: center
                    font-size: 30px
                    font-weight: 700
                    background: #f5f7fc
            .signinput
                margin: 50px auto
                width: 400px
                input
                    width: 100%
                    height: 40px
                    margin-bottom: 30px
                    padding: 0 10px
                    border: 1px solid rgba(0, 0, 0, 0.1)
                    box-sizing: border-box
                    border-radius: 3px
                    background: #f5f7fc
                    font-size: 14px
                .btn
                    width: 100%
                    height: 40px
                    text-align: center
                    line-height: 40px
                    letter-spacing: 5px
                    border-radius: 3px
                    background: #009de6
                    color: #ffffff
                    cursor: pointer
                    &:hover
                        background: rgba(0, 157, 230, 0.7)
                @media only screen and (max-width: 420px)
                    width: 200px
</style>
