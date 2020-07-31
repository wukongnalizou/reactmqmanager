import { message } from 'antd';
import {
  ServeListGet,
  submitServe,
  serveDelete,
  infoGetServe,
  submitServeEdit,
  listGetServeCate,
  submitServeCate,
  ServeCateDelete,
  infoGetserveCate,
  editServeCate,
} from './service';
// import router from 'umi/router';
// import { setData } from '@/utils/localData.js'

export default {
  namespace: 'serve',

  state: {
    data: {},
    code: true,
    deadline: 0,
    serveListData: [], // 类别管理数据（一级）
    total: 0, // 总条数
    ServeInfoData: {}, // 获取一个类别的详细信息，回填（类别管理）
    serveStatus: false, // 控制提交是否成功
    visible: false,
    categoryData: [], // 省市区
    ServeCateData: [], // 二级分类集合
    lastServeCateData: [], // 三级分类集合
    serveCateSubmitStatus: false, // 判断添加一个二级类是否成功
    serveCateInfoData: {}, // 一个二级类详情
  },

  effects: {
    // 获取类别管理列表
    *getServeList(param, { call, put }) {
      const data = yield call(ServeListGet, param);
      if (data.success) {
        yield put({
          type: 'getServeListRe',
          payload: data,
        });
      } else {
        message.warning(data.subMsg);
      }
    },
    // 添加一个类别（类别管理）
    *serveSubmit(param, { call, put }) {
      const data = yield call(submitServe, param);
      if (data.success) {
        yield put({
          type: 'serveSubmitRe',
          payload: true,
        });
      } else {
        message.warning(data.subMsg);
      }
    },
    // 删除一个类别（类别管理）
    *deleteServe(param, { call }) {
      const data = yield call(serveDelete, param);
      // eslint-disable-next-line no-empty
      if (data.success) {
      } else {
        message.warning(data.subMsg);
      }
    },
    // 获取一个类别的详细信息，回填（类别管理）
    *getServeInfo(param, { call, put }) {
      const data = yield call(infoGetServe, param);
      if (data.success) {
        yield put({
          type: 'getServeInfoRe',
          payload: data,
        });
      } else {
        console.log('获取一个类别的详细信息失败！');
      }
    },
    // 修改一个类别（类别管理）
    *serveEditSubmit(param, { call, put }) {
      const data = yield call(submitServeEdit, param);
      if (data.success) {
        yield put({
          type: 'serveSubmitRe',
          payload: true,
        });
      } else {
        message.warning(data.subMsg);
      }
    },
    /* *****************分类管理************************ */
    // 获取一组二级类
    *getServeCateList(param, { call, put }) {
      const data = yield call(listGetServeCate, param);
      if (data.success) {
        yield put({
          type: 'getServeCateListRe',
          payload: data,
        });
      } else {
        message.warning(data.subMsg);
      }
    },
    // 获取一组三级类
    *lastGetServeCateList(param, { call, put }) {
      const data = yield call(listGetServeCate, param);
      if (data.success) {
        yield put({
          type: 'lastGetServeCateListRe',
          payload: data,
        });
      } else {
        message.warning(data.subMsg);
      }
    },
    // 添加一个二级类
    *serveCateSubmit(param, { call, put }) {
      const data = yield call(submitServeCate, param);
      if (data.success) {
        yield put({
          type: 'serveCateSubmitRe',
          payload: true,
        });
      } else {
        message.warning(data.subMsg);
      }
    },
    // 删除一个二级类
    *deleteServeCate(param, { call, put }) {
      const data = yield call(ServeCateDelete, param);
      if (data.success) {
        yield put({
          type: 'serveCateSubmitRe',
          payload: true,
        });
      } else {
        message.warning(data.subMsg);
      }
    },
    // 获取一个二级类详情
    *getserveCateInfo(param, { call, put }) {
      const data = yield call(infoGetserveCate, param);
      if (data.success) {
        yield put({
          type: 'getserveCateInfoRe',
          payload: data,
        });
      } else {
        message.warning(data.subMsg);
      }
    },
    // 编辑一个二级类
    *serveCateEdit(param, { call, put }) {
      const data = yield call(editServeCate, param);
      if (data.success) {
        yield put({
          type: 'serveCateSubmitRe',
          payload: true,
        });
      } else {
        message.warning(data.subMsg);
      }
    },
  },

  reducers: {
    getServeListRe(state, { payload }) {
      payload.data.list.forEach(item => {
        item.key = item.id;
      });
      return {
        ...state,
        serveListData: payload.data.list,
        total: payload.data.total,
      };
    },
    serveSubmitRe(state, { payload }) {
      return {
        ...state,
        serveStatus: payload,
      };
    },
    getServeInfoRe(state, { payload }) {
      return {
        ...state,
        ServeInfoData: payload.data,
      };
    },
    getServeCateListRe(state, { payload }) {
      payload.data.forEach(item => {
        item.key = item.id;
      });
      console.log('payload', payload);
      return {
        ...state,
        ServeCateData: payload.data,
      };
    },
    lastGetServeCateListRe(state, { payload }) {
      payload.data.forEach(item => {
        item.key = item.id;
      });
      console.log('payload', payload);
      return {
        ...state,
        lastServeCateData: payload.data,
      };
    },
    serveCateSubmitRe(state, { payload }) {
      return {
        ...state,
        serveCateSubmitStatus: payload,
      };
    },
    getserveCateInfoRe(state, { payload }) {
      return {
        ...state,
        serveCateInfoData: payload.data,
      };
    },
  },
};
