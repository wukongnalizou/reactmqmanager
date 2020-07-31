import request from '@/utils/request';
import { baseUrl } from '@/utils/settings';

export async function fetchRoleAll(param) {
  return request(
    '/business/backstage/v1/role/selectRoleList',
    { method: 'post', data: param.payload },
    param.type,
  );
}

export async function fetchAuthAll(param) {
  return request(
    '/business/backstage/v1/authority/selectAllAuthority',
    { method: 'post', data: param.payload },
    param.type,
  );
}

export async function addRole(param) {
  return request(
    '/business/backstage/v1/role/insertRole',
    { method: 'post', data: param.payload },
    param.type,
  );
}

export async function updateRole(param) {
  return request(
    '/business/backstage/v1/role/updateRole',
    { method: 'post', data: param.payload },
    param.type,
  );
}

export async function enabledRole(param) {
  return request(
    '/business/backstage/v1/role/enabledRole',
    { method: 'post', data: param.payload },
    param.type,
  );
}

export async function deleteRole(param) {
  return request(
    '/business/backstage/v1/role/deleteRole',
    { method: 'post', data: param.payload },
    param.type,
  );
}
