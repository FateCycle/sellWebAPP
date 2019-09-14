import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'
/* eslint-disable */
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path:'/goods',
      name:'Goods',
      component:Goods
    },
    {
      path:'/ratings',
      name:'Ratings',
      component:Ratings
    },
    {
      path:'/seller',
      name:'Seller',
      component:Seller
    }
  ],
  linkActiveClass :'active'
});
