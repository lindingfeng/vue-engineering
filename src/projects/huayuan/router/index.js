import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/index/index',
    name: 'redirect',
    hidden: true
  },

  {
    path: '/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@@/views/dashboard/index'),
        meta: { title: '首页', icon: 'index', noCache: true }
      }
    ]
  },

  {
    path: '/appointment',
    component: Layout,
    redirect: '/appointment/realTime',
    name: 'appointment',
    meta: { title: '预约查看', icon: 'appointment' },
    children: [
      {
        path: 'record',
        name: 'appointmentRecord',
        component: () => import('@@/views/appointment/record/index'),
        meta: { title: '预约记录' }
      }
    ]
  },
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/lists',
    name: 'shop',
    meta: { title: '项目管理', icon: 'shop' },
    children: [
      {
        path: 'lists',
        component: () => import('@@/views/shop/lists/index'), // Parent router-view
        name: 'lists',
        meta: { title: '项目列表' }
      },
      {
        path: 'addEdit',
        component: () => import('@@/views/shop/add/index'), // Parent router-view
        name: 'addEdit',
        meta: { title: '添加项目' }
      },
      {
        path: 'details',
        hidden: true,
        component: () => import('@@/views/shop/details/index'), // Parent router-view
        name: 'shopDetails',
        meta: { title: '商品详情' }
      },
      {
        path: 'classfify',
        component: () => import('@@/views/classfify/index'), // Parent router-view
        redirect: 'classfify/lists',
        name: 'classfify',
        meta: { title: '管理项目分类' },
        children: [
          {
            path: 'add',
            component: () => import('@@/views/classfify/add/index'),
            name: 'addClassfify',
            meta: { title: '添加分类' }
          },
          {
            path: 'edit',
            hidden: true,
            component: () => import('@@/views/classfify/edit/index'),
            name: 'edit',
            meta: { title: '编辑分类' }
          },
          {
            path: 'shop',
            hidden: true,
            component: () => import('@@/views/classfify/shopList/index'),
            name: 'shopList',
            meta: { title: '分类商品列表' }
          },
          {
            path: 'firstLists',
            component: () => import('@@/views/classfify/lists/index'),
            name: 'firstLists',
            meta: { title: '分类列表' }
          },
          {
            path: 'secondLists',
            hidden: true,
            component: () => import('@@/views/classfify/lists2/index'),
            name: 'secondLists',
            meta: { title: '分类列表' }
          }
        ]
      },
      {
        path: 'recommend',
        component: () => import('@@/views/recommend/index'), // Parent router-view
        redirect: 'recommend/lists',
        name: 'recommend',
        meta: { title: '推荐产品' },
        children: [
          {
            path: 'lists',
            component: () => import('@@/views/recommend/hot/index'),
            name: 'hotLists',
            meta: { title: '热门项目' }
          },
          {
            path: 'add',
            component: () => import('@@/views/recommend/add/index'),
            name: 'addHot',
            meta: { title: '添加热门' }
          }
        ]
      }
    ]
  },
  {
    path: '/mall',
    component: Layout,
    // hidden: true,
    redirect: '/mall/lists',
    name: 'mall',
    meta: { title: '商品管理', icon: 'mall' },
    children: [
      {
        path: 'lists',
        component: () => import('@@/views/mall/lists/index'), // Parent router-view
        name: 'mallists',
        meta: { title: '商品列表' }
      },
      {
        path: 'addEdit',
        component: () => import('@@/views/mall/add/index'), // Parent router-view
        name: 'mallAddEdit',
        meta: { title: '添加商品' }
      },
      {
        path: 'orderLists',
        component: () => import('@@/views/mall/orderLists/index'), // Parent router-view
        name: 'mallOrderLists',
        meta: { title: '订单列表' }
      },
      {
        path: 'detail',
        hidden: true,
        component: () => import('@@/views/mall/detail/index'), // Parent router-view
        name: 'mallDetail',
        meta: { title: '订单详情' }
      },
      {
        path: 'serviceLists',
        component: () => import('@@/views/mall/serviceLists/index'), // Parent router-view
        name: 'mallServiceLists',
        meta: { title: '售后/退货' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/lists',
    name: 'order',
    meta: { title: '订单管理', icon: 'order' },
    children: [
      {
        path: 'lists',
        component: () => import('@@/views/order/lists/index'), // Parent router-view
        name: 'orderLists',
        meta: { title: '订单列表' }
      },
      {
        path: 'detail',
        hidden: true,
        component: () => import('@@/views/order/detail/index'), // Parent router-view
        name: 'orderDetail',
        meta: { title: '订单详情' }
      },
      {
        path: 'service',
        component: () => import('@@/views/order/service/index'), // Parent router-view
        name: 'orderService',
        meta: { title: '售后/退货' }
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    redirect: '/member/lists',
    name: 'member',
    meta: { title: '会员管理', icon: 'member' },
    children: [
      {
        path: 'lists',
        component: () => import('@@/views/member/lists/index'), // Parent router-view
        name: 'memberLists',
        meta: { title: '会员基本信息' }
      },
      {
        path: 'withdraw',
        hidden: true,
        component: () => import('@@/views/member/withdraw/index'), // Parent router-view
        name: 'memberWithdraw',
        meta: { title: '会员提现' }
      },
      {
        path: 'consumption',
        hidden: true,
        component: () => import('@@/views/member/consumption/index'), // Parent router-view
        name: 'memberConsumption',
        meta: { title: '会员消费记录' }
      }
    ]
  },
  {
    path: '/doctor',
    component: Layout,
    redirect: '/doctor/lists',
    name: 'doctor',
    meta: { title: '医生信息', icon: 'doctor' },
    children: [
      {
        path: 'lists',
        component: () => import('@@/views/doctor/lists/index'), // Parent router-view
        name: 'doctorLists',
        meta: { title: '医生信息' }
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/index',
    name: 'statistics',
    meta: { title: '数据统计', icon: 'statistics' },
    children: [
      {
        path: 'index',
        component: () => import('@@/views/statistics/index/index'), // Parent router-view
        name: 'statisticsIndex',
        meta: { title: '数据统计' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/banner',
    name: 'system',
    meta: { title: '系统设置', icon: 'system' },
    children: [
      {
        path: 'banner',
        component: () => import('@@/views/system/banner/index'), // Parent router-view
        name: 'bannerLists',
        meta: { title: '首页轮播' }
      },
      {
        path: 'info',
        component: () => import('@@/views/system/info/index'), // Parent router-view
        name: 'info',
        meta: { title: '编辑/添加首页' }
      },
      {
        path: 'messages',
        hidden: true,
        component: () => import('@@/views/system/messages/index'), // Parent router-view
        name: 'messages',
        meta: { title: '消息栏通知' }
      },
      {
        path: 'account',
        component: () => import('@@/views/system/account/index'), // Parent router-view
        name: 'account',
        meta: { title: '账号管理' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  // base: '/huayuan/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
