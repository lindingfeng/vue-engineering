import Mock from 'mockjs'

/*
  *@Description: 订单列表
  *@Author: lindingfeng
  *@Date: 2019-07-01 15:27:15
*/
const getOrderList = () => {
  let data = []
  for(let i = 0; i < 10; i ++) {
    data.push({
      'Date': Mock.Random.date()
    })
  }
  // 拦截包含 /api/getOrderList 的接口请求
  Mock.mock(/\/api\/getOrderList/, 'post', data)
}

/*
  *@Description: 订单详情
  *@Author: lindingfeng
  *@Date: 2019-07-01 15:27:15
*/
const getOrderDetails = () => {
  let data = []
  for(let i = 0; i < 10; i++) {
    data.push({
      'Date': Mock.Random.date()
    })
  }
  // 拦截包含 /api/getOrderDetails 的接口请求
  Mock.mock(/\/api\/getOrderDetails/, 'post', data)
}

export default {
  getOrderList,
  getOrderDetails
}