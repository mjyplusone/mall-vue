<template>
  <div class="navbread">
      <div class="navbread-content">
        <span class="rootaddr"><router-link tag="a" to="/">Home</router-link> / </span>
        <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .navbread
        height: 45px
        background: #f0f0f0
        color: #d1434a
        .navbread-content
            width: 100%
            max-width: 1280px
            margin: 0 auto
            padding: 0 10px
            box-sizing: border-box
            .rootaddr
                line-height: 45px
                color: #999999
                a:hover
                    color: #d1434a
</style>
