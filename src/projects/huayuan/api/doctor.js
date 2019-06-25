import request from '@@/utils/request'

/**
 * @author Lin
 * @date 2018/12/20
 * @Description: 获取医生列表
*/
export function getDoctorLists(data) {
  return request({
    url: '/Doctor/getDoctorList',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/20
 * @Description: 添加/编辑医生
*/
export function addEditDoctor(data) {
  return request({
    url: '/Doctor/editDoctor',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/12/20
 * @Description: 删除医生
*/
export function deleteDoctor(data) {
  return request({
    url: '/Doctor/delDoctor',
    method: 'post',
    data: data
  })
}
