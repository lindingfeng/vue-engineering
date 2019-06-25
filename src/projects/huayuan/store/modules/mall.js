import {
  getShopMallList,
  addEditMallShop,
  upDownMallShop,
  delMallShop,
  editShopMallSales,
  getShopMallDetails,
  getShopOrderList,
  getShopOrderDetail,
  getShopRefundList,
  getUserAddress,
  getLogistics,
  setCourierInfo,
  getCourierInfo,
  editRefund
} from '@@/api/mall'
import { getToken, setToken, removeToken } from '@@/utils/auth'

const shop = {
  state: {

  },

  mutations: {

  },

  actions: {
    // 获取商城商品列表
    GetShopMallList({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getShopMallList(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 添加/编辑商城商品
    AddEditMallShop({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        addEditMallShop(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 商城商品上/下架
    UpDownMallShop({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        upDownMallShop(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 删除商城商品
    DelMallShop({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        delMallShop(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 商城商品编辑销量
    EditShopMallSales({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        editShopMallSales(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 获取商城商品详情
    GetShopMallDetails({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getShopMallDetails(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 商品->订单列表
    GetShopOrderList({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getShopOrderList(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 商品->订单详情
    GetShopOrderDetail({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getShopOrderDetail(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 商品->订单售后/退款列表
    GetShopRefundList({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getShopRefundList(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 商品->获取用户收货信息
    GetUserAddress({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getUserAddress(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 商品->获取物流公司信息
    GetLogistics({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getLogistics(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 商品->添加/编辑发货信息
    SetCourierInfo({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        setCourierInfo(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 商品->获取物流信息
    GetCourierInfo({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getCourierInfo(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 商品->退款/拒绝退款
    EditRefund({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        editRefund(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    }
  }
}

export default shop
