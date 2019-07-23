// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import koa2Api from './apis/koa2Api'

// 解决移动端click延迟300ms
// import FastClick from 'fastclick'
// FastClick.attach(document.body)

// 移动端调试工具
import VConsole from 'vconsole/dist/vconsole.min.js'
new VConsole()

// 模拟接口数据(mock)
// import './mock'

// 国际化语言
// import VueI18n from 'vue-i18n'
// Vue.use(VueI18n)
// const i18n = new VueI18n({
//   locale: 'en',
//   messages: {
//     zh: require('./locales/zh-CN'),
//     en: require('./locales/en-CN')
//   }
// })

Vue.prototype.$koa2Api = koa2Api

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // i18n,
  components: { App },
  template: '<App/>'
})
