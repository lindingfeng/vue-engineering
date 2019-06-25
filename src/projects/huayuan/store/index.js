import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import appointment from './modules/appointment'
import shop from './modules/shop'
import order from './modules/order'
import system from './modules/system'
import doctor from './modules/doctor'
import mall from './modules/mall'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    appointment,
    shop,
    order,
    system,
    doctor,
    mall
  },
  getters
})

export default store
