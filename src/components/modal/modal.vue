<template>
<transition name="slide">
  <div class="modal" v-if="mdShow" @click.stop="closeModal">
      <div class="modal-content" @click.stop>
          <slot></slot>
          <div class="icon-close" @click="closeModal"></div>
      </div>
  </div>
</transition>
</template>

<script>
export default {
    props: {
        mdShow: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        closeModal () {
            // 不能直接改变父组件传递的参数
            this.$emit('closeModal');
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .modal
        position: fixed
        top: 0
        bottom: 0
        left: 0
        right: 0
        background: rgba(0, 0, 0, 0.5)
        transition: all .5s
        &.slide-enter, &.slide-leave-to
            opacity: 0
        &.slide-enter .modal-content, &.slide-leave-to .modal-content
            opacity: 0
            transform: translate(-50%, 0)
        .modal-content
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
            width: 535px
            padding: 60px 50px
            box-sizing: border-box
            background: #ffffff
            transition: all .5s
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
            .modal-content
                width: 70%
                min-width: 160px
                padding: 60px 20px
</style>
