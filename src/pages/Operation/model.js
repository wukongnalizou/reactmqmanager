import router from 'umi/router';
import moment from 'moment';
import {
  findExchangeProductOrderList, // 查询活动商品订单
  findActivitiesProductList, // 查询活动商品列表
  addActivitiesProduct, // 添加活动商品
  findExchangeProductOrderById, // 根据订单id查询活动商品订单
  updateExchangeProductOrderForBack, // 修改活动商品
  findActivitiesProductById, // 根据活动id查询活动商品
  updateOrDeleteActivitiesProduct, // 修改删除活动商品
} from './service';

export default {
  namespace: 'mogu',
  state: {
    exchangeProductList: [], // 活动商品订单列表
    exchangeOrderListTotal: '', // 活动商品订单总量
    productList: [], // 活动商品列表
    productListTotal: '', // 活动商品列表总量
    // addImageList: [], //商品图片列表
    productDetail: {}, // 商品详情
    orderDetail: {}, // 兑换订单详情
    orderStatus: {
      0: '未发货',
      1: '已发货',
      2: '已签收',
      3: '驳回',
    },
  },
  effects: {
    // 查询活动商品订单
    *fetchFindExchangeProductOrderList(param, { call, put, select }) {
      const list = yield call(findExchangeProductOrderList, param);
      const orderStatus = yield select(state => state.mogu.orderStatus);
      list.data.list.forEach(item => {
        item.key = item.id;
        item.statusShow = orderStatus[item.status];
        item.exchangeTime = moment(item.createTime).format('YYYY-MM-DD:hh:mm');
      });
      if (list.success) {
        yield put({
          type: 'setExchangeProductList',
          payload: {
            exchangeProductList: list.data.list,
            exchangeOrderListTotal: list.data.total,
          },
        });
      }
    },
    // 查询活动商品列表
    *fetchFindActivitiesProductList(param, { call, put }) {
      const productList = yield call(findActivitiesProductList, param);
      if (productList.success) {
        productList.data.list.forEach(item => {
          item.key = item.id;
          item.describe = JSON.parse(item.content);
        });
        yield put({
          type: 'setProductList',
          payload: {
            productList: productList.data.list,
            productListTotal: productList.data.total,
          },
        });
      }
    },
    /**
     * 添加活动商品
     */
    *fetchAddActivitiesProduct(param, { call, put }) {
      const add = yield call(addActivitiesProduct, param);
    },
    /**
     * 根据活动id查询活动商品
     */
    *fetchFindActivitiesProductById(param, { call, put }) {
      const findData = yield call(findActivitiesProductById, param);
      if (findData.success) {
        yield put({
          type: 'setProductDetail',
          payload: {
            productDetail: findData.data,
          },
        });
      }
    },
    /**
     * 修改删除活动商品
     */
    *fetchUpdateOrDeleteActivitiesProduct(param, { call, put }) {
      const data = yield call(updateOrDeleteActivitiesProduct, param);
    },
    /**
     * 根据订单id查询活动商品订单
     */
    *fetchFindExchangeProductOrderById(param, { call, put, select }) {
      const orderDetail = yield call(findExchangeProductOrderById, param);
      const orderStatus = yield select(state => state.mogu.orderStatus);
      orderDetail.data.orderStatus = orderStatus[orderDetail.data.status];
      orderDetail.data.createTimeShow = moment(orderDetail.data.createTime).format(
        'YYYY-MM-DD:hh:mm',
      );
      orderDetail.data.receiptExpectedDateShow = moment(
        orderDetail.data.receiptExpectedDate,
      ).format('YYYY-MM-DD:hh:mm');
      if (orderDetail.success) {
        yield put({
          type: 'setOrderDetail',
          payload: {
            orderDetail: orderDetail.data,
          },
        });
      }
    },
    /**
     * 修改兑换订单
     */
    *fetchUpdateExchangeProductOrderForBack(param, { call, put }) {
      const updateData = yield call(updateExchangeProductOrderForBack, param);
      if (updateData.data.count === 1) {
        router.push('/operations/activeCenter/moguRecording');
      }
    },
  },
  reducers: {
    // 设置活动商品订单
    setExchangeProductList(state, { payload }) {
      return {
        ...state,
        exchangeProductList: payload.exchangeProductList,
        exchangeOrderListTotal: payload.exchangeOrderListTotal,
      };
    },
    // 设置活动商品列表
    setProductList(state, { payload }) {
      return {
        ...state,
        productList: payload.productList,
        productListTotal: payload.productListTotal,
      };
    },
    // 设置添加商品列表
    // setAddImageList(state, { payload }) {
    //   return {
    //     ...state,
    //     addImageList: payload.addImageList
    //   }
    // },
    // 设置商品详情
    setProductDetail(state, { payload }) {
      return {
        ...state,
        productDetail: payload.productDetail,
      };
    },
    // 设置兑换订单详情
    setOrderDetail(state, { payload }) {
      return {
        ...state,
        orderDetail: payload.orderDetail,
      };
    },
    // 设置要进行修改的商品id
    // setResetGoodsId(state, { payload }) {
    //   return {
    //     ...state,
    //     resetGoodsId: payload.resetGoodsId
    //   }
    // }
  },
};
