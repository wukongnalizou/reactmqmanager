import moment from 'moment';
import {
  findSellerGoodsOrderList, // 交易记录列表
  findSellerGoodsOrderById, // 交易记录详情
  detailsGoddsList, // 商品列表
  detailsGodds, // 商品详情
  dataDategory, // 经营范围一类的名字
} from './service';
// import router from 'umi/router';
/**
 * 交易中心--收入记录
 * createDate:2019-06-19
 * author:Cin
 */
export default {
  namespace: 'sellerOrder',
  state: {
    orderList: [], // 订单列表
    total: 0, // 数据总条数
    orderDetail: [], // 订单详情
    detailsGoddsData: {}, // 商品详情
    secondCategory: '', // 经营范围二类
    goodsStatus: '', // 商家状态
    firstCategoryName: '', // 经营范围一类名称
  },
  effects: {
    // 获取交易记录列表
    *fetchFindSellerGoodsOrderList(param, { call, put, select }) {
      const orderListData = yield call(findSellerGoodsOrderList, param);
      if (orderListData.success) {
        orderListData.data.list.forEach(e => {
          e.key = e.mid;
          e.payTimeString =
            e.payTime === null ? ' —— ' : moment(e.payTime).format('YYYY-MM-DD HH:mm');
        });
        yield put({
          type: 'setOrderList',
          payload: {
            orderList: orderListData.data.list,
          },
        });
        yield put({
          type: 'setTotal',
          payload: {
            total: orderListData.data.total,
          },
        });
      }
    },
    // 交易记录详情
    *fetchFindSellerGoodsOrderById(param, { call, put, select }) {
      const detailData = yield call(findSellerGoodsOrderById, param);
      if (detailData.success) {
        const orderDetail = [];
        orderDetail[0] = detailData.data;
        orderDetail[0].key = detailData.data.mid;
        // orderDetail[0].isRemitStatus = detailData.data.isRemit ? '已打款' : '未打款';
        orderDetail[0].payTime =
          orderDetail[0].payTime === null
            ? ' —— '
            : moment(detailData.data.payTime).format('YYYY-MM-DD hh:MM');
        orderDetail[0].createTime = moment(detailData.data.createTime).format('YYYY-MM-DD hh:MM');
        yield put({
          type: 'setOrderDetail',
          payload: {
            orderDetail,
          },
        });
      }
    },
    // 获取商家列表和商品详情
    *goodsDetails(param, { call, put }) {
      // 获取商品列表详情
      const dataList = yield call(detailsGoddsList, param);
      if (dataList.success) {
        if (dataList.data.list.length > 0) {
          param.payload.id = dataList.data.list[0].id;
          delete param.payload.pageNum;
          delete param.payload.pageSize;
          delete param.payload.param;
          const data = yield call(detailsGodds, param);
          const firstCategoryParam = {
            type: 'sellerOrder/goodsDetails',
            payload: {
              id: data.data.categoryList[0].parentId,
            },
          };
          // 多调一个接口，请求经营范围一类的名字
          const categoryData = yield call(dataDategory, firstCategoryParam);
          yield put({
            type: 'categoryDataRe',
            payload: categoryData.data, // 暂时没有商品列表 默认取第一个
          });
          yield put({
            type: 'detailsGoddsRe',
            payload: data.data, // 暂时没有商品列表 默认取第一个
          });
        } else {
          console.log('没有商品列表');
          yield put({
            type: 'detailsGoddsRe',
            payload: {}, // 没有商品列表,赋值空对象
          });
        }
      } else {
        console.log('获取商品详细失败');
        message.success(dataList.subMsg);
      }
    },
  },
  reducers: {
    // 设置订单列表
    setOrderList(state, { payload }) {
      return {
        ...state,
        orderList: payload.orderList,
      };
    },
    // 设置数据总条数
    setTotal(state, { payload }) {
      return {
        ...state,
        total: payload.total,
      };
    },
    // 设置订单详情
    setOrderDetail(state, { payload }) {
      return {
        ...state,
        orderDetail: payload.orderDetail,
      };
    },
    // 商品详情
    detailsGoddsRe(state, { payload }) {
      let strName = '';
      let goodsStatus = '';
      if (payload) {
        payload.categoryList.map(item => {
          strName = `${item.name},${strName}`;
        });
      }
      // 0 发布，1 上架，2 下架 ，3 违规
      if (payload.status === 0) {
        goodsStatus = '发布';
      } else if (payload.status === 1) {
        goodsStatus = '上架';
      } else if (payload.status === 2) {
        goodsStatus = '下架';
      }
      if (payload.status === 3) {
        goodsStatus = '违规';
      }
      return {
        ...state,
        detailsGoddsData: payload,
        secondCategory: strName,
        goodsStatus,
      };
    },
    // 经营范围一类名称
    categoryDataRe(state, { payload }) {
      return {
        ...state,
        firstCategoryName: payload.name,
      };
    },
  },
};
