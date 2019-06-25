import {
  getOrderList,
  setArrive,
  getOrderDetail,
  getRefundList,
  setOrderState,
  getMemberOrder
} from '@@/api/order'
import { getToken, setToken, removeToken } from '@@/utils/auth'

const order = {
  state: {

  },

  mutations: {

  },

  actions: {
    // 获取订单列表
    GetOrderList({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getOrderList(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 确认到店
    SetArrive({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        setArrive(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 订单详情
    GetOrderDetail({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getOrderDetail(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 获取退款/售后订单列表
    GetRefundList({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getRefundList(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 获取退款/售后订单列表
    SetOrderState({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        setOrderState(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 获取某会员的消费记录
    GetMemberOrder({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getMemberOrder(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    }
  }
}

export default order
