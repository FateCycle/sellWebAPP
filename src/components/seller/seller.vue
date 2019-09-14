<template>
  <div class="seller" ref='seller'>
    <div class="sell-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star size="36" :score="seller.score" class="star"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class='content'>
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class='content'>
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class='content'>
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class='favorite' @click='toggleFavorite'>
          <span class='icon-favorite' :class="{active:favorite}"></span>
          <span class='text'>{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class='bulletin'>
        <div class='title'>公告与活动</div>
        <div class='bulletin-wrapper border-1px'>
          <p class='content'>{{seller.bulletin}}</p>
        </div>
        <ul class='supports' v-show='seller.supports'>
          <li v-for='(item,index) in seller.supports' :key=index class='support-item border-1px'>
            <Icon :type="item.type" :size='4'></Icon>
            <span class='text'>{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class='pics'>
        <h1 class='title'>商家实景</h1>
        <div class='pic_wrapper' ref='picdiv'>
          <ul class='pic_list' ref='piclist'>
            <li class='pic_item' v-for='(pic,index) in seller.pics' :key=index>
              <img :src="pic" alt="图片" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class='info'>
        <h1 class='title border-1px'>商家信息</h1>
        <ul>
          <li class='info-item border-1px' v-for='(info,index) in seller.infos' :key=index>
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Star from '../star/star'
import Split from '../split/split'
import Icon from '../icon/icon'
import Bscroll from '@better-scroll/core'
import {saveToLocal, readFromLocal} from '../../common/js/store'
export default {
  props: {
    seller: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    seller() {
      this._initScroll()
      this._initPics()
    }
  },
  mounted() {
    this._initScroll()
    this._initPics()
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  data() {
    return {
      favorite: readFromLocal(this.seller.id,'favorite',false)
    }
  },
  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new Bscroll(this.$refs.seller,{
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    _initPics() {
      const picWidth = 120
      const picMargin = 6
      this.$refs.piclist.style.width = this.seller.pics.length * (picWidth + picMargin) - picMargin + 'px'
      this.$nextTick(()=>{
        if (!this.picScroll) {
          this.picScroll = new Bscroll(this.$refs.picdiv,{
            eventPassthrough: 'vertical',
            scrollX: true
          })
        } else {
          this.picScroll.refresh()
        }
      })
    },
    toggleFavorite(e) {
      if (!e._constructed) {
        return
      }
      this.favorite = !this.favorite
      saveToLocal(this.seller.id,'favorite',this.favorite)
    }
  },
  components: {
    Star,
    Split,
    Icon
  }
}
</script>

<style lang='stylus' type='stylussheet'>
@import '../../common/stylus/index.stylus'
.seller
  position: absolute
  top: 174px
  left: 0
  bottom: 0
  width: 100%
  overflow: hidden
  .overview
    padding: 18px
    .title
      margin-bottom: 8px
      font-size: 14px
      color: rgb(7,17,27)
      line-height: 14px
    .desc
      font-size: 0
      padding-bottom: 18px
      border-1px(rgba(7,17,27,0.1))
      .star
        display: inline-block
        vertical-align: top
        margin-right: 8px
      .text
        display: inline-block
        vertical-align: top
        font-size: 10px
        color: rgb(77,85,93)
        line-height: 18px
        margin-right: 12px
    .remark
      display: flex
      padding-top: 18px
      .block
        flex: 1
        border-right: 1px solid rgba(7,17,27,0.1)
        text-align: center
        &:last-child
           border-none()
        h2
          font-size: 10px
          color: rgb(147,153,159)
          line-height: 10px
          margin-bottom: 4px
        .content
          font-size: 10px
          line-height: 10px
          color: rgb(7,17,27)
          .stress
            font-size: 24px
            line-height: 24px
            color: rgb(7,17,27)
    .favorite
      position: absolute
      top: 18px
      right: 11px
      text-align: center
      width: 50px
      .icon-favorite
        display: block
        font-size: 24px
        line-height: 24px
        color: #d4d6d9
        margin-bottom: 4px
        &.active
          color: rgb(240,20,20)
      .text
        font-size: 10px
        color: rgb(77,85,93)
        line-height: 10px
  .bulletin
    padding: 18px 18px 0 18px
    .title
      font-size: 14px
      color: rgb(7,17,27)
      line-height: 14px
      margin-bottom: 8px
    .bulletin-wrapper
      padding: 0 12px 16px 12px
      border-1px(rgba(7,17,27,0.1))
      .content
        font-size: 12px
        font-weight: 200
        color: rgb(240,20,20)
        line-height: 24px
    .supports
      .support-item
        padding: 16px 12px
        border-1px(rgba(7,17,27,0.1))
        .icon
          margin-right: 6px
        .text
          display: inline-block
          vertical-align: top
          font-size: 12px
          font-weight: 200
          color: rgb(7,17,27)
          line-height: 16px
  .pics
    padding: 18px
    .title
      font-size: 14px
      color: rgb(7,17,27)
      line-height: 14px
      margin-bottom: 12px
    .pic_wrapper
      width: 100%
      overflow: hidden
      white-space: nowrap
      .pic_list
        font-size: 0
        .pic_item
          display: inline-block
          vertical-align: top
          margin-right: 6px
          width: 120px
          height: 90px
          &:last-child
            margin-right: 0
  .info
    padding: 18px 18px 0 18px
    .title
      font-size: 14px
      color: rgb(7,17,27)
      line-height: 14px
      padding-bottom: 12px
      border-1px(rgba(7,17,27,0.1))
    .info-item
      padding: 16px 12px
      font-size: 12px
      font-weight: 200
      line-height: 16px
      color: rgb(7,17,27)
      border-1px(rgba(7,17,27,0.1))
      &:last-child
        border-none()
</style>
