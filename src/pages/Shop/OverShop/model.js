import { message } from 'antd';
import {
  applyingGet,
  auditApply,
  DetailsBusiness,
  getAtegory,
  infoSuccess,
  detailsStore,
  appliedGet,
  stChange,
  businessFreeze,
  accountFreeze,
} from './service';

export default {
  namespace: 'shop',

  state: {
    list: [],
    currentUser: {},
    userId: '',
    ApplyingData: [], // 入驻申请商户数据
    appliedData: [], // 已入住商户数据
    DetailsData: {}, // 待审核详情数据
    contrast: [], // 待审核对比数据
    ategoryData: [], // 获取经营范围数据
    successInfoData: {}, // 审核通过后的数据
    storeDetailsData: {}, // 店铺详细信息
    total: 0, // 入驻申请记录数据总量
    appliedTotal: 0, // 已入住商户数据总量
    serviceData: [], // 店铺服务数据
    businessTime: '', // 营业时间
    categoryNameStr: '', //
    freezeStatus: false, // 控制冻结（解冻）是否成功
    applyAuditStatus: false, // 控制审核是否通过
  },

  effects: {
    // 获取商家id和用户id
    // *getBusinessId(param, { call, put }) {
    //   const data = yield call(idGetBusiness, param);
    //   if (data.success) {
    //     yield put({
    //       type: 'getSellerId',
    //       payload: data,
    //     });
    //   } else {
    //     console.log('获取用户id和商家id失败')
    //   }
    // },
    // 获取入驻申请记录
    *getApplying(param, { call, put }) {
      const data = yield call(applyingGet, param);
      if (data.success) {
        yield put({
          type: 'getApply',
          payload: data.data,
        });
      } else {
        console.log('获取入驻申请记录失败');
      }
    },
    // 获取已入驻商户数据
    *getApplied(param, { call, put }) {
      const data = yield call(appliedGet, param);
      if (data.success) {
        yield put({
          type: 'getAppliedReducer',
          payload: data.data,
        });
      } else {
        console.log('获取已入驻商户数据失败');
        message.warning(data.subMsg);
      }
    },
    // 审核
    *applyAudit(param, { call, put }) {
      const data = yield call(auditApply, param);
      if (data.success) {
        yield put({
          type: 'applyAuditRe',
          payload: true,
        });
      } else {
        message.warning(data.subMsg);
      }
    },
    // 获取商家审核对比详情
    *businessDetails(param, { call, put }) {
      const data = yield call(DetailsBusiness, param);
      const value = data.data;
      yield put({
        type: 'DetailsData',
        payload: value,
      });
    },
    // 获取经营范围仅仅是用于页面显示！
    *ategory(param, { call, put }) {
      const data = yield call(getAtegory, param);
      const values = data.data;
      yield put({
        type: 'ategoryData',
        payload: values,
      });
    },
    // 获取审核通过后的商家详情
    *successInfo(param, { call, put }) {
      const data = yield call(infoSuccess, param);
      if (data.success) {
        const values = data.data;
        yield put({
          type: 'successInfoData',
          payload: values,
        });
      }
    },
    // 获取商家审核后详细信息
    *storeDetails(param, { call, put }) {
      const data = yield call(detailsStore, param);
      const values = data.data;
      if (data.success) {
        yield put({
          type: 'storeDetailsReducer',
          payload: values,
        });
      } else {
        console.log('获取店铺信息失败');
      }
    },
    // 三方开户成功后改变用户状态
    *changeSt(param, { call }) {
      const data = yield call(stChange, param);
      if (data.success) {
        console.log('状态改变成功');
      } else {
        console.log('获取三方开户成功后改变用户状态失败');
        message.warning(data.subMsg);
      }
    },
    // 冻结（解冻）店铺
    *freezeBusiness(param, { call, put }) {
      const data = yield call(businessFreeze, param);
      if (data.success) {
        console.log('冻结（解冻）商家成功');
        yield put({
          type: 'freezeStatusRe',
          payload: true,
        });
      } else {
        console.log('冻结（解冻）商家失败');
        message.warning(data.subMsg);
      }
    },
    // 解冻账户
    *freezeAccount(param, { call, put }) {
      const data = yield call(accountFreeze, param);
      if (data.success) {
        console.log('解冻账户成功');
        yield put({
          type: 'freezeStatusRe',
          payload: true,
        });
      } else {
        console.log('解冻账户失败');
        message.warning(data.subMsg);
      }
    },
  },

  reducers: {
    getSellerId(state, { payload }) {
      return {
        ...state,
        userId: payload.data.userId,
      };
    },
    getApply(state, { payload }) {
      return {
        ...state,
        ApplyingData: payload.list,
        total: payload.total,
      };
    },
    getAppliedReducer(state, { payload }) {
      return {
        ...state,
        appliedData: payload.list,
        total: payload.total,
      };
    },
    DetailsData(state, { payload }) {
      return {
        ...state,
        DetailsData: payload[0],
        contrast: payload,
      };
    },
    ategoryData(state, { payload }) {
      return {
        ...state,
        ategoryData: payload,
      };
    },
    successInfoData(state, { payload }) {
      return {
        ...state,
        successInfoData: payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    freezeStatusRe(state, { payload }) {
      return {
        ...state,
        freezeStatus: payload,
      };
    },
    storeDetailsReducer(state, { payload }) {
      let businessTimeStr = ''; // 营业时间
      let serverStr = ''; // 店铺服务
      let categoryNameStr = ''; // 店铺经营范围
      payload.sellerDetailInfo.sellerHourList.map(item => {
        businessTimeStr = `${item.sellerHourToString},${businessTimeStr}`;
      });
      payload.sellerDetailInfo.sellerServerList.map(item => {
        serverStr = `${item.name},${serverStr}`;
      });
      payload.categoryNameList.map(item => {
        categoryNameStr = `${item.name},${categoryNameStr}`;
      });
      return {
        ...state,
        storeDetailsData: payload,
        serverStr, // 店铺服务
        businessTime: businessTimeStr, // 营业时间
        categoryNameStr,
      };
    },
    applyAuditRe(state, { payload }) {
      return {
        ...state,
        applyAuditStatus: payload,
      };
    },
  },
};
