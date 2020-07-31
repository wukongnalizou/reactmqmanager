import router from 'umi/router';
import { message } from 'antd';
import moment from 'moment';
import { setData } from '@/utils/localData';
import {
  selUserAll, // 查询全部用户
  lockUser, // 锁定用户
  unlockUser, // 解锁用户
} from './service';
/**
 * 用户中心
 * author: Cin
 */
export default {
  namespace: 'userBack',
  state: {
    userList: [], // 用户列表
    total: 0, // 用户总量
  },
  effects: {
    // 获取全部用户
    *fetchSelUserAll(param, { call, put, select }) {
      const userListData = yield call(selUserAll, param);
      if (userListData.success) {
        userListData.data.list.forEach(e => {
          e.key = e.key;
          if (e.sex) e.sexShow = e.sex === 1 ? '男' : '女';
          if (e.birthday) e.birthdayShow = moment(e.birthday).format('YYYY-MM-DD');
        });
        yield put({
          type: 'setUser',
          payload: {
            userList: userListData.data.list,
            total: userListData.data.total,
          },
        });
      }
    },
    // 锁定用户
    *fetchLockUser(param, { call, put, select }) {
      const data = yield call(lockUser, param);
      if (data.success) {
        if (data.data.count !== 1) {
          message.warning('锁定用户失败');
        }
      }
    },
    // 解锁用户
    *fetchUnlockUser(param, { call, put, select }) {
      const data = yield call(unlockUser, param);
      if (data.success) {
        if (data.data.count !== 1) {
          message.warning('解锁用户失败');
        }
      }
    },
  },
  reducers: {
    // 设置用户列表
    setUser(state, { payload }) {
      return {
        ...state,
        userList: payload.userList,
        total: payload.total,
      };
    },
  },
};
