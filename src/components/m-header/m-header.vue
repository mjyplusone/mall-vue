<template>
  <div class="m-header">
    <div class="header-content">
      <div class="logo"></div>
      <div class="title">EasyMall</div>
      <div class="login">Login</div>
      <div class="shopcart"></div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .m-header
    height: 70px
    .header-content
      position: relative
      height: 70px
      width: 100%
      max-width: 1280px
      margin: 0 auto
      .logo
        position: absolute
        top: 15px
        left: 30px
        width: 35px
        height: 35px
        border-radius: 50%
        background: url('../../common/image/dog.jpg')
        background-size: 100%
      .title
        position: absolute
        top: 20px
        left: 80px
        font-size: 25px
        font-weight: 700
      .login
        position: absolute
        right: 60px
        line-height: 70px
        color: #666666
        &:hover
          color: #d1434a
      .shopcart
        position: absolute
        top: 20px
        right: 20px
        width: 30px
        height: 30px
        background: url('../../common/image/shopcart.png')
        background-size: 100%
</style>
