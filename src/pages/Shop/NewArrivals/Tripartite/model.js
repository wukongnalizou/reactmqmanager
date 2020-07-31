import router from 'umi/router';
import { message } from 'antd';
import {
  personalSubmit,
  safeCodeRequest,
  businessSubmit,
  openSelfSubmit,
  safeCodeRequestSelf,
  stChange,
  accountInfoSeller,
  getBankCard,
  businessSearch,
  inforBind,
  detailedAccount,
  listUploadFiles,
  selfFilesDelete,
  uploadReview,
} from './service';
export default {
  namespace: 'tripartite',

  state: {
    checkValue: false,
    cmdId: '',
    merCustId: '',
    version: '',
    accountSt: false, // 控制是否提交改变商家状态的请求
    searchBusiDate: {}, // 已有企业数据
    accountDetDate: null, // 企业数据,回填
    searchDisabled: false, // 控制输入框是否可输入
    submitDisabled: false, // 控制提交和绑定按钮切换
    selfSellerIdData: [],
    reviewUploadStatus: false, // 控制文件是够上传成功
    accountDetStatus: '', // 判断是新增还是修改
  },

  effects: {
    // 开个人户
    *submitPersonal(param, { call }) {
      // 请求参数加签
      const safeCodeData = yield call(safeCodeRequest, param);
      if (safeCodeData.success === true) {
        // 开个人户
        param.payload = safeCodeData.data;
        const data = yield call(personalSubmit, param);
        if (data.success) {
          message.success('开户成功');
          // 将商户信息状态改成2（三方审核中）
          // yield put({
          //     type: 'accountStatus',
          //     payload: true,
          //   });
          router.push('/');
        } else if (data.subCode !== '401') {
          console.log('个人用户开户失败');
          message.warning('填写信息有误，请仔细核实')
        }
      } else if (data.subCode !== '401') {
        console.log('请求参数加签失败');
        message.warning(data.subMsg);
      }
    },

    // 商家用户开户
    *submitBusiness(param, { call, put }) {
      // 请求参数加签
      const safeCodeData = yield call(safeCodeRequest, param);
      if (safeCodeData.success) {
        // 商户开户
        param.payload = safeCodeData.data;
        const data = yield call(businessSubmit, param);
        if (data.success) {
          message.success('开户成功');
          // 将商户信息状态改成2（三方审核中）
          yield put({
            type: 'BusinessSuccess',
            payload: data.data,
          });
        } else if (data.subCode !== '401') {
          console.log('商户开户失败');
          message.warning(data.subMsg);
        }
      } else {
        console.log('请求参数加签失败');
      }
    },
    // 个体户开户
    *submitOpenSelf(param, { call, put }) {
      // 请求参数加签
      const safeCodeDataSelf = yield call(safeCodeRequestSelf, param);
      if (safeCodeDataSelf.success) {
        // 个体户开户
        param.payload = safeCodeDataSelf.data;
        const data = yield call(openSelfSubmit, param);
        if (data.success === true) {
          message.success('开户成功');
          yield put({
            type: 'accountStatus',
            payload: true,
          });
          router.push('/');
        } else {
          console.log('商户开户失败');
        }
      } else {
        console.log('请求参数加签失败');
      }
    },
    // 三方开户成功后改变用户状态
    *changeSt(param, { call }) {
      const data = yield call(stChange, param);
      if (data.success) {
        // 跳转到审核页面
        router.push('/shop/newArrivals');
      } else if (data.subCode !== '401') {
        console.log('获取三方开户成功后改变用户状态失败');
        message.warning(data.subMsg);
      }
    },
    // 获取企业信息，回填
    *accountDetailed(param, { call, put }) {
      const data = yield call(detailedAccount, param);
      console.log('企业信息', data);
      if (data.success) {
        yield put({
          type: 'accountDetailedRe',
          payload: data,
        });
      } else if (data.subCode !== '401') {
        console.log('获取企业信息失败');
        message.warning(data.subMsg);
      }
    },
    // 搜索已有企业账户
    *searchBusiness(param, { call, put }) {
      const data = yield call(businessSearch, param);
      console.log('搜索已有企业账户数据', data);
      if (data.success) {
        yield put({
          type: 'searchBusinessRe',
          payload: data,
        });
        yield put({
          type: 'searchDisabledRe',
          payload: true,
        });
      } else if (data.subCode !== '401') {
        console.log('搜索已有企业账户失败');
        yield put({
          type: 'searchDisabledRe',
          payload: false,
        });
        message.warning(data.subMsg);
      }
    },
    // 直接绑定已有企业账户
    *bindInfor(param, { call, put }) {
      console.log('param', param);
      const data = yield call(inforBind, param);
      if (data.success) {
        router.push('/');
      } else if (data.subCode !== '401') {
        console.log('直接绑定已有企业账户失败');
        message.warning(data.subMsg);
      }
    },
    // 获取已上传文件列表
    *uploadFilesList(param, { call, put }) {
      const data = yield call(listUploadFiles, param);
      if (data.success) {
        yield put({
          type: 'selfSellerIdRe',
          payload: data,
        });
      } else if (data.subCode !== '401') {
        message.warning(data.subMsg);
      }
    },
    // 个体商户删除文件
    *deleteSelfFiles(param, { call }) {
      const data = yield call(selfFilesDelete, param);
      if (data.success) {
      } else if (data.subCode !== '401') {
        message.warning(data.subMsg);
      }
    },
    // 个体商户上传文件
    *reviewUpload(param, { call, put }) {
      const data = yield call(uploadReview, param);
      if (data.success) {
        yield put({
          type: 'reviewUploadRe',
          payload: true,
        });
      } else if (data.subCode !== '401') {
        message.warning('提交失败，原因：' + data.subMsg);
      }
    },
  },

  reducers: {
    BusinessSuccess(state, { payload }) {
      return {
        ...state,
        checkValue: payload.checkValue,
        cmdId: payload.cmdId,
        merCustId: payload.merCustId,
        version: payload.version,
      };
    },
    accountStatus(state, { payload }) {
      return {
        ...state,
        accountSt: payload,
      };
    },
    // 企业账户,回填
    accountDetailedRe(state, { payload }) {
      return {
        ...state,
        accountDetDate: payload.data,
        accountDetStatus: payload.data.auditStatus,
      };
    },
    // 搜索已有企业账户
    searchBusinessRe(state, { payload }) {
      return {
        ...state,
        searchBusiDate: payload.data,
        searchDisabled: true,
      };
    },
    // 输入框是否可填写
    searchDisabledRe(state, { payload }) {
      return {
        ...state,
        searchDisabled: payload,
        submitDisabled: payload,
      };
    },
    selfSellerIdRe(state, { payload }) {
      return {
        ...state,
        selfSellerIdData: payload.data,
        selfSellerIdData: payload.data,
      };
    },
    reviewUploadRe(state, { payload }) {
      return {
        ...state,
        reviewUploadStatus: payload,
      };
    },
  },
};
