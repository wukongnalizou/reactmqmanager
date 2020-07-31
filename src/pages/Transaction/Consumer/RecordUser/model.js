import {
  findWithdrawDepositOrderList, // 提现订单列表
  findWithdrawDepositOrderById, // 查询订单详情
  findVirtualCurrencyAccountData, // 账户余额信息
  withdrawalAudit, // 后台审核
} from './service';
/**
 * 用户兑换审核
 * createDate:2019-06-05
 * author:Cin
 */
export default {
  namespace: 'changeApply',
  state: {
    // 待审核订单列表
    doingRecordList: [],
    // 已完成订单列表
    doneRecordList: [],
    // 订单详情
    listDetail: {},
    // 账户资产信息
    accountDetail: {},
    // 搜索兑换记录结果
    searchResult: [],
  },
  effects: {
    // 提现订单列表(未审核)
    *fetchFindWithdrawDepositOrderList(param, { call, put }) {
      const listData = yield call(findWithdrawDepositOrderList, param);
      if (listData.success) {
        yield put({
          type: 'setDoingRecordList',
          payload: {
            doingRecordList: listData.data.list,
          },
        });
      }
    },
    // 查询订单详情
    *fetchFindWithdrawDepositOrderById(param, { call, put }) {
      const detailData = yield call(findWithdrawDepositOrderById, param);
      param.payload.id = detailData.data.userId;
      const accountData = yield call(findVirtualCurrencyAccountData, param);
      accountData.data.totalPre = (
        parseInt(accountData.data.balance) + parseInt(detailData.data.currencyConsumedNum)
      ).toString();
      if (detailData.success) {
        yield put({
          type: 'setListDetail',
          payload: {
            listDetail: detailData.data,
          },
        });
      }
      if (accountData.success) {
        yield put({
          type: 'setAccountDetail',
          payload: {
            accountDetail: accountData.data,
          },
        });
      }
    },
    // 后台审核
    *fetchWithdrawalAudit(param, { call, put }) {
      const withdrawalData = yield call(withdrawalAudit, param);
    },
  },
  reducers: {
    /**
     * 设置待审核订单列表
     */
    setDoingRecordList(state, { payload }) {
      console.log('payload', payload);
      return {
        ...state,
        doingRecordList: payload.doingRecordList,
      };
    },
    /**
     * 设置订单详情
     */
    setListDetail(state, { payload }) {
      return {
        ...state,
        listDetail: payload.listDetail,
      };
    },
    /**
     * 设置用户资产信息
     */
    setAccountDetail(state, { payload }) {
      return {
        ...state,
        accountDetail: payload.accountDetail,
      };
    },
    /**
     * 设置搜索兑换记录
     */
    setSearchResult(state, { payload }) {
      return {
        ...state,
        searchResult: payload.searchResult,
      };
    },
  },
};
