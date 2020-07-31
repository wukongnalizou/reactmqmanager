import React, { Component } from 'react';
// 搜索订单组件
import { DatePicker, Input } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import { getData } from '@/utils/localData';
import styles from './index.less';

const { Search } = Input;

/**
 * 模块：交易中心
 * 页面：交易中心
 * 组件：上半部分组件包含：时间、订单号、导出账单
 */
const { RangePicker } = DatePicker;
@connect(({ sellerOrder }) => ({
  orderList: sellerOrder.orderList, // 订单列表
  total: sellerOrder.total, // 总条数
}))
class DateView extends Component {
  state = {
    pageNum: 0,
    createTime: new Date().getTime(),
  };

  /**
   * 时间搜索
   */
  onChange(e) {
    const startTime = moment(e[0]).valueOf();
    const endTime = moment(e[1]).valueOf();
    this.getSellerList(1, endTime, '', startTime);
  }

  /**
   * 获取商家列表
   */
  getSellerList(pageNum, endTime, orderNo, startTime) {
    const { dispatch, orderList } = this.props;
    const sellerId = this.props.SellerId;
    // eslint-disable-next-line
    this.state.createTime = orderList[orderList.length - 1]
      ? orderList[orderList.length - 1].createtIme
      : this.state.createTime;
    dispatch({
      type: 'sellerOrder/fetchFindSellerGoodsOrderList',
      payload: {
        dateTime: this.state.createTime,
        pageNum,
        pageSize: 9,
        param: {
          endTime,
          orderNo,
          sellerId,
          startTime,
        },
      },
    });
  }

    /**
   * 订单号搜索
   */
  noSearch(value) {
    this.getSellerList(1, '', value, '');
  }

  render() {
    return (
        <div>
            <div className={styles.top}>
            {/* 时间 */}
            <div className={styles.date}>
                <RangePicker
                style={{ width: 330, marginTop: 10 }}
                onChange={e => {
                    this.onChange(e);
                }}
                showTime
                />
            </div>
            {/* 搜索订单 */}
            <div className={styles.input}>
                {' '}
                {/* 搜索组件 */}
                <Search
                placeholder="订单号"
                onSearch={value => {
                    this.noSearch(value);
                }}
                className={styles.search}
                enterButton
                />
            </div>

            {/* <div className={styles.button}><Button>导出对账单</Button></div> */}
            </div>
        </div>
    );
}
}

export default DateView;
