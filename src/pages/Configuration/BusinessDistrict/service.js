import request from '@/utils/request';
import { baseUrl } from '@/utils/settings';

// 获取商圈管理列表
export async function CirclesListGet(param) {
  return request(
    `${baseUrl}seller/backstage/v1/sellerCircles/findSellerCirclesList`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 添加一个商圈
export async function submitCircles(param) {
  return request(
    `${baseUrl}seller/backstage/v1/sellerCircles/addSellerCircles`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 获取单个商圈信息，回填
export async function editEetCircles(param) {
  return request(
    `${baseUrl}seller/backstage/v1/sellerCircles/findSellerCirclesById`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 修改一个商圈
export async function submitEditCircles(param) {
  return request(
    `${baseUrl}seller/backstage/v1/sellerCircles/updateSellerCircles`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 删除一个商圈
export async function circlesDelete(param) {
  return request(
    `${baseUrl}seller/backstage/v1/sellerCircles/deleteSellerCircles`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
