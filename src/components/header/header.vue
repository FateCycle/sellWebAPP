<template>
 <div class="header">
   <div class='content-wrapper'>
     <div class='avatar'>
       <img :src="seller.avatar" alt="pic" width="64" height="64">
     </div>
     <div class='content'>
       <div class='title'>
         <span class='brand'></span>
         <span class='name'>{{seller.name}}</span>
       </div>
       <div class='description'>{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
       <div class='supports' v-if='seller.supports'>
         <Icon :type="seller.supports[0].type" :size='1'></Icon>
         <span class='text'>{{seller.supports[0].description}}</span>
       </div>
     </div>
     <div class='support-count' v-if='seller.supports' @click='toggleDetail'>
       <span class='count'>{{seller.supports.length}}个</span>
       <span class="icon-keyboard_arrow_right"></span>
     </div>
   </div>
   <div class='bulletin-wrapper' @click='toggleDetail'>
     <span class='bulletin-title'></span><span class='bulletin-text'>{{seller.bulletin}}</span>
     <span class='icon-keyboard_arrow_right'></span>
   </div>
  <div class='background'>
    <img :src="seller.avatar" height="100%" width="100%">
  </div>
  <transition name="fade">
  <div class="detail" v-show="detailShow" @click='closeDetail'>
    <div class='detail-warpper clearfix'>
      <div class='detail-main'>
        <h1 class='name'>{{seller.name}}</h1>
        <div class='star-wrapper'>
          <Star size=48 :score="seller.score"></Star>
        </div>
        <div class='message-wrapper'>
          <Title message="优惠信息"></Title>
        </div>
        <ul class='supports' v-if='seller.supports'>
          <li class='supports-item' v-for='(item,index) in seller.supports' :key='index'>
            <Icon :type="item.type" :size='2'></Icon>
            <span class='text'>{{item.description}}</span>
          </li>
        </ul>
        <div class='message-wrapper'>
          <Title message="商家信息"></Title>
        </div>
        <div class='bulletin'>
          <p class='content'>{{seller.bulletin}}</p>
        </div>
      </div>
    </div>
    <div class='detail-close'>
      <span class='icon-close'></span>
    </div>
  </div>
  </transition>
 </div>
</template>

<script>
import Star from '../star/star'
import Title from '../title/title'
import Icon from '../icon/icon'
export default {
  props: ['seller'],
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    toggleDetail(){
      this.detailShow = true
    },
    closeDetail(){
      this.detailShow = false
    }
  },
  components: {
    Star,
    Title,
    Icon
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixin.stylus'
@import '../../common/stylus/icon.css'
.header
  position: relative
  color: #fff
  background-color: rgba(7,17,27,0.5)
  overflow: hidden
  .content-wrapper
    padding: 24px 12px 18px 24px
    font-size: 0
    position: relative
    .avatar
      display: inline-block
      vertical-align top
    .content
      display: inline-block
      margin-left: 16px
      .title
        margin: 2px 0 8px 0
        .brand
          display: inline-block
          vertical-align top
          width: 30px
          height: 18px
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
        .name
          margin-left: 6px
          font-size: 16px
          font-weight: bold
          color: rgb(255,255,255)
          line-height: 18px
      .description
        margin-bottom: 10px
        font-size: 12px
        line-height: 12px
        font-weight: 200
        color: rgb(255,255,255)
      .supports
        .icon
          margin-right: 4px
        .text
          font-size: 10px
          font-weight: 200
          line-height: 12px
          color: rgb(255,255,255)
    .support-count
      position: absolute
      bottom: 18px
      right: 12px
      padding: 0px 8px
      height: 24px
      line-height: 24px
      border-radius: 14px
      background-color: rgba(0,0,0,0.2)
      text-align: center
      .count
        font-size: 10px
        font-weight 200
        vertical-align: top
      .icon-keyboard_arrow_right
        font-size: 10px
        line-height: 24px
        margin-left: 2px
  .bulletin-wrapper
    position: relative
    height: 28px
    line-height: 28px
    padding: 0 22px 0 12px
    white-space: nowrap
    text-overflow: ellipsis
    overflow: hidden
    background-color: rgba(7,17,27,0.2)
    .bulletin-title
      display: inline-block
      width: 22px
      height: 12px
      vertical-align: top
      margin-top : 8px
      bg-image('bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat
    .bulletin-text
      font-size: 10px
      font-weight: 200
      line-height: 28px
      vertical-align: top
      margin: 0 4px
    .icon-keyboard_arrow_right
      position: absolute
      right: 12px
      top: 7px
      font-size: 10px
  .background
    position: absolute
    z-index: -1
    top: 0
    left: 0
    width: 100%
    height: 100%
    filter: blur(10px)
  .detail
    position: fixed
    overflow: auto
    z-index: 100
    left: 0
    top: 0
    width: 100%
    height: 100%
    backdrop-filter: blur(10px)
    background-color: rgba(7,17,27,0.8)
    &.fade-enter-active,&.fade-leave-active
      transition: all 2s
    &.fade-enter,&.fade-leave-to
      opacity: 0
    .detail-warpper
      min-height: 100%    //最小高度和手机一样高
      width: 100%         //让子元素能够水平居中，不然长度是更具子元素内容来撑开会左对齐
      .detail-main
        margin-top: 64px
        padding-bottom: 64px
        .name
          font-size: 16px
          font-weight: 700
          line-height: 16px
          color: rgb(255,255,255)
          text-align: center
        .star-wrapper
          height: 24px
          text-align: center
          margin-top: 16px
          padding: 2px 0
        .message-wrapper
          width: 80%
          margin: 28px auto 24px auto;
        .bulletin
          width: 80%
          margin: 0 auto
          .content
            padding: 0 12px
            font-size: 12px
            font-weight: 200
            line-height: 24px
            color: rgb(255,255,255)
        .supports
          width: 80%
          margin: 0 auto
          .supports-item
            padding:0 12px
            margin-bottom: 12px
            font-size: 0
            &:last-child
              margin-bottom: 0
            .icon
              margin-right: 6px
            .text
              font-size: 12px
              font-weight: 200
              line-height: 16px
              color: rgb(255,255,255)
    .detail-close
      position: relative
      width: 32px
      height: 32px
      font-size: 32px
      margin: -64px auto 0 auto
      clear: both
</style>
