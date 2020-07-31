import { message } from 'antd';
import {
  detailsStore,
} from './service';

export default {
  namespace: 'information',

  state: {
    storeDetailsData: {}, // 店铺详细信息
    businessTime: '', // 营业时间
    categoryNameStr: '', //
  },

  effects: {
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
  },

  reducers: {
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
  },
};
