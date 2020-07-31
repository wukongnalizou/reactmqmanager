import request from '@/utils/request';
import { baseUrl } from '@/utils/settings';

// 查询活动商品订单--moonkingplan--后台
export async function findExchangeProductOrderList(param) {
  return request(
    `${baseUrl}moomkingplan/back/v1/moomkingplan/findExchangeProductOrderList`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 添加活动商品--moonkingplan--后台
export async function addActivitiesProduct(param) {
  return request(
    `${baseUrl}moomkingplan/back/v1/moomkingplan/addActivitiesProduct`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 查询活动商品列表
export async function findActivitiesProductList(param) {
  return request(
    `${baseUrl}moomkingplan/back/v1/moomkingplan/findActivitiesProductList`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 后台根据id查询活动商品
export async function findActivitiesProductById(param) {
  return request(
    `${baseUrl}moomkingplan/back/v1/moomkingplan/findActivitiesProductById`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 修改删除活动商品
export async function updateOrDeleteActivitiesProduct(param) {
  return request(
    `${baseUrl}moomkingplan/back/v1/moomkingplan/updateOrDeleteActivitiesProduct`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 根据订单id查询活动商品订单
export async function findExchangeProductOrderById(param) {
  return request(
    `${baseUrl}moomkingplan/back/v1/moomkingplan/findExchangeProductOrderById`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 修改活动商品订单
export async function updateExchangeProductOrderForBack(param) {
  return request(
    `${baseUrl}moomkingplan/back/v1/moomkingplan/updateExchangeProductOrderForBack`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 后台查询商品列表
export async function findProductListForBack(param) {
  return request(
    `${baseUrl}store/back/v1/product/findProductListForBack`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 后台添加商品(魔咕计划添加兑换券)
export async function addProduct(param) {
  return request(
    `${baseUrl}store/back/v1/product/addProduct`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 后台删除商品
export async function deleteProduct(param) {
  return request(
    `${baseUrl}store/back/v1/product/deleteProduct`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 后台修改商品(修改兑换券充值列表)
export async function updateProduct(param) {
  return request(
    `${baseUrl}store/back/v1/product/updateProduct`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 后台根据id查询商品
export async function findProductById(param) {
  return request(
    `${baseUrl}store/back/v1/product/findProductById`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
