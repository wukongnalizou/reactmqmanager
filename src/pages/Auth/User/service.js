import request from '@/utils/request';
import { baseUrl } from '@/utils/settings';

export async function fetchRoleAll(param) {
  return request(
    '/business/backstage/v1/role/selectAllRole',
    { method: 'post', data: param.payload },
    param.type,
  );
}

export async function fetchUserAll(param) {
  return request(
    '/business/backstage/v1/user/selectUserList',
    { method: 'post', data: param.payload },
    param.type,
  );
}

export async function addUser(param) {
  return request(
    '/business/backstage/v1/user/insertUserInfo',
    { method: 'post', data: param.payload },
    param.type,
  );
}

export async function updateUser(param) {
  return request(
    '/business/backstage/v1/user/updateUserInfo',
    { method: 'post', data: param.payload },
    param.type,
  );
}

export async function enableUser(param) {
  return request(
    '/business/backstage/v1/user/enableUser',
    { method: 'post', data: param.payload },
    param.type,
  );
}

export async function deleteUser(param) {
  return request(
    '/business/backstage/v1/user/deleteUser',
    { method: 'post', data: param.payload },
    param.type,
  );
}
