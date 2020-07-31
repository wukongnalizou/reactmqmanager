import request from '@/utils/request';
import { baseUrl, seller } from '@/utils/settings';

export async function idGetBusiness(param) {
  return request(
    `${baseUrl}seller/backstage/v1/seller/findSellerId`,
    { method: 'post' },
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
// 冻结（解冻）店铺
export async function businessFreeze(param) {
  return request(
    `${baseUrl}seller/backstage/v1/seller/freezeSellerOrNoFreeze`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 解冻账户
export async function accountFreeze(param) {
  return request(
    `${baseUrl}seller/backstage/v1/sellerAccount/updateSellerAccountStatus`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
