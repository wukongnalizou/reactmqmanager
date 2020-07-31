import router from 'umi/router';
import { setData } from '@/utils/localData';
import { message } from 'antd';
import {
  enterLogin,
  codeSubmit,
  codeRegister,
  submitLoginPhone,
  registerLogin,
  idGetBusiness,
} from './service';

export default {
  namespace: 'login',

  state: {
    data: {},
    code: true,
    deadline: 0,
  },

  effects: {
    *loginEnter(param, { call, put, select }) {
      const data = yield call(enterLogin, param);
      if (data.success === true) {
        setData('access_token', data.data.access_token); // access_token缓存到本地
        setData('refresh_token', data.data.refresh_token); // refresh_token缓存到本地
        router.push('/schedule');
      } else if (data.success === false) {
        message.warning(data.subMsg);
      }
      yield put({
        type: 'saveLogin',
        payload: data,
      });
    },
    // 登录获取验证码
    *submitCode(param, { call, put, select }) {
      const data = yield call(codeSubmit, param);
      if (data.success === true) {
        message.success('成功发送验证码');
        yield put({
          type: 'subReCode',
          payload: {
            code: false,
            deadline: Date.now() + 1000 * 61,
          },
        });
      } else if (data.success === false) {
        message.warning(data.subMsg);
      }
    },
    // 注册获取验证码
    *registerCode(param, { call, put }) {
      const data = yield call(codeRegister, param);
      if (data.success === true) {
        message.success('成功发送验证码');
        yield put({
          type: 'subReCode',
          payload: {
            code: false,
            deadline: Date.now() + 1000 * 61,
          },
        });
      } else if (data.success === false) {
        message.warning(data.subMsg);
      }
    },
    // 手机验证码登录
    *loginPhoneSubmit(param, { call }) {
      const data = yield call(submitLoginPhone, param);
      if (data.success === true) {
        message.success('登录成功');
        setData('access_token', data.data.access_token); // access_token缓存到本地
        setData('refresh_token', data.data.refresh_token); // refresh_token缓存到本地
        router.push('/schedule');
      } else if (data.success === false) {
        message.warning(data.subMsg);
      }
    },
    // 注册
    *loginRegister(param, { call }) {
      const data = yield call(registerLogin, param);
      if (data.success === true) {
        message.success('注册成功');
        setData('access_token', data.data.access_token); // access_token缓存到本地
        setData('refresh_token', data.data.refresh_token); // refresh_token缓存到本地
        router.push('/schedule');
      } else if (data.success === false) {
        message.warning(data.subMsg);
      }
    },
    // 获取商家id用户id
    // *c(param, { call, put }) {
    //   const infoData = yield call(idGetBusiness, param);
    //   console.log('infoData',infoData)
    //   if (infoData.success) {
    //     setData('sellerId', infoData.data.sellerId);
    //     setData('userId', infoData.data.userId);
    //   }
    // }
  },

  reducers: {
    saveLogin(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
    subReCode(state, { payload }) {
      return {
        ...state,
        code: payload.code,
        deadline: payload.deadline,
      };
    },
  },

  // subscriptions: {
  //   setup({ history }) {
  //     // Subscribe history(url) change, trigger `load` action if pathname is `/`
  //     return history.listen(({ pathname, search }) => {
  //       if (typeof window.ga !== 'undefined') {
  //         window.ga('send', 'pageview', pathname + search);
  //       }
  //     });
  //   },
  // },
};
