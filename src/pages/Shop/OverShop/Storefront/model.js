import moment from 'moment';
import {
  dataDategory,
  detailsGoddsList, // 商品列表
  detailsGodds, // 商品详情
  detailsStore,
} from './service';
// import router from 'umi/router';
/**
 * 交易中心--收入记录
 * createDate:2019-06-19
 * author:Cin
 */
export default {
  namespace: 'storefront',
  state: {
    detailsGoddsData: {}, // 商品详情
    secondCategory: '', // 经营范围二类
    goodsStatus: '', // 商家状态
    firstCategoryName: '', // 经营范围一类名称
    storeDetailsData: {},
    businessTime: '', // 营业时间
    categoryNameStr: '',
  },
  effects: {
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
        // message.success(dataList.subMsg);
      }
    },
    // 获取商家审核后详细信息
    *storeDetails(param, { call, put }) {
      const data = yield call(detailsStore, param);
      const values = data.data;
      if (data.success) {
        yield put({
          type: 'storeDetailsReducer',
          payload: values,
        });
      } else {
        console.log('获取店铺信息失败');
      }
    },
  },
  reducers: {
    storeDetailsReducer(state, { payload }) {
      let businessTimeStr = ''; // 营业时间
      let serverStr = ''; // 店铺服务
      let categoryNameStr = ''; // 店铺经营范围
      payload.sellerDetailInfo.sellerHourList.map(item => {
        businessTimeStr = `${item.sellerHourToString},${businessTimeStr}`;
      });
      payload.sellerDetailInfo.sellerServerList.map(item => {
        serverStr = `${item.name},${serverStr}`;
      });
      payload.categoryNameList.map(item => {
        categoryNameStr = `${item.name},${categoryNameStr}`;
      });
      return {
        ...state,
        storeDetailsData: payload,
        serverStr, // 店铺服务
        businessTime: businessTimeStr, // 营业时间
        categoryNameStr,
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
