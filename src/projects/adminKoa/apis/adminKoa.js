import request from '@@/utils/request'

export default {
  // 获取商品列表
  getShopList (data) {
    return request({
      url: '/api/getShopList',
      method: 'post',
      data: data
    })
  },
  // 添加/编辑商品
  operationShop (data) {
    return request({
      url: '/api/operationShop',
      method: 'post',
      data: data
    })
  },
  // 获取商品分类列表
  getCategory (data) {
    return request({
      url: '/api/getCategory',
      method: 'post',
      data: data
    })
  },
  // 添加/编辑商品分类
  operationCategory (data) {
    return request({
      url: '/api/operationCategory',
      method: 'post',
      data: data
    })
  },
  // 删除商品分类
  deleteCategory (data) {
    return request({
      url: '/api/deleteCategory',
      method: 'post',
      data: data
    })
  },
  // 上/下架商品
  editShopStatus (data) {
    return request({
      url: '/api/editShopStatus',
      method: 'post',
      data: data
    })
  }
}