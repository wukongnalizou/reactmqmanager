import moment from 'moment';
import { message } from 'antd';
import {
  findSellerComplainList, // 查询商家投诉列表
  applySellerComplain, // 更改商家投诉结果
  findUserComplainList, // 查询用户投诉列表
  applyUserComplain, // 更改用户投诉结果
} from './service';
import { setData } from '@/utils/localData';

export default {
  namespace: 'complain',
  state: {
    // 商家投诉列表
    sellerComplainList: [],
    // 用户投诉列表
    userComplainList: [],
    // 投诉用户总条数
    total: '',
    // 投诉商家总条数
    sellerTotal: '',
    // 投诉状态
    status: {
      0: '未处理',
      1: '审核取认',
      2: '审核失败',
    },
  },
  effects: {
    // 查询商家投诉列表
    *fetchFindSellerComplainList(param, { call, put, select }) {
      const status = yield select(state => state.complain.status);
      const sellerComplainList = yield call(findSellerComplainList, param);
      sellerComplainList.data.list.forEach(item => {
        item.key = item.id;
        item.complainTime = moment(item.createTime).format('YYYY-MM-DD hh:mm');
        item.statusShow = status[item.status];
        if (Object.keys(item.complainSellerInfo).length > 0) {
          item.complainUserName = item.complainSellerInfo.name;
        } else {
          item.complainUserName = '';
        }
      });
      if (sellerComplainList.success) {
        yield put({
          type: 'setSellerComplain',
          payload: {
            sellerComplainList: sellerComplainList.data.list,
            sellerTotal: sellerComplainList.data.total,
          },
        });
      }
    },
    // 更改商家投诉结果
    *fetchApplySellerComplain(param, { call, put, select }) {
      const sellerData = yield call(applySellerComplain, param);
      //   if (sellerData.success) {
      //   }
    },
    // 查询用户投诉列表
    *fetchFindUserComplainList(param, { call, put, select }) {
      const status = yield select(state => state.complain.status);
      const userComplainList = yield call(findUserComplainList, param);
      userComplainList.data.list.forEach(item => {
        item.key = item.id;
        item.complainTime = moment(item.createTime).format('YYYY-MM-DD hh:mm');
        item.statusShow = status[item.status];
      });
      if (userComplainList.success) {
        yield put({
          type: 'setUserComplain',
          payload: {
            userComplainList: userComplainList.data.list,
            total: userComplainList.data.total,
          },
        });
      }
    },
    // 更改用户投诉结果
    *fetchApplyUserComplain(param, { call, put, select }) {
      const userData = yield call(applyUserComplain, param);
    },
  },
  reducers: {
    // 设置用户投诉信息
    setUserComplain(state, { payload }) {
      return {
        ...state,
        userComplainList: payload.userComplainList,
        total: payload.total,
      };
    },
    // 设置商家投诉信息
    setSellerComplain(state, { payload }) {
      return {
        ...state,
        sellerComplainList: payload.sellerComplainList,
        sellerTotal: payload.sellerTotal,
      };
    },
  },
};
