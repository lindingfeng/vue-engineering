import request from '@@/utils/request'

export default {
  getShopList (data) {
    return request({
      url: '/api/getShopList',
      method: 'post',
      data: data
    })
  },
  getCategory (data) {
    return request({
      url: '/api/getCategory',
      method: 'post',
      data: data
    })
  },
  operationCategory (data) {
    return request({
      url: '/api/operationCategory',
      method: 'post',
      data: data
    })
  }
}