import request from '@@/utils/request'

export default {
  getShopList () {
    return request({
      url: '/api/getShopList',
      method: 'post',
      data: {}
    })
  },
  getCategory () {
    return request({
      url: '/api/getCategory',
      method: 'post',
      data: {}
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