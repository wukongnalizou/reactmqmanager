import request from '@/utils/request';
import { baseUrl, seller } from '@/utils/settings';

// 参数加签
export async function safeCodeRequest(param) {
  return request(
    `${baseUrl}pay/core/v1/app/security/sign`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 个体户开户参数加签
export async function safeCodeRequestSelf(param) {
  return request(
    `${baseUrl}pay/core/v1/app/security/sign`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 个人开户提交
export async function personalSubmit(param) {
  return request(
    `${baseUrl}pay/core/v1/app/account/openSellerUserAccount`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 商户开户提交
export async function businessSubmit(param) {
  return request(
    `${baseUrl}pay/core/v1/app/account/openSellerAccount`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 个体户开户提交
export async function openSelfSubmit(param) {
  return request(
    `${baseUrl}pay/core/v1/app/account/openIndividualAccount`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 三方开户成功后改变用户状态
export async function stChange(param) {
  return request(
    `${baseUrl}seller/backstage/v1/seller/updateApplyStatusPayIng`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 获取商户账户信息
export async function accountInfoSeller(param) {
  return request(
    `${baseUrl}pay/core/v1/app/account/getSellerAccountInfo`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 绑定银行卡
export async function getBankCard(param) {
  return request(
    `${baseUrl}pay/core/v1/app/account/bindingBankCard`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 搜索已有企业账户 正式接口
export async function businessSearch(param) {
  return request(
    `${baseUrl}pay/core/v1/app/account/searchSellerAccount`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 搜索已有企业账户 临时接口
// export async function businessSearch(param) {
//   return request('/api/account',{ method:'get', data: param.payload}, param.type);
// }
// 搜索已有企业账户 临时接口
export async function inforBind(param) {
  return request(
    `${baseUrl}seller/backstage/v1/sellerAccount/addSellerAccountInfo`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 获取企业信息，回填
export async function detailedAccount(param) {
  return request(
    `${baseUrl}pay/core/v1/app/account/findSellerAccountDetailed`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 获取已上传文件列表
export async function listUploadFiles(param) {
  return request(
    `${baseUrl}pay/core/v1/api/upload/findFileUploadBySellerId`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 个体商户删除文件
export async function selfFilesDelete(param) {
  return request(
    `${baseUrl}pay/core/v1/api/upload/deleteFile`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 个体商户上传文件
export async function uploadReview(param) {
  return request(
    `${baseUrl}pay/core/v1/api/upload/fileUpload`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
