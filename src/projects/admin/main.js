// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import adminApi from './apis/adminApi'
import 'iview/dist/styles/iview.css'

// 解决移动端click延迟300ms
// import FastClick from 'fastclick'
// FastClick.attach(document.body)

// 移动端调试工具
// import VConsole from 'vconsole/dist/vconsole.min.js'
// new VConsole()

// 模拟接口数据(mock)
import './mock'

Vue.prototype.$adminApi = adminApi

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
