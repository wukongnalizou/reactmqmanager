import { message } from 'antd';
import router from 'umi/router';
import {
  addPhotoFrame, // 添加头像框
  findAllPhotoFrame, // 查询全部头像框
  updatePhotoFrame, // 修改头像框
} from '@/services/avatar';
import { setData } from '@/utils/localData';

export default {
  namespace: 'avatar',

  state: {
    // 静态图片地址
    staticUrl: '',
    // 动态图片地址
    movingUrl: '',
    // 头像框列表
    avatarList: [],
    // 数据总条数
    total: 0,
    listImg: '', // 列表图片地址
    detailImg: '', // 详情图片地址
    enLargeImg: '', // 放大图片地址
  },

  effects: {
    // 添加头像框
    *fetchAddPhotoFrame(param, { call, put, select }) {
      const addData = yield call(addPhotoFrame, param);
    },
    // 查询全部头像框
    *fetchFindAllPhotoFrame(param, { call, put, select }) {
      const frameList = yield call(findAllPhotoFrame, param);
      frameList.data.list.forEach(e => {
        e.key = e.id;
      });
      if (frameList.success) {
        yield put({
          type: 'setAvatarList',
          payload: {
            avatarList: frameList.data.list,
          },
        });
        yield put({
          type: 'setTotal',
          payload: {
            total: frameList.data.total,
          },
        });
      }
    },
    // 修改头像框
    *fetchUpdatePhotoFrame(param, { call, put, select }) {
      const updateData = yield call(updatePhotoFrame, param);
      const frameList = yield call(findAllPhotoFrame, param);
      frameList.data.list.forEach(e => {
        e.key = e.id;
      });
      if (frameList.success) {
        yield put({
          type: 'setAvatarList',
          payload: {
            avatarList: frameList.data.list,
          },
        });
        yield put({
          type: 'setTotal',
          payload: {
            total: frameList.data.total,
          },
        });
      }
    },
  },

  reducers: {
    // 设置静态图片地址
    setStaticUrl(state, { payload }) {
      return {
        ...state,
        staticUrl: payload.staticUrl,
      };
    },
    // 设置动态图片地址
    setMovingUrl(state, { payload }) {
      return {
        ...state,
        movingUrl: payload.movingUrl,
      };
    },
    // 设置数据总条数
    setTotal(state, { payload }) {
      return {
        ...state,
        total: payload.total,
      };
    },
    // 设置头像框列表
    setAvatarList(state, { payload }) {
      return {
        ...state,
        avatarList: payload.avatarList,
      };
    },
    // 设置添加的图片地址
    setImageUrl(state, { payload }) {
      return {
        ...state,
        listImg: payload.listImg,
        detailImg: payload.detailImg,
        enLargeImg: payload.enLargeImg,
      };
    },
  },
};
