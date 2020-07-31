import {
  fetchUserAll, //查询全部权限
  fetchRoleAll, // 查询全部角色
  addUser, //增加用户
  updateUser, //修改用户
  enableUser, //起停用用户
  deleteUser, //删除用户
} from './service';

export default {
  namespace: 'authUser',
  state: {
    userList: [], // 用户列表
    hasNextPage: true,
    roleList: [], // 角色列表
    total: 0, // 用户总量
  },
  effects: {
    // 获取全部用户
    *fetchUserAll(param, { call, put, select }) {
      const res = yield call(fetchUserAll, param);
      if (res.success) {
        yield put({
          type: 'userAll',
          payload: {
            userList: res.data.list,
            hasNextPage: res.data.hasNextPage,
          },
        });
      }
    },
    //获取全部角色
    *fetchRoleAll(param, { call, put, select }) {
      const res = yield call(fetchRoleAll, param);
      if (res.success) {
        yield put({
          type: 'roleAll',
          payload: {
            roleList: res.data,
          },
        });
      }
    },
    //增加用户
    *addUser(param, { call, put }) {
      const res = yield call(addUser, param);
      if (param.callback) {
        const { callback } = param;
        callback(res);
      }
    },
    //修改用户
    *updateUser(param, { call, put, select }) {
      const res = yield call(updateUser, param);
      if (param.callback) {
        const { callback } = param;
        callback(res);
      }
    },
    //起停用用户
    *enableUser(param, { call, put, select }) {
      const res = yield call(enableUser, param);
      if (param.callback) {
        const { callback } = param;
        callback(res);
      }
    },
    *deleteUser(param, { call, put, select }) {
      const res = yield call(deleteUser, param);
      if (param.callback) {
        const { callback } = param;
        callback(res);
      }
    },
  },
  reducers: {
    userAll(state, { payload }) {
      return {
        ...state,
        userList: payload.userList,
        hasNextPage: payload.hasNextPage,
      };
    },
    roleAll(state, { payload }) {
      return {
        ...state,
        roleList: payload.roleList,
      };
    },
  },
};
