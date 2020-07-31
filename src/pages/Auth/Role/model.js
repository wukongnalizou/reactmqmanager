import {
  fetchRoleAll, // 查询全部角色
  fetchAuthAll, //查询全部权限
  addRole, //增加角色
  updateRole, //修改角色
  enabledRole, //起停用角色
  deleteRole, //删除角色
} from './service';

export default {
  namespace: 'authRole',
  state: {
    roleList: [], // 角色列表
    hasNextPage: true,
    authList: [],
    total: 0, // 用户总量
  },
  effects: {
    // 获取全部角色
    *fetchRoleAll(param, { call, put, select }) {
      const res = yield call(fetchRoleAll, param);
      if (res.success) {
        yield put({
          type: 'roleAll',
          payload: {
            roleList: res.data.list,
            hasNextPage: res.data.hasNextPage,
          },
        });
      }
    },
    //全部权限
    *fetchAuthAll(param, { call, put, select }) {
      const res = yield call(fetchAuthAll, param);
      if (res.success) {
        yield put({
          type: 'authAll',
          payload: {
            authList: res.data,
          },
        });
      }
    },
    //增加角色
    *addRole(param, { call, put }) {
      const res = yield call(addRole, param);
      // if (res.success) {
      //   console.log(res)
      // }
      if (param.callback) {
        const { callback } = param;
        callback(res);
      }
    },
    //修改角色
    *updateRole(param, { call, put, select }) {
      const res = yield call(updateRole, param);
      if (param.callback) {
        const { callback } = param;
        callback(res);
      }
    },
    //起停用角色
    *enabledRole(param, { call, put, select }) {
      const res = yield call(enabledRole, param);
      if (param.callback) {
        const { callback } = param;
        callback(res);
      }
    },
    *deleteRole(param, { call, put, select }) {
      const res = yield call(deleteRole, param);
      if (param.callback) {
        const { callback } = param;
        callback(res);
      }
    },
  },
  reducers: {
    roleAll(state, { payload }) {
      return {
        ...state,
        roleList: payload.roleList,
        hasNextPage: payload.hasNextPage,
      };
    },
    authAll(state, { payload }) {
      return {
        ...state,
        authList: payload.authList,
      };
    },
  },
};
