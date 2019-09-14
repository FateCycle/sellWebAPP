<template>
  <div id="app">
    <v-header :seller='seller'></v-header>
    <div class='tab border-1px'>
      <div class='tab-item'>
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class='tab-item'>
        <router-link to='/ratings'>评论</router-link>
      </div>
      <div class='tab-item'>
        <router-link to='/seller'>商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from '../src/components/header/header'
import {urlParse} from '../src/common/js/util'
const ERR_OK = 0
export default {
  name: 'App',
  data(){
    return {
      seller: {
        id: urlParse().id
      }
    }
  },
  created(){
    this.$http.get('/api/seller').then(res =>{
      if (res.body.error === ERR_OK){
        this.seller = Object.assign({},this.seller,res.body.data)
      }
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import './common/stylus/index.stylus'
#app
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7,17,27,0.1));
    .tab-item
      flex: 1
      text-align: center
      & > a
        display : block
        font-size:14px
        color:rgb(77,85,93)
        &.active
          color:rgb(240,20,20)
</style>
