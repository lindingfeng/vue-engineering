import request from '@@/utils/request'

/**
 * @author Lin
 * @date 2018/11/29
 * @Description: 系统设置->banner列表
*/
export function getBannerList(data) {
  return request({
    url: '/Index/getBannerList',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/30
 * @Description: 系统设置->添加/编辑banner图
*/
export function addEditBanner(data) {
  return request({
    url: '/Index/editBanner',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2019/1/4
 * @Description: 获取首页信息
*/
export function getIndexInfo(data) {
  return request({
    url: '/Index/getBrief',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2019/1/4
 * @Description: 编辑首页信息
 */
export function setIndexInfo(data) {
  return request({
    url: '/Index/editBrief',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/5
 * @Description: 获取管理员信息
*/
export function getAdminInfo(data) {
  return request({
    url: '/Index/getAdmin',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/5
 * @Description: 修改管理员密码
*/
export function editAdminPassword(data) {
  return request({
    url: '/Index/editPassword',
    method: 'post',
    data: data
  })
}
