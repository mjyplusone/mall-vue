<template>
<div class="progress">
    <ul >
        <li :class="{'selected': step >= 1}">
            <div class="text">确认地址</div>
            <div class="dot"></div>
        </li>
        <li :class="{'selected': step >= 2}">
            <div class="text">确认订单</div>
            <div class="dot"></div>
        </li>
        <li :class="{'selected': step >= 3}">
            <div class="text">付款</div>
            <div class="dot"></div>
        </li>
        <li :class="{'selected': step === 4}">
            <div class="text">订单成功</div>
            <div class="dot"></div>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    props: {
        step: {
            type: Number,
            default: 1
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .progress
        height: 40px
        border-bottom: 2px solid #ccc
        ul
            display: flex
            height: 100%
            li
                position: relative
                flex: 1
                height: 100%
                text-align: center
                .text
                    font-weight: 700
                    color: #999
                .dot
                    position: absolute
                    top: 100%
                    left: 50%
                    transform: translateY(-50%)
                    width: 14px
                    height: 14px
                    border-radius: 50%
                    background: #ccc
                &.selected
                    border-bottom: 2px solid #d1434a
                    .text
                        color: #d1434a
                    .dot
                        background: #d1434a
</style>
