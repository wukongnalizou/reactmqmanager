import React, { Component } from 'react';
// 表格组件
import { Table, Button } from 'antd';
// import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
// import { getData } from '@/utils/localData';
import styles from './index.less';
/**
 * 模块：订单中心
 * 组件：表格
 * modifyDate:2019-06-20
 * author:Cin
 */
@connect(({ sellerOrder }) => ({
  orderList: sellerOrder.orderList, // 订单列表
  total: sellerOrder.total, // 总条数
}))
class TransactionTable1 extends Component {
  state = {
    createTime: new Date().getTime(),
    pageNum: 0,
  };

  componentDidMount() {
    this.getSellerList(1, '', '', '');
  }

  /**
   * 获取商家列表
   */
  getSellerList(pageNum, endTime, orderNo, startTime) {
    const { dispatch, orderList } = this.props;
    // let sellerId = getData('sellerId');
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
   * 查看详情
   */
  lookDetailClick = e => {
    router.push(`/shop/overShop/shopOrder/shopOrderDetail?id=${e}`);
  };

  /**
   * 下一页
   */
  nextPageClick(e) {
    this.getSellerList(e);
  }

  render() {
    const { orderList, total } = this.props;
    const columns = [
      {
        title: '交易时间',
        dataIndex: 'payTimeString',
        key: 'payTimeString',
        render: text => {
          return <span className={styles.left}>{text}</span>;
        },
      },
      {
        title: '订单号 ',
        dataIndex: 'orderNo',
        key: 'orderNo',
      },
      {
        title: '活动总金额（元）',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        render: text => {
          return <span>{text / 100}</span>;
        },
      },
      {
        title: '商家收益金额（元）',
        dataIndex: 'actualAmount',
        key: 'actualAmount',
        render: text => {
          return <span>{text / 100}</span>;
        },
      },
      {
        title: '操作',
        key: 'action',
       // render: () => <Link to='/details/activityDetails'><Button type="primary">详情</Button></Link>
        render: e => {
          // console.log(e);
          return (
            <Button type="primary" onClick={() => this.lookDetailClick(e.mid)}>
              详情
            </Button>
          );
        },
      },
    ];
    return (
      <div>
        {/* 表格组件 */}
        <div style={{ marginTop: 20 }}>
          <Table
            columns={columns}
            dataSource={orderList}
            pagination={{
              defaultPageSize: 9,
              disabled: false,
              total,
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
export default TransactionTable1;
