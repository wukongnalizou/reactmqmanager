import request from '@/utils/request';
import { baseUrl } from '@/utils/settings';
/**
 * 模块：收入记录
 * createDate:2019-06-19
 * author:Cin
 */
// 获取商家交易记录列表--order-service--商家APP订单接口
export async function findSellerGoodsOrderList(param) {
  return request(
    `${baseUrl}order-service/sellerApp/v1/sellerOrder/findSellerGoodsOrderList`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 获取商家交易记录详情
export async function findSellerGoodsOrderById(param) {
  return request(
    `${baseUrl}order-service/sellerApp/v1/sellerOrder/findSellerGoodsOrderById`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 商品列表
export async function detailsGoddsList(param) {
  return request(
    `${baseUrl}seller/backstage/v1/goods/findGoodsAll`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 商品详情
export async function detailsGodds(param) {
  return request(
    `${baseUrl}seller/backstage/v1/goods/findGoodsById`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 经营范围一类的名字
export async function dataDategory(param) {
  return request(
    `${baseUrl}category/backstage/v1/category/findCategoryById`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
