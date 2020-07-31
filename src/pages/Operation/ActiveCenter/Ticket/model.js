import router from 'umi/router';
import { message } from 'antd';
import moment from 'moment';
import { setData } from '@/utils/localData';
import {
  findProductListForBack, // 后台查询商品列表
  addProduct, // 后台添加商品
  deleteProduct, // 删除商品
  updateProduct, // 修改商品
  findProductById, // 根据id查询商品
} from './service';

export default {
  namespace: 'ticket',
  state: {
    productList: [], // 商品列表
    listTotal: '', // 列表总量
    resetId: '', // 要修改的商品id
    product: '', // 要修改的商品
  },
  effects: {
    // 后台查询商品列表
    *fetchfindProductListForBack(param, { call, put, selecet }) {
      const productListData = yield call(findProductListForBack, param);
      if (productListData.success) {
        productListData.data.list.forEach(item => {
          item.key = item.id;
        });
        yield put({
          type: 'setProductList',
          payload: {
            productList: productListData.data.list,
            listTotal: productListData.data.total,
          },
        });
      }
    },
    // 后台添加商品
    *fetchAddProduct(param, { call, put, select }) {
      const addProductData = yield call(addProduct, param);
    },
    // 后台删除商品
    *fetchDeleteProduct(param, { call, put, select }) {
      const deleteData = yield call(deleteProduct, param);
      if (deleteData.data.count !== 1) {
        message.warning('删除失败');
      }
    },
    // 后台修改商品
    *fetchUpdateProduct(param, { call, put, select }) {
      const updateData = yield call(updateProduct, param);
      if (updateData.data.count !== 1) {
        message.warning('删除失败');
      }
    },
    // 根据id查询商品
    *fetchFindProductById(param, { call, put, select }) {
      const productData = yield call(findProductById, param);
      if (productData.success) {
        yield put({
          type: 'setProduct',
          payload: {
            product: productData.data,
          },
        });
      }
    },
  },
  reducers: {
    // 设置商品列表
    setProductList(state, { payload }) {
      return {
        ...state,
        productList: payload.productList,
        listTotal: payload.listTotal,
      };
    },
    // 设置要修改的商品的id
    setResetId(state, { payload }) {
      return {
        ...state,
        resetId: payload.resetId,
      };
    },
    // 设置商品
    setProduct(state, { payload }) {
      return {
        ...state,
        product: payload.product,
      };
    },
  },
};
