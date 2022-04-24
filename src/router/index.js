import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/home"
  },
  {
    // 首页
    path: '/home',
    name: 'Home',
    component: ()=> import('../views/home/index.vue')
  },
  {
    // 地图
    path: '/home/map',
    name: 'Map',
    component: ()=> import('../views/home/map/index.vue')
  },
  {
    // 搜索
    path: '/home/search',
    name: 'Search',
    component: ()=> import('../views/home/search/index.vue')
  },
  {
    // 新品 热品
    path: '/home/newgoods',
    name: 'Newgoods',
    component: ()=> import('../views/home/newgoods/index.vue')
  },
  {
    // 细化分类
    path: '/classify/goodslist',
    name: 'Goodslist',
    component: ()=> import('../views/classify/goodslist/index.vue')
  },
  {
    // 品牌
    path: '/home/brand',
    name: 'Brand',
    component: ()=> import('../views/home/brand/index.vue')
  },
  {
    // 品牌制造商
    path: '/home/bran',
    name: 'Bran',
    component: ()=> import('../views/home/bran/index.vue')
  },
  {
    // 专题
    path: '/topic',
    name: 'Topic',
    component: () => import('../views/topic/index.vue')
  },
  {
    // 专题详情
    path: '/topic/detail',
    name: 'Detail',
    component: () => import('../views/topic/detail/index.vue')
  },
  {
    // 分类
    path: '/classify',
    name: 'Classify',
    component: ()=> import('../views/classify/index.vue')
  },
  {
    // 购物车
    path: '/cart',
    name: 'Cart',
    component: ()=> import('../views/cart/index.vue')
  },
  {
    // 订单
    path: '/cart/order',
    name: 'Order',
    component: ()=> import('../views/cart/order/index.vue')
  },
  {
    // 我的
    path: '/mian',
    name: 'Mian',
    component: ()=> import('../views/mian/index.vue')
  },
  {
    // 我的收藏
    path: '/mian/collection',
    name: 'Collection',
    component: ()=> import('../views/mian/collection/index.vue')
  },
  {
    // 地址列表
    path: '/mian/address',
    name: 'Address',
    component: ()=> import('../views/mian/address/index.vue')
  },
  {
    // 编辑地址
    path: '/mian/editaddress',
    name: 'Editaddress',
    component: ()=> import('../views/mian/editaddress/index.vue')
  },
  {
    // 意见反馈
    path: '/mian/feedback',
    name: 'Feedback',
    component: ()=> import('../views/mian/feedback/index.vue')
  },
  
  {
    // 商品详情
    path: '/good',
    name: 'Good',
    component: ()=> import('../views/goods/index.vue')
  },
  
]

const router = new VueRouter({
  routes
})

export default router
