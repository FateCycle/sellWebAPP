<template>
<div>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class='menu-item' :key='index'
         :class='{current:currentIndex===index}' @click='redirectFood(index,$event)'>
          <span class="text border-1px">
             <Icon :type="item.type" :size='3' v-if="item.type>=0"></Icon>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"  ref="foodsWrapper">
      <ul>
        <li v-for='(item,index) in goods' :key='index' class='foodList'>
          <h1 class='title'>{{item.name}}</h1>
          <ul>
            <li v-for='(food,index) in item.foods' :key='index'
            class='food-item border-1px' @click='showSelectFood(food,$event)'>
              <div class='icon'>
                <img :src="food.icon" alt="" width='57' height='57'>
              </div>
              <div class='content'>
                <h2 class='name'>{{food.name}}</h2>
                <p class='desc'>{{food.description}}</p>
                <div class='extra'>
                  <span class='count'>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class='price'>
                  <span class='now'>￥{{food.price}}</span>
                  <span class='old' v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
                </div>
                <div class='cartControlWrapper'>
                  <cart-control :food="food" @add='addFood'></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart ref='shopcart' :deliveryPrice='seller.deliveryPrice'
    :minPrice='seller.minPrice' :selectFoods='selectFoods'></shop-cart>
  </div>
  <food :food='selectFood' ref='food' @add='addFood'></food>
</div>
</template>

<script>
import Icon from '../icon/icon'
import Bscroll from '@better-scroll/core'
import ShopCart from '../shopcart/shopcart'
import CartControl from '../cartcontrol/cartcontrol'
import Food from '../food/food'
const ERR_OK = 0
export default {
  props: ['seller'],
  created() {
    this.$http.get('/api/goods').then(res => {
      if (res.body.error === ERR_OK) {
        this.goods = res.body.data
        this.$nextTick(() => {
          this.menuScroll = new Bscroll(this.$refs.menuWrapper, {
            click: true
          })
          this.foodScroll = new Bscroll(this.$refs.foodsWrapper, {
            probeType: 3,
            click: true
          })
          this.foodScroll.on('scroll', (pos)=>{
            this.scrollY = Math.abs(Math.round(pos.y))
          })
          this.calculateHeight()
        })
      }
    })
  },
  computed: {
    currentIndex(){
      for (let i = 0; i < this.listHeight.length; i++){
        if (i === this.listHeight.length - 1 || (this.scrollY >= this.listHeight[i] && this.scrollY < this.listHeight[i + 1])) {
          return i
        }
      }
      return -1
    },
    selectFoods(){
      let foods = []
      this.goods.forEach(good=>{
        good.foods.forEach(food=>{
          if (food.count){
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectFood: {}
    }
  },
  methods: {
    calculateHeight(){
      let foodList = document.getElementsByClassName('foodList')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++){
        height += foodList[i].clientHeight
        this.listHeight.push(height)
      }
    },
    redirectFood(index, e){
      if (!e._constructed){
        return
      }
      let foodList = document.getElementsByClassName('foodList')
      this.foodScroll.scrollToElement(foodList[index], 300)
    },
    addFood(target){
      console.log(target)
      this._drop(target)
    },
    _drop(target){
      this.$refs.shopcart.drop(target)
    },
    showSelectFood(food,e) {
      if (!e._constructed) {
        return
      }
      this.selectFood = food
      this.$refs.food.show()
    }
  },
  components: {
    Icon,
    ShopCart,
    CartControl,
    Food
  }
}
</script>
<style lang='stylus' type="stylussheet">
@import '../../common/stylus/mixin.stylus'
.goods
  position: absolute
  display: flex
  bottom: 46px
  top: 174px
  width: 100%
  overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    .menu-item
      display: table
      font-size: 12px
      line-height: 14px
      font-weight: 200
      width: 56px
      height: 54px
      padding: 0 12px
      z-index: -1
      &.current
        z-index: 10
        position: relative
        font-weight: 700
        font-size: 12px
        background: #fff
        margin-top: -1px
      .icon
        margin-right: 2px
      .text
        display: table-cell
        vertical-align: middle
        width: 56px
        font-size: 12px
        //line-height: 14px
        border-1px(rgba(7,17,27,0.1))
  .foods-wrapper
    flex: 1
    .title
      font-size: 12px
      color: rgb(147,153,159)
      background-color: #f3f5f7
      line-height: 26px
      height: 26px
      padding-left: 14px
      border-left: 2px solid #d9dde1
    .food-item
      display:flex
      margin: 18px
      padding-bottom:18px
      border-1px(rgba(7,17,27,0.2))
      &:last-child
        margin-bottom: 0
        border-none()
      .icon
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        .name
          margin:2px 0 8px 0
          font-size: 14px
          line-height: 14px
          height: 14px
          color: rgb(7,17,27)
        .desc,.extra
          font-size: 10px
          color: rgb(147,153,159)
          line-height: 10px
        .desc
          margin-bottom: 8px
          line-height: 12px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin: 8px
            font-size: 14px
            color: rgb(240,20,20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147,153,159)
        .cartControlWrapper
          position: absolute
          right: 0
          bottom: 12px
</style>
