import request from '@@/utils/request'

export default {
  login () {
    return request({
      url: '/admin/mall/login',
      method: 'post'
    })
  }
}