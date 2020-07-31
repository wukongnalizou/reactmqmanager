import request from '@/utils/request';
import { baseUrl } from '@/utils/settings';
/**
 * 模块：商家活动
 * createDate:2019-06-19
 * author:Cin
 */
// 获取各个状态活动列表--LOGIC-SERVICE--backstage
export async function displayActivityBySeller(param) {
  return request(
    `${baseUrl}logic/activity/backstage/v1/displayActivityBySeller`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 获取商家详情--LOGIC-SERVICE--backstage
export async function findSellerActivityInfo(param) {
  return request(
    `${baseUrl}logic/activity/backstage/v1/findSellerActivityInfo`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
