import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: '/demo/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@@/pages/index')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@@/pages/login')
    },
    {
      path: '/registered',
      name: 'registered',
      component: () => import('@@/pages/registered')
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => import('@@/pages/forget')
    },
    {
      path: '/addShop',
      name: 'addShop',
      component: () => import('@@/pages/addShop')
    },
    {
      path: '/addCategory',
      name: 'addCategory',
      component: () => import('@@/pages/addCategory')
    },
    {
      path: '/shopList',
      name: 'shopList',
      component: () => import('@@/pages/shopList')
    },
    {
      path: '/shopDetail',
      name: 'shopDetail',
      component: () => import('@@/pages/shopDetail')
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: () => import('@@/pages/orderList')
    },
    {
      path: '/uploader',
      name: 'uploader',
      component: () => import('@@/pages/uploader')
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: () => import('@@/pages/addAddress')
    },
    {
      path: '/myAddress',
      name: 'myAddress',
      component: () => import('@@/pages/myAddress')
    }
  ]
})
