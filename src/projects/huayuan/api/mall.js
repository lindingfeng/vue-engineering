import request from '@@/utils/request'

/**
 * @author Lin
 * @date 2019/1/4
 * @Description: 获取商城商品列表
 */
export function getShopMallList(data) {
  return request({
    url: '/Gt_Goods/getGoodsList',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2019/1/4
 * @Description: 商城商品编辑销量
 */
export function editShopMallSales(data) {
  return request({
    url: '/Gt_Goods/editSales',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2019/1/4
 * @Description: 商城商品详情
 */
export function getShopMallDetails(data) {
  return request({
    url: '/Gt_Goods/getGoods',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2019/1/7
 * @Description: 添加/编辑商城商品
*/
export function addEditMallShop(data) {
  return request({
    url: '/Gt_Goods/editGoods',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2019/1/7
 * @Description: 商城商品上/下架
 */
export function upDownMallShop(data) {
  return request({
    url: '/Gt_Goods/UpLowerGoods',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2019/1/7
 * @Description: 删除商城商品
 */
export function delMallShop(data) {
  return request({
    url: '/Gt_Goods/delGoods',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2019/1/15
 * @Description: 商品->订单列表
 */
export function getShopOrderList(data) {
  return request({
    url: '/Gt_Order/getOrderList',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2019/1/15
 * @Description: 商品->订单详情
 */
export function getShopOrderDetail(data) {
  return request({
    url: '/Gt_Order/getOrder',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2019/1/15
 * @Description: 商品->订单售后/退款列表
 */
export function getShopRefundList(data) {
  return request({
    url: '/Gt_Order/getRefundList',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2019/1/15
 * @Description: 商品->获取用户收货信息
 */
export function getUserAddress(data) {
  return request({
    url: '/Gt_Order/getAddress',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2019/1/15
 * @Description: 商品->获取物流公司信息
 */
export function getLogistics(data) {
  return request({
    url: '/Gt_Order/getLogistics',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2019/1/15
 * @Description: 商品->添加/编辑发货信息
 */
export function setCourierInfo(data) {
  return request({
    url: '/Gt_Order/editCourier',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2019/1/15
 * @Description: 商品->获取物流信息
 */
export function getCourierInfo(data) {
  return request({
    url: '/Gt_Order/getCourier',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2019/1/15
 * @Description: 商品->退款/拒绝退款
 */
export function editRefund(data) {
  return request({
    url: '/Gt_Order/editRefund',
    method: 'post',
    data: data
  })
}
