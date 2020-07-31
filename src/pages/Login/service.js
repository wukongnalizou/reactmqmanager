import request from '@/utils/request';
import { baseUrl } from '@/utils/settings';

export async function enterLogin(param) {
  return request(
    `${baseUrl}business/backstage/v1/user/loginByUsernameAndPassword`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
export async function codeSubmit(param) {
  return request(
    `${baseUrl}sms/app/v1/sellerSms/sendLoginSms`,
    { method: 'post', data: { telNumber: param.payload } },
    param.type,
  );
}

export async function codeRegister(param) {
  return request(
    `${baseUrl}sms/app/v1/sellerSms/register`,
    { method: 'post', data: { telNumber: param.payload } },
    param.type,
  );
}

export async function submitLoginPhone(param) {
  return request(
    `${baseUrl}business/backstage/v1/user/loginByTelNumber`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
export async function registerLogin(param) {
  return request(
    `${baseUrl}business/backstage/v1/user/registerForeEnd`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 获取商家id和用户id
export async function idGetBusiness(param) {
  return request(
    `${baseUrl}seller/backstage/v1/seller/findSellerId`,
    { method: 'post' },
    param.type,
  );
}
