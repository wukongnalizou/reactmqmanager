import request from '@/utils/request';
import { baseUrl } from '@/utils/settings';
/**
 * 用户兑换审核
 * createDate:2019-06-05
 * author:Cin
 */

// 后台提现订单列表--store--后台提现
export async function findWithdrawDepositOrderList(param) {
  return request(
    `${baseUrl}store/back/v1/withdrawDepositOrder/findWithdrawDepositOrderList`,
    { method: 'post', data: param.payload },
    param.type,
  );
}

// 根据体现订单id查询提现订单详情--store--后台提现
export async function findWithdrawDepositOrderById(param) {
  return request(
    `${baseUrl}store/back/v1/withdrawDepositOrder/findWithdrawDepositOrderById`,
    { method: 'post', data: param.payload },
    param.type,
  );
}

// 后台查询虚拟货币账户余额，提现总数，体现总消耗的虚拟币--store--后台提现
export async function findVirtualCurrencyAccountData(param) {
  return request(
    `${baseUrl}store/back/v1/withdrawDepositOrder/findVirtualCurrencyAccountData`,
    { method: 'post', data: param.payload },
    param.type,
  );
}

// 后台提现审核
export async function withdrawalAudit(param) {
  return request(
    `${baseUrl}store/back/v1/withdrawDepositOrder/withdrawalAudit`,
    { method: 'post', data: param.payload },
    param.type,
  );
}

// export async function query(param) {
//   return request(baseUrl + 'test/getData',{ method:'post', data: param.payload }, param.type);
// }

export async function queryNotices(param) {
  return request('/api/notices', { method: 'get', data: param.payload }, param.type);
}
