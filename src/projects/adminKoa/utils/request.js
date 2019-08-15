import axios from 'axios'
import Cookies from 'js-cookie'
import store from '../router'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://132.232.35.229:3000',
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.data.token = Cookies.get('token')
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    // 登录态失效
    if (+response.data._errCode === 1010) {
      setTimeout(() => {
        Cookies.remove('token')
        Cookies.remove('role')
        store.push(`/login?back=${true}`)
      }, 1000)
    }
    return response;
  },
  error => {
    console.log(error.message)
  }
)

export default service

