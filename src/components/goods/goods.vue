<template>
    <div class="goods">
        <m-header></m-header>
        <navbread>
            <span>Goods</span>
        </navbread>
        <goodslist></goodslist>
        <m-footer></m-footer>
    </div>
</template>

<script>
import MHeader from 'components/m-header/m-header.vue';
import navbread from 'components/navbread/navbread.vue';
import goodslist from 'components/goodslist/goodslist.vue';
import MFooter from 'components/m-footer/m-footer.vue';

export default {
    components: {
        MHeader,
        navbread,
        goodslist,
        MFooter
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .goods
        width: 100%
        display: flex
        flex-flow: column
        min-height: 100vh
        min-width: 320px
</style>
