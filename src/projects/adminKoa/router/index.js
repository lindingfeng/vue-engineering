import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@@/pages/layout'

export default new Router({
  // base: '/demo/',
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/index/index'
    },
    {
      path: '/index',
      component: Layout,
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('@@/pages/index'),
          meta: { title: '首页', icon: 'home' }
        }
      ]
    },
    {
      path: '/shop',
      name: 'shop',
      component: Layout,
      meta: { title: '商品管理', icon: 'shop' },
      children: [
        {
          path: 'shopList',
          name: 'shopList',
          component: () => import('@@/pages/shop/shopList'),
          meta: { title: '商品列表' }
        },
        {
          path: 'shopCategory',
          name: 'shopCategory',
          component: () => import('@@/pages/shop/shopCategory'),
          meta: { title: '商品分类' }
        },
        // {
        //   path: 'addSub',
        //   name: 'addSub',
        //   component: () => import('@@/pages/shop/addSub'),
        //   meta: { title: '商品加减' },
        //   children: [
        //     {
        //       path: 'add',
        //       name: 'add',
        //       component: () => import('@@/pages/shop/addSub/add'),
        //       meta: { title: '商品加' }
        //     },
        //     {
        //       path: 'sub',
        //       name: 'sub',
        //       component: () => import('@@/pages/shop/addSub/sub'),
        //       meta: { title: '商品减' }
        //     }
        //   ]
        // }
      ]
    }
  ]
})
