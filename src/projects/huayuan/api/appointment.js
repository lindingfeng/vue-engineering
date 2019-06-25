import request from '@@/utils/request'
/**
 * @author Lin
 * @date 2018/11/30
 * @Description: 获取预约列表信息
*/
export function getAppointmentList(data) {
  return request({
    url: '/Reservation/getBookingList',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/5
 * @Description: 预约到店操作
*/
export function setArrival(data) {
  return request({
    url: '/Reservation/setArrival',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/5
 * @Description: 编辑预约信息
*/
export function editAppointment(data) {
  return request({
    url: '/Reservation/editBooking',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/5
 * @Description: 预约->获取某个分类下的所有商品（不分页）
*/
export function getAllGoodsList(data) {
  return request({
    url: '/Reservation/getAllGoodsList',
    method: 'post',
    data: data
  })
}
