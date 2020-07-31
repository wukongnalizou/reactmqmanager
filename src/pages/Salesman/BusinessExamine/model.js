import {
  fetchlist,
  exmaine,
} from './service';

export default {
  namespace: 'businessExamine',
  state: {
    examineList: [],
    hasNextPage: true,
    total: 0, // 用户总量
  },
  effects: {
    // 获取全部审核
    *fetchlist(param, { call, put, select }) {
      const res = yield call(fetchlist, param);
      if (res.success) {
        yield put({
          type: 'listAll',
          payload: {
            examineList: res.data.list,
            hasNextPage: res.data.hasNextPage,
          },
        });
      }
    },
    *exmaine(param, { call, put, select }) {
      const res = yield call(exmaine, param);
      if (param.callback) {
        const { callback } = param;
        callback(res);
      }
    },
  },
  reducers: {
    listAll(state, { payload }) {
      return {
        ...state,
        examineList: payload.examineList,
        hasNextPage: payload.hasNextPage,
      };
    },
  }
};
