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
      path: '/animation',
      name: 'animation',
      component: () => import('@@/pages/animation')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@@/pages/test')
    }
  ]
})
