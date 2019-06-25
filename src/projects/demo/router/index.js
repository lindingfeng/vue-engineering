import Vue from 'vue'
import Router from 'vue-router'
import Index from '&/pages/index'
import Animation from '&/pages/animation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/animation',
      name: 'animation',
      component: Animation
    }
  ]
})
