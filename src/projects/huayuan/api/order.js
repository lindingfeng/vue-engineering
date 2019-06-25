import request from '@@/utils/request'

/**
 * @author Lin
 * @date 2018/12/5
 * @Description: 获取订单列表
*/
export function getOrderList(data) {
  return request({
    url: '/Order/getOrderList',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/5
 * @Description: 确认到店
*/
export function setArrive(data) {
  return request({
    url: '/Order/editState',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/5
 * @Description: 订单详情
*/
export function getOrderDetail(data) {
  return request({
    url: '/Order/getOrder',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/6
 * @Description: 获取退款/售后订单列表
*/
export function getRefundList(data) {
  return request({
    url: '/Order/getRefundList',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/6
 * @Description: 同意/拒绝客户的退款申请
*/
export function setOrderState(data) {
  return request({
    url: '/Order/editRefund',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/6
 * @Description: 获取某会员的消费记录
*/
export function getMemberOrder(data) {
  return request({
    url: '/User/getUserOrder',
    method: 'post',
    data: data
  })
}
