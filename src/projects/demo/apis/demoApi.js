import request from '@@/utils/request'

export default {
  getOrderList () {
    return request({
      url: '/api/getOrderList',
      method: 'post'
    })
  }
}