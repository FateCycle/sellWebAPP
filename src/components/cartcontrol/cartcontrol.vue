<template>
  <div class="cartcontrol">
    <transition name="slide-rotate">
      <div class="cart-decrease" v-show='food.count>0' @click.stop.prevent='decreaseCart'>
        <span class='inner icon-remove_circle_outline'></span>
      </div>
    </transition>
    <div class="cart-count" v-show='food.count>0'>{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click.stop.prevent='addCart'></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    addCart(e) {
      // 禁用默认点击事件
      if (!e._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food,'count',1)
      } else {
        this.food.count++
      }
      this.$emit('add',e.target)
    },
    decreaseCart(e){
      if (!e._constructed) {
        return
      }
      if (this.food.count > 0) {
        this.food.count--
      }
    }
  }
}
</script>
<style lang='stylus' type='stylussheet'>
.cartcontrol
  font-size: 0
  .cart-decrease
    display: inline-block
    vertical-align: top
    padding: 6px
    .inner
      display: inline-block
      font-size: 24px
      line-height: 24px
      color: rgb(0,160,220)
    &.slide-rotate-enter-active,&.slide-rotate-leave-active
      transition: all .5s
    &.slide-rotate-enter,&.slide-rotate-leave-to
      transform: translate3d(24px,0,0) rotate(180deg)
      opacity: 1
  .cart-count
    display: inline-block
    text-align: center
    vertical-align: top
    line-height: 24px
    width: 12px
    padding-top: 6px
    font-size: 10px
    color: rgb(147,153,159)
  .cart-increase
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 24px
    color: rgb(0,160,220)
</style>
