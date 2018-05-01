<template>
  <div class="goodslist">
      <div class="goodslist-content">
        <div class="sort">
            <span class="text">排序:&nbsp;&nbsp;&nbsp;&nbsp;<span class="pricesort">价格从低到高</span></span>
        </div>
        <div class="goodsinfo-container">
            <div class="price-filter">
                <div class="title">PRICE:</div>
                <ul class="price-list">
                    <li class="selected">All</li>
                    <li>0.00-100.00</li>
                    <li>100.00-500.00</li>
                    <li>500.00-1000.00</li>
                    <li>1000.00-2000.00</li>
                </ul>
            </div>
            <div class="goodsinfo">
                <ul class="goodsinfo-list clearfix">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <!-- <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li> -->
                </ul>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .goodslist
        background: #f5f7fc
        flex: 1
        .goodslist-content
            width: 100%
            max-width: 1280px
            margin: 0 auto
            padding: 30px 10px
            box-sizing: border-box
            .sort
                position: relative
                height: 55px
                line-height: 55px
                font-size: 14px
                color: #333333
                background: #ffffff
                .text
                    position: absolute
                    right: 40px
                    .pricesort
                        &:hover
                            color: #ee7a23
            .goodsinfo-container
                margin-top: 30px
                display: flex
                .price-filter
                    width: 190px
                    margin: 0 25px 0 15px
                    .title
                        margin-bottom: 30px
                        height: 20px
                        font-weight: bolder
                        letter-spacing: 2px
                        line-height: 20px
                        color: #605f5f
                    ul.price-list li
                        height: 27px
                        line-height: 28px
                        margin: 20px 0
                        font-size: 14px
                        color: #666666
                        transition: padding .3s ease-out
                        &:hover
                            padding: 0 15px
                            border-left: 2px solid #ee7a23
                            color: #ee7a23
                        &.selected
                            padding: 0 15px
                            border-left: 2px solid #ee7a23
                            color: #ee7a23
                            font-weight: bolder
                @media only screen and (max-width: 767px)
                    .price-filter
                        display: none
                .goodsinfo
                    flex: 1
                    background: green
                    ul.goodsinfo-list
                        overflow: hidden     /* BFC清除浮动 */
                        margin-left: -20px
                        li
                            float: left
                            height: 150px
                            width: 25%
                            padding-left: 20px
                            box-sizing: border-box
                            background-clip: content-box
                            margin-bottom: 20px
                            background-color: #ffffff
                    @media only screen and (max-width: 991px)
                        ul.goodsinfo-list
                            margin-left: -20px
                            li
                                width: 33.33%
                                padding-left: 20px
                    @media only screen and (max-width: 767px)
                        ul.goodsinfo-list
                            margin-left: 0
                            li
                                width: 100%
                                padding-left: 0
                    // .clearfix:after
                    //     display: block
                    //     content: ''
                    //     height: 0
                    //     line-height: 0
                    //     visibility: hidden
                    //     clear: both
                    // .clearfix
                    //     zoom: 1
</style>
