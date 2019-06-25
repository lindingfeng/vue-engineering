import request from '@@/utils/request'

/**
 * @author Lin
 * @date 2018/11/21
 * @Description: 获取一级分类列表
 */
export function getClassfify() {
  return request({
    url: '/Classify/getPrimaryClassList',
    method: 'post'
  })
}
/**
 * @author Lin
 * @date 2018/11/21
 * @Description: 获取一级分类列表（分页）
 */
export function getClassfifyPage(data) {
  return request({
    url: '/Classify/getPrimarysClassList',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/21
 * @Description: 写入主分类或子分类
 */
export function setClassfify(data) {
  return request({
    url: '/Classify/operate',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/21
 * @Description: 获取子分类列表
 */
export function getClassfifyList(data) {
  return request({
    url: '/Classify/getClassList',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/27
 * @Description: 获取子分类列表（不分页）
*/
export function getClassfifyListNoPage(data) {
  return request({
    url: '/Classify/getSonClassList',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/21
 * @Description: 删除子分类
 */
export function deleteClassfify(data) {
  return request({
    url: '/Classify/operate',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/21
 * @Description: 获取子分类商品列表
 */
export function getClassfifyShopList(data) {
  return request({
    url: '/Classify/getClassGoods',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/28
 * @Description: 获取子分类商品列表（不分页）
*/
export function getClassfifyShopListNoPage(data) {
  return request({
    url: '/Goods/getAllGoodsList',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/26
 * @Description: 转移商品到某个类别
*/
export function moveClassfifyShop(data) {
  return request({
    url: '/Goods/setTransferGoods',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/21
 * @Description: 获取商品一级分类列表
 */
export function getShopClassfify() {
  return request({
    url: '/Goods/getPrimaryClassList',
    method: 'post'
  })
}
/**
 * @author Lin
 * @date 2018/11/21
 * @Description: 获取商品某个一级分类下的二级分类
 */
export function getChildClassfify(data) {
  return request({
    url: '/Goods/getSonClassList',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/21
 * @Description: 添加/编辑商品
 */
export function addShop(data) {
  return request({
    url: '/Goods/editGoods',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/21
 * @Description: 商品列表
 */
export function shopLists(data) {
  return request({
    url: '/Goods/getGoodsList',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/27
 * @Description: 商品详情
*/
export function shopDetails(data) {
  return request({
    url: '/Goods/getGoods',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/27
 * @Description: 商品上下架
*/
export function shopUpDowm(data) {
  return request({
    url: '/Goods/UpLowerGoods',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/28
 * @Description: 删除商品
*/
export function deleteShop(data) {
  return request({
    url: '/Goods/delGoods',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/28
 * @Description: 获取热门商品列表
 */
export function getHotLists(data) {
  return request({
    url: '/Goods/getHotGoodsList',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2018/11/28
 * @Description: 添加/删除热门商品
 */
export function addDeleteHot(data) {
  return request({
    url: '/Goods/editHotGoods',
    method: 'post',
    data: data
  })
}
/**
 * @author Lin
 * @date 2019/1/4
 * @Description: 编辑商品销量
*/
export function editShopSales(data) {
  return request({
    url: '/Goods/editSales',
    method: 'post',
    data: data
  })
}
