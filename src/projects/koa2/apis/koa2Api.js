import request from '@@/utils/request'

export default {
  checkLoginState () {
    return request({
      url: '/api/checkLoginState',
      method: 'post',
      data: {}
    })
  },
  login (data) {
    return request({
      url: '/api/login',
      method: 'post',
      data: data
    })
  },
  registered (data) {
    return request({
      url: '/api/registered',
      method: 'post',
      data: data
    })
  },
  changePwd (data) {
    return request({
      url: '/api/changePwd',
      method: 'post',
      data: data
    })
  },
  addCategory (data) {
    return request({
      url: '/api/addCategory',
      method: 'post',
      data: data
    })
  },
  getCategory () {
    return request({
      url: '/api/getCategory',
      method: 'post',
      data: {}
    })
  },
  uploadfile (data) {
    return request({
      url: '/api/uploadfile',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: data
    })
  },
  addShop (data) {
    return request({
      url: '/api/addShop',
      method: 'post',
      data: data
    })
  },
  getShopList (data) {
    return request({
      url: '/api/getShopList',
      method: 'post',
      data: data
    })
  },
  getAllAddress () {
    return request({
      url: '/json/area.json',
      method: 'get',
      data: {}
    })
  },
  addAddress (data) {
    return request({
      url: '/api/addAddress',
      method: 'post',
      data: data
    })
  },
  getAddress () {
    return request({
      url: '/api/getAddress',
      method: 'post',
      data: {}
    })
  },
  getAddressInfo (data) {
    return request({
      url: '/api/getAddressInfo',
      method: 'post',
      data: data
    })
  }
}