import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import order from './module/order'
import koa2Api from '@@/apis/koa2Api'

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    isValidloginState: false,
    avatar: Cookies.get('avatar')
  },

  mutations: {
    setLoginState (state, data) {
      state.isValidloginState = data
    },
    setAvatar (state, data) {
      state.avatar = data
    }
  },

  actions: {
    async checkLoginState ({ commit }) {
      const token = Cookies.get('token')
      if (!token) {
        return
      }
      try {
        let ret = await koa2Api.checkLoginState()
        if (+ret.data._errCode === 0) {
          if (+ret.data._data.status === 1) {
            commit('setLoginState', true)
          } else if (+ret.data._data.status === 2) {
            commit('setLoginState', false)
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  },

  modules: {
    order
  }

})

export default store
