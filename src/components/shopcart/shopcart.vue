<template>
<div>
  <div class="shopcart">
    <div class="content" @click='toggleList'>
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{highlight: totalCount>0}">
            <span class="icon-shopping_cart" :class="{highlight: totalCount>0}"></span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highlight:totalPrice>0}">￥{{totalPrice}}元</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{highlight: totalPrice>=minPrice}" @click.stop.prevent='pay'>{{payDesc}}</div>
      </div>
    </div>
    <div class='ball-container'>
      <div v-for='(ball,index) in balls' :key=index>
        <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class='ball' v-show='ball.show'>
            <div class='inner inner-hooker'></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name='fold'>
      <div class='shopcart-list' v-show='!fold' >
        <div class='list-header'>
          <h1 class='title'>购物车</h1>
          <span class='empty' @click="empty">清空</span>
        </div>
        <div class='list-content' ref='listContent'>
          <ul>
            <li v-for='(food,index) in selectFoods' :key="index" class='food border-1px'>
              <span class='name'>{{food.name}}</span>
              <div class='price'>
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class='cartcontrol-wrapper'>
                <cart-control :food='food'></cart-control>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <transition name='maskFade'>
    <div class='list-mask' v-show="!fold" @click='closeMask'></div>
  </transition>
</div>
</template>

<script>
import CartControl from '../cartcontrol/cartcontrol'
import Bscroll from '@better-scroll/core'
export default {
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default: function() {
        return [{ price: 0, count: 2 }]
      }
    }
  },
  watch: {
    fold: {
      handler(val) {
        if (!val) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new Bscroll(this.$refs.listContent, {
                click: true
              })
            }
            this.scroll.refresh()
          })
        }
      }
    },
    deep: true
  },
  computed: {
    totalCount() {
      let num = 0
      this.selectFoods.forEach(elem => {
        num += elem.count
      })
      return num
    },
    totalPrice() {
      let price = 0
      this.selectFoods.forEach(elem => {
        price += elem.price * elem.count
      })
      return price
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
        return `还差￥${this.minPrice - this.totalPrice}元起送`
      } else {
        return '去结算'
      }
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: true
    }
  },
  methods: {
    drop(target) {
      this.balls.forEach(ball=>{
        if (!ball.show){
          ball.show = true
          ball.el = target
          this.dropBalls.push(ball)
        }
      })
    },
    beforeDrop(el) {
      if (this.dropBalls.length > 0){
        let ball = this.dropBalls[0]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = window.innerHeight - 22 - rect.top
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${-y}px,0)`
          el.style.transform = `translate3d(0,${-y}px,0)`
          let inner = el.getElementsByClassName('inner-hooker')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x},0,0)`
        }
      }
    },
    dropping(el,done){
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      this.$nextTick(()=>{
        el.style.webkitTransform = `translate3d(0,0,0)`
        el.style.transform = `translate3d(0,0,0)`
        let inner = el.getElementsByClassName('inner-hooker')[0]
        inner.style.webkitTransform = `translate3d(0,0,0)`
        inner.style.transform = `translate3d(0,0,0)`
        el.addEventListener('transitionend',done)
      })
    },
    afterDrop(el){
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    toggleList(){
      if (this.totalCount > 0) {
        this.fold = !this.fold
      }
    },
    empty(){
      this.selectFoods.forEach(food=>{
        food.count = 0
      })
    },
    closeMask(){
      this.fold = true
    },
    pay(){
      alert(`请支付${this.totalPrice}元`)
    }
  },
  components: {
    CartControl
  }
}
</script>

<style lang='stylus' type='stylussheet'>
@import '../../common/stylus/icon.css'
@import '../../common/stylus/index.stylus'
.shopcart
  position: fixed
  left: 0
  bottom: 0
  z-index: 50
  width: 100%
  height: 48px
  background-color: #141d27
  .content
    display: flex
    font-size: 0
    .content-left
      flex: 1
      .logo-wrapper
        display: inline-block
        position: relative
        top: -10px
        margin: 0 12px
        padding: 6px
        width: 56px
        height: 56px
        box-sizing: border-box
        border-radius: 50%
        background: #141d27
        vertical-align: top
        .logo
          width: 100%
          height: 100%
          text-align: center
          border-radius: 50%
          background-color: #2b343c
          &.highlight
            background-color: rgb(0,160,220)
          .icon-shopping_cart
            font-size: 24px
            line-height: 44px
            color: #80858a
            &.highlight
             color: rgb(255,255,255)
        .num
          position: absolute
          top: 0
          right: 0
          width: 24px
          height: 16px
          line-height: 18px
          text-align: center
          font-size: 9px
          font-weight: 700
          border-radius: 8px
          background-color: rgb(240,20,20)
          color: rgb(255,255,255)
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
      .price
        display: inline-block
        vertical-align: top
        box-sizing: border-box
        padding-right: 12px
        margin-top: 12px
        font-size: 16px
        font-weight: 700
        line-height: 24px
        color: rgba(255, 255, 255, 0.4)
        border-right: 1px solid rgba(255, 255, 255, 0.1)
        &.highlight
          color: rgb(255,255,255)
      .desc
        display: inline-block
        vertical-align: top
        font-size: 10px
        font-weight: 700
        line-height: 24px
        margin: 12px 0 0 12px
        color: rgba(255,255,255,0.4)
    .content-right
      flex: 0 0 105px
      width: 105px
      .pay
        text-align: center
        height: 48px
        font-size: 12px
        font-weight: 700
        line-height: 48px
        color: rgba(255,255,255,0.4)
        background-color: #2b333b
        &.highlight
          background-color: #00b43c
          color: #fff
  .ball-container
    .ball
      position: fixed
      bottom: 22px
      left: 32px
      z-index: 200
      transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background-color: rgb(0,160,220)
        transition: all .4s linear
  .shopcart-list
    position: absolute
    top: 0px
    left: 0
    z-index: -1
    width: 100%
    transform: translate3d(0,-100%,0)
    &.fold-enter-active,&.fold-leave-active
      transition : all .5s
    &.fold-enter,&.fold-leave-to
      transform: translate3d(0,0,0)
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background-color: #f3f5f7
      border: 1px solid rgba(7,17,27,0.1)
      .title
        float: left
        font-size: 14px
        font-weight: 200
        line-height: 40px
        color: rgb(7,17,27)
      .empty
        float: right
        font-size: 12px
        line-height: 40px
        color: rgb(0,160,220)
    .list-content
      max-height: 217px
      padding: 0 18px
      background: #fff
      overflow: hidden
      .food
        position: relative
        padding: 12px 0
        box-sizing: border-box
        border-1px(rbga(7,17,27,0.1))
        .name
          font-size: 14px
          color: rgb(7,17,27)
          line-height: 24px
        .price
          position: absolute
          right: 90px
          bottom: 12px
          line-height: 24px
          font-size: 14px
          font-weight: 700
          color: rgb(240,20,20)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 6px
.list-mask
  position: fixed
  width: 100%
  height: 100%
  left: 0
  top: 0
  z-index: 40
  backdrop-filter: blur(10)
  background-color: rgba(7,17,27,0.6)
  &.maskFade-enter-active,&.maskFade-leave-active
    transform: all .5s
  &.maskFade-enter,&.maskFade-leave-to
    opacity: 0
</style>
