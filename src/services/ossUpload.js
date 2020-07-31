import request from '@/utils/request';
import { baseUrl } from '@/utils/settings';

export async function getOssToken(param) {
  return request(`${baseUrl}oss/app/v1/oss/getOssToken`, { method: 'get' }, param.type);
}

export async function getOssIds(param) {
  return request(
    `${baseUrl}oss/app/v1/ossFile/getOssIds`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 删除照片
export async function delOssByUrl(param) {
  return request(
    `${baseUrl}oss/app/v1/ossFile/deleteUrl`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 验证一组id
export async function applyOssId(param) {
  return request(
    `${baseUrl}oss/app/v1/ossFile/applyOssIds`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
