import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost',
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(
  config => {
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
    return response;
  },
  error => {
    console.log(error.message)
  }
)

export default service

