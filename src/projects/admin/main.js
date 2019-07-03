// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import adminApi from './apis/adminApi'

import 'element-ui/lib/theme-chalk/index.css'

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

// Vue.prototype.$adminApi = adminApi

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
