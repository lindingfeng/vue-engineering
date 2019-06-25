import {
  getBannerList,
  addEditBanner,
  getIndexInfo,
  setIndexInfo,
  getAdminInfo,
  editAdminPassword
} from '@@/api/system'
import { getToken, setToken, removeToken } from '@@/utils/auth'

const system = {
  state: {
    admin: {
      avatar: '',
      mobile: '',
      name: ''
    }
  },

  getters: {

  },

  mutations: {
    SET_ADMIN: (state, data) => {
      state.admin = data;
    }
  },

  actions: {
    // 系统设置->banner列表
    GetBannerList({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getBannerList(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 系统设置->添加/编辑banner图
    AddEditBanner({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        addEditBanner(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 系统设置->获取首页信息
    GetIndexInfo({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getIndexInfo(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 系统设置->编辑首页信息
    SetIndexInfo({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        setIndexInfo(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 系统设置->获取管理员信息
    GetAdminInfo({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getAdminInfo(data).then(res=>{
          if(res.data.errcode==0){
            commit('SET_ADMIN', res.data.data);
          }
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 系统设置->修改管理员密码
    EditAdminPassword({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        editAdminPassword(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    }
  }
}

export default system
