import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // base: '/demo/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@@/pages/index')
    }
  ]
})
