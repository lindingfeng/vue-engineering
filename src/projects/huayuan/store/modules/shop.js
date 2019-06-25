import {
  getClassfify,
  getClassfifyPage,
  setClassfify,
  getClassfifyList,
  getClassfifyListNoPage,
  deleteClassfify,
  getClassfifyShopList,
  getClassfifyShopListNoPage,
  moveClassfifyShop,
  getShopClassfify,
  getChildClassfify,
  addShop,
  shopLists,
  shopDetails,
  shopUpDowm,
  deleteShop,
  getHotLists,
  addDeleteHot,
  editShopSales
} from '@@/api/shop'
import { getToken, setToken, removeToken } from '@@/utils/auth'

const shop = {
  state: {

  },

  mutations: {

  },

  actions: {
    // 获取主分类
    GetClassfify({ commit }) {
      return new Promise((resolve, reject) => {
        getClassfify().then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 获取主分类（分页）
    GetClassfifyPage({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getClassfifyPage(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 写入主分类或子分类
    SetClassfify({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        setClassfify(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 获取子分类列表
    GetClassfifyList({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getClassfifyList(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 获取子分类列表（不分页）
    GetClassfifyListNoPage({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getClassfifyListNoPage(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 删除子分类
    DeleteClassfify({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        deleteClassfify(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 获取子分类商品列表
    GetClassfifyShopList({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getClassfifyShopList(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 获取子分类商品列表（不分页）
    GetClassfifyShopListNoPage({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getClassfifyShopListNoPage(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 转移商品到某个类别
    MoveClassfifyShop({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        moveClassfifyShop(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 获取商品一级分类列表
    GetShopClassfify({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getShopClassfify(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 获取商品某个一级分类下的二级分类
    GetChildClassfify({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getChildClassfify(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 添加商品
    AddShop({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        addShop(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 商品列表
    ShopLists({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        shopLists(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 商品详情
    ShopDetails({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        shopDetails(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 商品上下架
    ShopUpDowm({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        shopUpDowm(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 删除商品
    DeleteShop({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        deleteShop(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 热门商品列表
    GetHotLists({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getHotLists(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 添加/删除热门商品
    AddDeleteHot({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        addDeleteHot(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 编辑商品销量
    EditShopSales({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        editShopSales(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    }
  }
}

export default shop
