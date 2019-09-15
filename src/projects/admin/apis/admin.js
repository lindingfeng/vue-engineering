import request from '@@/utils/request'

export default {
  // 登陆
  login (data) {
    return request({
      url: '/api/admin/login',
      method: 'post',
      data: data
    })
  }
}