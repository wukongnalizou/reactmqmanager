import { message } from 'antd';
import {
  CirclesListGet,
  submitCircles,
  editEetCircles,
  submitEditCircles,
  circlesDelete,
} from './service';

export default {
  namespace: 'configuration',

  state: {
    data: {},
    code: true,
    deadline: 0,
    circlesListData: [], // 商圈管理列表数据
    total: 0, // 总条数
    // UploadListValue:[],
    circlesStatus: false,
    visible: false,
    CirclesEditData: {}, // 获取单个商圈信息，回填
    categoryData: [], // 省市区
  },

  effects: {
    // 获取商圈管理列表
    *getCirclesList(param, { call, put }) {
      const data = yield call(CirclesListGet, param);
      console.log('商圈管理列表', data);
      if (data.success) {
        yield put({
          type: 'getCirclesListRe',
          payload: data,
        });
      } else if (data.subCode !== '401') {
        message.warning(data.subMsg);
      }
    },
    *circlesSubmit(param, { call, put }) {
      const data = yield call(submitCircles, param);
      console.log('商圈添加', data);
      if (data.success) {
        yield put({
          type: 'circlesSubmitRe',
          payload: true,
        });
      } else if (data.subCode !== '401') {
        message.warning(data.subMsg);
      }
    },
    *circlesEditSubmit(param, { call, put }) {
      const data = yield call(submitEditCircles, param);
      if (data.success) {
        yield put({
          type: 'circlesSubmitRe',
          payload: true,
        });
      } else if (data.subCode !== '401') {
        message.warning(data.subMsg);
      }
    },
    // 删除商圈
    *deleteCircles(param, { call, put }) {
      const data = yield call(circlesDelete, param);
      if (data.success) {
      } else if (data.subCode !== '401') {
        message.warning(data.subMsg);
      }
    },
    // 获取单个商圈信息，回填
    *getCirclesEdit(param, { call, put }) {
      const data = yield call(editEetCircles, param);
      console.log('获取回填数据', data);
      if (data.success) {
        yield put({
          type: 'getCirclesEditRe',
          payload: data,
        });
      } else if (data.subCode !== '401') {
        message.warning(data.subMsg);
      }
    },
  },

  reducers: {
    getCirclesListRe(state, { payload }) {
      return {
        ...state,
        circlesListData: payload.data.list,
        total: payload.data.total,
      };
    },
    circlesSubmitRe(state, { payload }) {
      return {
        ...state,
        circlesStatus: payload,
      };
    },
    changeVisible(state, { payload }) {
      return {
        ...state,
        visible: payload,
      };
    },
    getCirclesEditRe(state, { payload }) {
      return {
        ...state,
        CirclesEditData: payload.data,
      };
    },
    categoryDataRe(state, { payload }) {
      return {
        ...state,
        categoryData: payload,
      };
    },
  },
};
