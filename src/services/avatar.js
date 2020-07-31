import request from '@/utils/request';
import { baseUrl } from '@/utils/settings';

// 添加头像框--userinfo--管理端api
export async function addPhotoFrame(param) {
  return request(
    `${baseUrl}userinfo/backend/v1/photoFrame/addPhotoFrame`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 查询全部头像框--userinfo--管理端api
export async function findAllPhotoFrame(param) {
  return request(
    `${baseUrl}userinfo/backend/v1/photoFrame/findAllPhotoFrame`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 修改头像框
export async function updatePhotoFrame(param) {
  return request(
    `${baseUrl}userinfo/backend/v1/photoFrame/updatePhotoFrame`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
