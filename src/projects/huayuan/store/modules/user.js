import {
  login,
  getMemberInfoLists,
  stopOrUp,
  getSubordinateList,
  getBaseDate,
  getUserCount,
  getMakeCount,
  getOrderCount,
  getMoneyCount,
  getIncomeList
} from '@@/api/user'
import { getToken, setToken, removeToken } from '@@/utils/auth'

const user = {
  state: {
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password).then(response => {
          if(response.data.errcode==0 && response.data.data){
            setToken(response.data.data)
            commit('SET_TOKEN', response.data.data)
          }
          resolve(response.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 获取会员基本信息列表
    GetMemberInfoLists({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getMemberInfoLists(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        });
      })
    },
    // 禁用/启用会员
    StopOrUp({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        stopOrUp(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        });
      })
    },
    // 获取下级列表
    GetSubordinateList({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getSubordinateList(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        });
      })
    },
    // 获取佣金明细
    GetIncomeList({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getIncomeList(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        });
      })
    },
    // 获取今日预约、今日订单、新增会员
    GetBaseDate({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getBaseDate(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        });
      })
    },
    // 数据统计 -> 获取新增用户数据
    GetUserCount({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getUserCount(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        });
      })
    },
    // 数据统计 -> 获取当月金额数据
    GetMoneyCount({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getMoneyCount(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        });
      })
    },
    // 数据统计 -> 获取订单数据
    GetOrderCount({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getOrderCount(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        });
      })
    },
    // 数据统计 -> 获取用户预约数据
    GetMakeCount({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getMakeCount(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        });
      })
    }
  }
}

export default user
