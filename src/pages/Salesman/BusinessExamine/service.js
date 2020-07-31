import request from '@/utils/request';
import { baseUrl } from '@/utils/settings';

export async function fetchlist(param) {
  return request(
    '/auxiliary/datacenter/backstage/v1/gather/findTerraceScaleList',
    { method: 'post', data: param.payload },
    param.type,
  );
}

export async function exmaine(param) {
  return request(
    '/auxiliary/datacenter/backstage/v1/gather/checkTerraceScale',
    { method: 'post', data: param.payload },
    param.type,
  );
}

