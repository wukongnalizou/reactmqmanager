import moment from 'moment';
import {
  displayActivityBySeller, // 获取活动信息列表
  findSellerActivityInfo, // 获取活动详情
} from './service';
/**
 * 活动
 * createDate:2019-06-19
 * author:Cin
 */
// 付款方式
const TYPE_NAME = [
  '请客模式',
  'AA模式',
  '小随机',
  '大随机',
  '随机请客',
  '发起人拿指定份额',
  '男生AA',
  '女生AA',
];
// 订单状态
const ORDER_STATUS_NAME = {
  0: '发起订单',
  1: '发起人确认',
  2: '订单支付完成',
  3: '发起者拒绝',
  4: '待订单关闭退款',
};
export default {
  namespace: 'active',
  state: {
    // 活动列表
    activeList: [],
    // 数据总条数
    total: 0,
    // 活动详情信息
    activeDetail: [],
    // 订单信息
    orderInfo: [],
  },
  effects: {
    // 获取活动信息列表
    *fetchDisplayActivityBySeller(param, { call, put, select }) {
      const activeListData = yield call(displayActivityBySeller, param);
      if (activeListData.success === true) {
        activeListData.data.list.forEach(element => {
          element.key = element.id;
          element.createtime = moment(element.createTime).format('YYYY-MM-DD HH:mm');
          element.starttime = moment(element.beginTime).format('YYYY-MM-DD HH:mm');
          element.number += '人';
          element.state = element.activityStatus;
          if (element.activityStatus === 1) {
            element.subStatus = '待接单';
          } else if (element.activityStatus === 2) {
            element.subStatus = '待付款';
          } else if (element.activityStatus === 3) {
            element.subStatus = '未成单';
          } else if (element.activityStatus === 4) {
            element.subStatus = '待消费';
          } else if (element.activityStatus === 5) {
            element.subStatus = '活动中';
          } else if (element.activityStatus === 6) {
            if (element.subStatus === 0) {
              element.subStatus = '已拒绝接单';
            } else if (element.subStatus === 4) {
              element.subStatus = '活动已完成';
            } else if (element.subStatus === 6) {
              element.subStatus = '活动已解散';
            } else if (element.subStatus === 12) {
              element.subStatus = '活动已终止';
            }
          }
        });
        yield put({
          type: 'setActiveList',
          payload: {
            activeList: activeListData.data,
          },
        });
        yield put({
          type: 'setTotal',
          payload: {
            total: activeListData.data.total,
          },
        });
      }
    },
    // 获取活动详情
    *fetchFindSellerActivityInfo(param, { call, put }) {
      const activeDetailData = yield call(findSellerActivityInfo, param);
      if (activeDetailData.success) {
        activeDetailData.data.key = activeDetailData.data.activityId;
        activeDetailData.data.merchantName = activeDetailData.data.activityName;
        activeDetailData.data.payType = TYPE_NAME[activeDetailData.data.activityType];
        activeDetailData.data.number = activeDetailData.data.participant;
        activeDetailData.data.activeTime = moment(activeDetailData.data.beginTime).format(
          'YYYY-MM-DD HH:mm',
        );
        const activeDetail = [];
        activeDetail[0] = activeDetailData.data;
        // activeDetail.push(activeDetailData.data.reqFindAllOrderVoList);
        activeDetailData.data.reqFindAllOrderVoList.forEach(e => {
          if (e.payTime === null) {
            e.payTime = ' —— ';
          } else {
            e.payTime = moment(e.payTime).format('YYYY-MM-DD HH:mm');
          }
          e.orderStatus = ORDER_STATUS_NAME[e.orderStatus];
        });
        yield put({
          type: 'setActiveDetail',
          payload: {
            activeDetail,
          },
        });
        yield put({
          type: 'setOrderInfo',
          payload: {
            orderInfo: activeDetailData.data.reqFindAllOrderVoList,
          },
        });
      }
    },
  },
  reducers: {
    // 设置活动列表数据
    setActiveList(state, { payload }) {
      return {
        ...state,
        activeList: payload.activeList,
      };
    },
    // 设置数据总条数
    setTotal(state, { payload }) {
      return {
        ...state,
        total: payload.total,
      };
    },
    // 设置活动详情
    setActiveDetail(state, { payload }) {
      return {
        ...state,
        activeDetail: payload.activeDetail,
      };
    },
    // 设置订单信息
    setOrderInfo(state, { payload }) {
      return {
        ...state,
        orderInfo: payload.orderInfo,
      };
    },
  },
};
