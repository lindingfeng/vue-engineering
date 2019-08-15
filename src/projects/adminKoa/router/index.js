import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import {
  defaults,
  normal,
  root
} from '@@/permission/permission'

Vue.use(Router)

let defaultRoute = []
const role = Cookies.get('role')

if (+role === 2) {
  defaultRoute = [
    ...root,
    ...defaults
  ]
} else {
  defaultRoute = [
    ...normal,
    ...defaults
  ]
}

const router = new Router({
  // base: '/demo/',
  routes: defaultRoute
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
