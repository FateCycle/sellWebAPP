<template>
    <transition name="move">
      <div v-show="showFood" class="food" ref='food'>
        <div class='food-content'>
        <div class="image-header">
          <img :src="food.image" />
          <div class="back" @click="hide">
            <span class="icon-arrow_lift"></span>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售￥{{food.sellCount}}份</span>
            <span class="sell-rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol @add="addFood" :food="food" ref='cartcontrol'></cartcontrol>
          </div>
          <transition name='fade'>
            <div class="buy"  @click.stop.prevent='addFirst' v-show='!food.count||food.count===0'>加入购物车</div>
          </transition>
        </div>
        <split></split>
        <div class='info'>
          <h1 class='title'>商品信息</h1>
          <p class='text'>{{food.info}}</p>
        </div>
        <div class='rating'>
          <h1 class='title'>商品评价</h1>
          <rating-select :ratings='food.ratings' :selectType='selectType'
          :onlyContent='onlyContent' :desc='desc' @select='selectRating' @toggle='toggleRating'>
          </rating-select>
        </div>
        <div class='ratingWrapper'>
          <ul v-if='food.ratings && food.ratings.length'>
            <li v-for='(rating,index) in food.ratings' :key=index
            class='rating-item' v-show='needShow(rating.rateType,rating.text)'>
              <div class='user'>
                <span class='name'>{{rating.username}}</span>
                <img :src='rating.avatar' width="12" height="12" class='avatar'/>
              </div>
              <div class='time'>{{rating.rateTime | formatDate}}</div>
              <div class='text'>
                <span :class='[rating.rateType===0?"icon-thumb_up":"icon-thumb_down"]'></span>{{rating.text}}
              </div>
            </li>
          </ul>
          <div v-else class='no-rating'>暂无评论</div>
        </div>
        </div>
      </div>
    </transition>
</template>

<script>
import Bscroll from '@better-scroll/core'
import cartcontrol from '../cartcontrol/cartcontrol'
import Split from '../split/split'
import RatingSelect from '../ratingselect/ratingselect'
import {formatDate} from '../../common/js/date'
/* eslint-disable no-unused-vars */
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  props: ['food'],
  data() {
    return {
      showFood: false,
      selectType: ALL,
      desc: {
        POSITIVE: '推荐',
        NEGATIVE: '吐槽',
        ALL: '全部'
      },
      onlyContent: false
    }
  },
  methods: {
    show() {
      this.showFood = true
      this.$nextTick(() => {
        if (!this.foodScroll) {
          this.foodScroll = new Bscroll(this.$refs.food, {
            click: true
          })
        } else {
          this.foodScroll.refresh()
        }
      })
    },
    hide() {
      this.showFood = false
    },
    addFirst(e) {
      if (!e._constructed){
        return
      }
      this.$refs.cartcontrol.addCart(e)
    },
    addFood(target){
      this.$emit('add', target)
    },
    selectRating(type) {
      this.selectType = type
      this.$nextTick(()=>{
        this.foodScroll.refresh()
      })
    },
    toggleRating() {
      this.onlyContent = !this.onlyContent
      this.$nextTick(()=>{
        this.foodScroll.refresh()
      })
    },
    needShow(type,text){
      if (this.onlyContent && !text){
        return false
      }
      if (this.selectType === ALL){
        return true
      } else {
        return this.selectType === type
      }
    }
  },
  components: {
    cartcontrol,
    Split,
    RatingSelect
  },
  filters: {
    formatDate(time) {
      return formatDate(new Date(time),'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style lang='stylus' type='stylussheet'>
@import '../../common/stylus/index.stylus'
.food
  position: fixed
  left: 0
  top: 0
  bottom: 48px
  z-index: 30
  width: 100%
  background-color: #fff
  .image-header
    position: relative
    width: 100%
    padding-top: 100%
    height: 0
    img
      position: absolute
      width: 100%
      height: 100%
      top:0
      left:0
    .back
      position: absolute
      top: 10px
      left: 0
      .icon-arrow_lift
        display: block
        font-size: 20px
        padding: 10px
        color: #fff
  &.move-enter-active,&.move-leave-active
    transition: all .5s
  &.move-enter,&.move-leave-to
    transform: translate3d(100%,0,0)
  .content
    padding: 18px
    position: relative
    .title
      font-size: 14px
      font-weight: 700
      color: rgb(7,17,27)
      margin-bottom: 8px
      line-height: 14px
    .detail
      margin-bottom: 18px
      line-height: 10px
      font-size: 0px
      .sell-count
        margin-right: 12px
      .sell-count,.sell-rating
        font-size: 10px
        line-height: 10px
        color: rgb(147,153,159)
    .price
      font-weight:700
      line-height: 24px
      .now
        margin-right: 8px
        color: rgb(240,20,20)
        font-size: 14px
      .old
        text-decoration: line-through
        font-size: 10px
        color: rgb(147,153,159)
    .cartcontrol-wrapper
      position: absolute
      right: 12px
      bottom: 12px
    .buy
      position: absolute
      right: 18px
      bottom: 18px
      z-index: 10
      line-height: 24px
      height: 24px
      padding: 0 12px
      box-sizing: border-box
      font-size: 10px
      border-radius: 12px
      color: rgb(255,255,255)
      background-color: rgb(0,160,220)
      &.fade-enter-active,&.fade-leave-active
        transition: all 2s
      &.fade-enter,&.fade-leave-to
        opacity: 0
  .info
    padding: 18px
    .title
      height: 14px
      line-height: 14px
      color: rgb(7,17,27)
      margin-bottom: 6px
    .text
      font-size: 12px
      padding: 0 8px
      line-height: 24px
      color: rgb(77,85,93)
      font-weight: 200
  .rating
    padding-top: 18px
    .title
      margin-left: 18px
      height: 14px
      line-height: 14px
      color: rgb(7,17,27)
  .ratingWrapper
    padding: 0 18px
    .rating-item
      padding: 16px 0
      position: relative
      border-1px(rgba(7,17,27,0.1))
      .user
        position: absolute
        top: 16px
        right: 0
        font-size: 0
        .name
          display: inline-block
          vertical-align: top
          font-size: 20px
          line-height: 12px
          margin-right: 6px
          color: rgb(147,153,159)
        .avatar
          display: inline-block
          border-radius: 50%
          vertical-align: top
      .time
        font-size: 10px
        color: rgb(147,153,159)
        line-height: 12px
        margin-bottom: 6px
      .text
        line-height: 16px
        color: rgb(7,17,27)
        font-size: 12px
        .icon-thumb_up,.icon-thumb_down
          font-size: 12px
          line-height: 16px
          margin-right: 4px
        .icon-thumb_up
          color: rgb(0,160,220)
        .icon-thumb_down
          color: rgb(147,153,159)
    .no-rating
      padding: 16px 0
      font-size: 12px
      color: rgb(147,153,159)
</style>
