import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: 'https://api.mei57.com/admin', // api 的 base_url
  timeout: 10000 // 请求超时时间
})

// request拦截器
// service.interceptors.request.use(
//   config => {
//     if (store.getters.token) {
//       config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//     }
//     return config
//   },
//   error => {
//     // Do something with request error
//     console.log(error) // for debug
//     Promise.reject(error)
//   }
// )

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * errcode为9002是token失效
     */
    // console.log(response.data.errcode);
    if(response.data.errcode == 9002){
      // token过期
      return Promise.reject('token is overdue');
    }else {
      return response;
    }
  },
  error => {
    console.log(error.message) // for debug
    if(error.message === 'timeout of 10000ms exceeded'){
      // Message({
      //   message: '网络加载时间过长，请检查网络~',
      //   type: 'error',
      //   duration: 1000
      // })
      return Promise.reject('网络加载时间过长，请检查网络~')
    }else {
      return Promise.reject(error)
    }
  }
)

export default service
