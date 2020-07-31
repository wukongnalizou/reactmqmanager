import request from '@/utils/request';
import { baseUrl } from '@/utils/settings';

export async function queryNotices(param) {
  return request('/api/notices', { method: 'get', data: param.payload }, param.type);
}

export async function query(param) {
  return request(`${baseUrl}test/getData`, { method: 'post', data: param.payload }, param.type);
}

// 查询全部用户--user--平台api
export async function selUserAll(param) {
  return request(
    `${baseUrl}user/backend/v1/user/selUserAll`,
    { method: 'post', data: param.payload },
    param.type,
  );
}

// 锁定用户
export async function lockUser(param) {
  return request(
    `${baseUrl}user/backend/v1/user/lockUser`,
    { method: 'post', data: param.payload },
    param.type,
  );
}

// 解锁用户
export async function unlockUser(param) {
  return request(
    `${baseUrl}user/backend/v1/user/unlockUser`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
