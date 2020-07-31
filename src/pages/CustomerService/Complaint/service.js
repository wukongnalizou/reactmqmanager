import request from '@/utils/request';
import { baseUrl } from '@/utils/settings';

// 查询商家投诉列表
export async function findSellerComplainList(param) {
  return request(
    `${baseUrl}evaluate/back/v1/complain/findSellerComplainList`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 更改商家投诉结果
export async function applySellerComplain(param) {
  return request(
    `${baseUrl}evaluate/back/v1/complain/applySellerComplain`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 查询用户投诉列表
export async function findUserComplainList(param) {
  return request(
    `${baseUrl}evaluate/back/v1/complain/findUserComplainList`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 更改用户投诉结果
export async function applyUserComplain(param) {
  return request(
    `${baseUrl}evaluate/back/v1/complain/applyUserComplain`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
