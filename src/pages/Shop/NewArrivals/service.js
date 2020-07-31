import request from '@/utils/request';
import { baseUrl, seller } from '@/utils/settings';

export async function idGetBusiness(param) {
  return request(
    `${baseUrl}seller/backstage/v1/seller/findSellerId`,
    { method: 'post' }, 
    param.type,
  );
}
export async function getAtegory(param) {
  return request(
    `${baseUrl}category/backstage/v1/category/findGoodsCategoryAll`,
    { method: 'post' },
    param.type,
  );
}
export async function infoSuccess(param) {
  return request(
    `${baseUrl}seller/backstage/v1/seller/findSellerInfo`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 获取商家审核后详细信息
export async function detailsStore(param) {
  return request(
    `${baseUrl}seller/backstage/v1/seller/findSellerDetailInfo`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 商家入驻申请列表
export async function applyingGet(param) {
  return request(
    `${baseUrl}seller/backstage/v1/seller/findSellerApplyLogAll`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 已入驻商家列表
export async function appliedGet(param) {
  return request(
    `${baseUrl}seller/backstage/v1/seller/findSellerInfoList`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 获取商家审核对比详情
export async function DetailsBusiness(param) {
  return request(
    `${baseUrl}seller/backstage/v1/seller/findSellerApplyLogContrast`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 商家审核（驳回/通过）
export async function auditApply(param) {
  return request(
    `${baseUrl}seller/backstage/v1/seller/checkSellerApplyLog`,
    { method: 'post', data: param.payload },
    param.type,
  );
}