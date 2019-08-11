import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import {
  defaults
} from '@@/permission/permission'

Vue.use(Router)

// import Layout from '@@/pages/layout'

const router = new Router({
  // base: '/demo/',
  routes: defaults
})

router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
  if (!token) {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

export default router
