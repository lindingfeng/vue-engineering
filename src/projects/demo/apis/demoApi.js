import request from '@@/utils/request'

export default {
  getShopList () {
    return request({
      url: '/admin/mall/getShopList',
      method: 'get',
      params: {
        pageIndex: '',
        pageSize: '',
        price: '2.523585'
      }
    })
  },
  login () {
    return request({
      url: '/admin/mall/registered',
      method: 'post',
      params: {
        phone: '18084621621',
        password: '1234567'
      }
    })
  }
}