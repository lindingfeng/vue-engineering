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
      path: '/orderList',
      name: 'orderList',
      component: () => import('@@/pages/orderList')
    },
    {
      path: '/uploader',
      name: 'uploader',
      component: () => import('@@/pages/uploader')
    }
  ]
})
