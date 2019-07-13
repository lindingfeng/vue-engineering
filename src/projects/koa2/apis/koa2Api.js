import request from '@@/utils/request'

export default {
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
  uploadfile (data) {
    return request({
      url: '/api/uploadfile',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: data
    })
  }
}