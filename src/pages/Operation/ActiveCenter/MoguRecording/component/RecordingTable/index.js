import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import Link from 'umi/link';
import { DatePicker, Button, Input, Table } from 'antd';
import styles from './index.less';
/**
 * 模块：运营中心
 * 页面：魔咕计划-兑换记录表格
 * 组件：表格
 */

// 日期组件
const { RangePicker } = DatePicker;

// 表格数据
const columns = [
  {
    title: '兑换时间',
    dataIndex: 'exchangeTime',
    key: 'exchangeTime',
  },
  {
    title: '订单号 ',
    dataIndex: 'orderNum',
    key: 'orderNum',
  },
  {
    title: '商品名称',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: '状态',
    dataIndex: 'statusShow',
    key: 'statusShow',
    // }, {
    //     title: '状态',
    //     key: 'status',
    //     render: () => (
    //         <Button type="primary" >已发货</Button>
    //     ),
  },
  {
    title: '操作',
    key: 'details',
    render: (e, e1) => {
      return (
        <Link to={`./recordingDetails?id=${e1.id}`}>
          <Button type="primary">查看详情</Button>
        </Link>
      );
    },
  },
];
@connect(({ mogu }) => ({
  exchangeProductList: mogu.exchangeProductList, // 活动商品订单列表
  exchangeOrderListTotal: mogu.exchangeOrderListTotal, // 活动商品订单总量
}))
class RecordingTable1View extends Component {
  state = {
    dateTime: new Date().getTime(),
    searchNo: '', // 搜索订单号
    productName: '', // 搜索商品名称
    startTime: '', // 开始时间
    endTime: '', // 结束时间
  };

  /**
   * 获取订单
   */
  getRecordList(pageNum, status, startDate, endDate, orderNum, userId, productName) {
    const { dispatch, exchangeProductList } = this.props;
    this.state.dateTime = exchangeProductList[exchangeProductList.length - 1]
      ? exchangeProductList[exchangeProductList.length - 1].dateTime
      : this.state.dateTime;
    dispatch({
      type: 'mogu/fetchFindExchangeProductOrderList',
      payload: {
        dateTime: this.state.dateTime,
        pageNum,
        pageSize: '7',
        param: {
          endDate,
          orderNum,
          productName,
          startDate,
          userId,
          status,
        },
      },
    });
  }

  /**
   * 获取下一页信息
   */
  nextPageClick(e) {
    this.getRecordList(e, parseInt(this.props.status));
  }

  /**
   * 日期搜索
   */
  onChange(e) {
    let startTime = moment(e[0]).valueOf();
    this.state.startTime = startTime;
    this.state.endTime = endTime;
    let endTime = moment(e[1]).valueOf();
    this.getRecordList(1, parseInt(this.props.status), startTime, endTime, '', '');
  }

  /**
   * 订单号输入
   */
  searchInput(e, name) {
    this.state[name] = e.target.value;
  }

  /**
   * 订单号搜索
   */
  searchClick(e, name) {
    name === 'searchNo'
      ? this.getRecordList(1, parseInt(this.props.status), '', '', this.state.searchNo, '')
      : this.getRecordList(1, parseInt(this.props.status), '', '', '', '', this.state.productName);
  }

  render() {
    const { exchangeProductList, exchangeOrderListTotal } = this.props;
    return (
      <div>
        <div className={styles.top}>
          {/* 日期组件 */}
          <div className={styles.date}>
            <RangePicker
              onChange={e => {
                this.onChange(e);
              }}
            />
          </div>
          <Button type="primary" className={styles.button}>
            时间搜索
          </Button>
          {/* 输入订单号 */}
          <div className={styles.input}>
            <Input
              placeholder="订单号"
              onChange={e => {
                this.searchInput(e, 'searchNo');
              }}
            />
          </div>
          <Button
            type="primary"
            className={styles.button}
            onClick={e => {
              this.searchClick(e, 'searchNo');
            }}
          >
            订单号搜索
          </Button>
          {/* 商品名称搜索 */}
          <div className={styles.input}>
            <Input
              placeholder="商品名称"
              onChange={e => {
                this.searchInput(e, 'productName');
              }}
            />
          </div>
          <Button
            type="primary"
            className={styles.button}
            onClick={e => {
              this.searchClick(e, 'productName');
            }}
          >
            商品名称搜索
          </Button>
          {/* 按钮 */}
          {/* <div>
                        <Button type="primary" className={styles.button}>导入发货单</Button>
                        <Button type="primary" className={styles.button}>导出发货单</Button>
                    </div>                   */}
        </div>
        {/* 表格组件 */}
        <div className={styles.table}>
          <Table
            columns={columns}
            dataSource={exchangeProductList}
            pagination={{
              defaultPageSize: 7,
              disabled: false,
              total: exchangeOrderListTotal,
              onChange: e => {
                this.nextPageClick(e);
              },
            }}
          />
        </div>
      </div>
    );
  }
}
export default RecordingTable1View;
