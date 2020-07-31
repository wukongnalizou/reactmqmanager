import { message } from 'antd';
import {
  applyingGet,
  auditApply,
  DetailsBusiness,
  getAtegory,
} from './service';

export default {
  namespace: 'newArrivals',

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
  },

  reducers: {
    getApply(state, { payload }) {
      return {
        ...state,
        ApplyingData: payload.list,
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
    applyAuditRe(state, { payload }) {
      return {
        ...state,
        applyAuditStatus: payload,
      };
    },
  },
};
