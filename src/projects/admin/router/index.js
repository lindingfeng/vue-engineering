import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: () => import('@@/pages/index')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@@/pages/index'),
    }
  ]
})
export default router
