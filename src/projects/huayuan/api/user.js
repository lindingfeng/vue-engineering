import request from '@@/utils/request'

/**
 * @author Lin
 * @date 2018/11/29
 * @Description: 管理员登录
*/
export function login(username, password) {
  return request({
    url: '/Login/login',
    method: 'post',
    data: {
      mobile: username,
      password
    }
  })
}
/**
 * @author Lin
 * @date 2018/11/29
 * @Description: 获取会员基本信息列表
*/
export function getMemberInfoLists(data) {
  return request({
    url: '/User/getUserList',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/30
 * @Description: 禁用/启用会员
*/
export function stopOrUp(data) {
  return request({
    url: '/User/editUserVip',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/30
 * @Description: 获取下级列表
*/
export function getSubordinateList(data) {
  return request({
    url: '/User/getUserLower',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/24
 * @Description: 获取佣金明细
*/
export function getIncomeList(data) {
  return request({
    url: '/User/getIncomeList',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/6
 * @Description: 获取今日预约、今日订单、新增会员
*/
export function getBaseDate(data) {
  return request({
    url: '/Index/getDataCount',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/21
 * @Description: 数据统计 -> 获取新增用户数据
 */
export function getUserCount(data) {
  return request({
    url: '/Index/getUserCount',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/21
 * @Description: 数据统计 -> 获取用户预约数据
 */
export function getMakeCount(data) {
  return request({
    url: '/Index/getMakeCount',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/21
 * @Description: 数据统计 -> 获取订单数据
 */
export function getOrderCount(data) {
  return request({
    url: '/Index/getOrderCount',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/21
 * @Description: 数据统计 -> 获取当月金额数据
 */
export function getMoneyCount(data) {
  return request({
    url: '/Index/getAmountCount',
    method: 'post',
    data: data
  })
}
