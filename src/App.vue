<template>
  <div id="app">
    <m-header></m-header>
    <router-view/>
    <m-footer></m-footer>
    <loginmodal></loginmodal>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header.vue';
import MFooter from 'components/m-footer/m-footer.vue';
import loginmodal from 'components/loginmodal/loginmodal.vue';

export default {
  name: 'App',
  components: {
        MHeader,
        MFooter,
        loginmodal
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width: 100%
    display: flex
    flex-flow: column
    min-height: 100vh
    min-width: 320px
</style>
