import Layout from '@@/pages/layout'

/*
 * @description: 默认路由
 * @author: lindingfeng
 * @date: 2019-08-10 20:50:48
*/
export const defaults = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@@/pages/login')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@@/pages/404')
  }
]

/*
 * @description: 普通用户权限
 * @author: lindingfeng
 * @date: 2019-08-10 20:24:06
*/
export const normal = [
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
      }
    ]
  },
  {
    path: '/ad',
    component: Layout,
    children: [
      {
        path: 'banner',
        name: 'banner',
        component: () => import('@@/pages/ad'),
        meta: { title: '广告管理', icon: 'ad' }
      }
    ]
  }
]

/*
 * @description: 超级用户权限
 * @author: lindingfeng
 * @date: 2019-08-10 20:24:26
*/
export const root = [
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
      {
        path: 'addSub',
        name: 'addSub',
        component: () => import('@@/pages/shop/addSub'),
        meta: { title: 'VIP能看' },
        children: [
          {
            path: 'add',
            name: 'add',
            component: () => import('@@/pages/shop/addSub/add'),
            meta: { title: '商品加' }
          },
          {
            path: 'sub',
            name: 'sub',
            component: () => import('@@/pages/shop/addSub/sub'),
            meta: { title: '商品减' }
          }
        ]
      }
    ]
  },
  {
    path: '/ad',
    component: Layout,
    children: [
      {
        path: 'banner',
        name: 'banner',
        component: () => import('@@/pages/ad'),
        meta: { title: '广告管理', icon: 'ad' }
      }
    ]
  }
]

export default {
  normal,
  root
}