<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="total">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star size="36" :score="seller.serviceScore" class="star"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star size="36" :score="seller.foodScore" class="star"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select
        :ratings="ratings"
        :selectType="selectType"
        :onlyContent="onlyContent"
        @select="selectRating"
        @toggle="toggleRating"
      ></rating-select>
      <div class="rating-wrapper">
        <ul>
          <li
            v-for="(rating,index) in ratings"
            :key="index"
            class="rating-item border-1px"
            v-show="needShow(rating.rateType,rating.text)"
          >
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28" />
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star class="star" size="36" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommand" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="(item,index) in rating.recommend" :key="index" class="item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Star from '../star/star'
import Split from '../split/split'
import RatingSelect from '../ratingselect/ratingselect'
import { formatDate } from '../../common/js/date'
import Bscroll from '@better-scroll/core'
/* eslint-disable no-unused-vars */
const POSITIVE = 0
const NAGATIVE = 1
const ALL = 2
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {
    this.$http.get('/api/ratings').then(res => {
      if (res.body.error === ERR_OK) {
        this.ratings = res.body.data
        this.$nextTick(() => {
          this.scroll = new Bscroll(this.$refs.ratings, {
            click: true
          })
          // this.scroll.refresh()
        })
      }
    })
  },
  data() {
    return {
      selectType: ALL,
      onlyContent: false,
      ratings: []
    }
  },
  methods: {
    needShow(type, text) {
      if (!text && this.onlyContent) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    selectRating(type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    toggleRating() {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  components: {
    Star,
    Split,
    RatingSelect
  },
  filters: {
    // formatDate: function(time){}简写形式
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>
<style lang='stylus' type='stylussheet'>
@import '../../common/stylus/index.stylus'
.ratings
  position: absolute
  width: 100%
  top: 174px
  left: 0
  bottom: 46px
  overflow: hidden
  .overview
    padding: 18px 0
    display: flex
    .overview-left
      flex: 0 0 137px
      width: 137px
      padding: 6px 0
      border-right: 1px solid rgba(7,17,27,0.1)
      text-align: center
      @media only screen and (max-width: 320px)
        flex: 0 0 120px
        width: 120px
      .score
        font-size: 24px
        color: rgb(255,153,0)
        line-height: 28px
        margin-bottom: 6px
      .total
        font-size: 12px
        color: rgb(7,17,27)
        line-height: 12px
        margin-bottom: 8px
      .rank
        font-size: 10px
        color: rgb(147,153,159)
        line-height: 10px
        margin-bottom: 6px
    .overview-right
      flex: 1
      padding: 6px 0 6px 24px
      @media only screen and (max-width: 320px)
        padding: 6px 0 6px 6px
      .score-wrapper
        margin-bottom: 8px
        font-size: 0
        .title
          display: inline-block
          vertical-align: top
          font-size: 12px
          color: rgb(7,17,27)
          line-height: 18px
        .star
          display: inline-block
          vertical-align: top
          margin: 0 12px
          line-height: 18px
        .score
          display: inline-block
          vertical-align: top
          font-size: 12px
          color: rgb(255,153,0)
          line-height: 18px
      .delivery-wrapper
          font-size: 0
          .title
            display: inline-block
            vertical-align: top
            font-size: 12px
            line-height: 18px
            color: rgb(7,17,27)
          .delivery
            display: inline-block
            vertical-align: top
            font-size: 12px
            line-height: 18px
            color: rgb(147,153,159)
            margin-left: 12px
  .rating-wrapper
    padding: 0 18px
    .rating-item
      display: flex
      padding: 18px 0
      border-1px(rgba(7,17,27,0.1))
      .avatar
        flex: 0 0 28px
        width: 28px
        margin-right: 12px
        img
          border-radius: 50%
      .content
        flex: 1
        position: relative
        .name
          font-size: 10px
          color: rgb(7,17,27)
          line-height: 12px
          margin-bottom: 4px
        .star-wrapper
          margin-bottom: 6px
          .star
            display: inline-block
            margin-right: 6px
            vertical-align : top
          .delivery
            display: inline-block
            vertical-align: top
            font-size: 10px
            font-weight: 200
            line-height: 16px
            color: rgb(147,153,159)
        .text
          line-height: 18px
          color: rgb(7,7,27)
          font-size: 12px
          margin-bottom: 8px
        .recommand
          line-height: 16px
          font-size: 0
          .icon-thumb_up,.item
            display: inline-block
            font-size: 9px
            margin: 0 6px 4px 0
          .icon-thumb_up
            color: rgb(0,160,220)
            font-size: 12px
          .item
            padding: 0 6px
            border: 1px solid rgba(7,17,27,0.1)
            border-radius: 2px
            background-color: rgb(255,255,255)
            color: rgb(147,153,159)
        .time
          position: absolute
          top: 0
          right: 0
          font-size: 10px
          font-weight: 200
          color: rgb(147,153,159)
          line-height: 12px
</style>
