import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import { getData } from '@/utils/localData';
import styles from './index.less';
/**
 * 模块:运营中心
 * 页面：兑换详情
 * 组件：表格
 */
const columns = [
  {
    title: '活动名称',
    dataIndex: 'merchantName',
    key: 'merchantName',
    // render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: '付款方式',
    dataIndex: 'payType',
    key: 'payType',
  },
  {
    title: '活动人数',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '活动时间',
    key: 'activeTime',
    dataIndex: 'activeTime',
  },
];
const orderColumns = [
  {
    title: '订单号',
    dataIndex: 'orderNum',
    key: 'orderNum',
  },
  {
    title: '支付时间',
    dataIndex: 'payTime',
    key: 'payTime',
    render: text => <span className={styles.left}>{text}</span>,
  },
  {
    title: '订单状态',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
  },
  {
    title: '订单金额',
    key: 'totalAmount',
    dataIndex: 'totalAmount',
  },
];
@connect(({ active }) => ({
  activeDetail: active.activeDetail, // 活动详情
  orderInfo: active.orderInfo, // 订单信息
}))
class ActivityDetailsTableView extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  componentDidMount() {
    this.getactivityDetails();
  }

  getactivityDetails = () => {
    const { dispatch, id } = this.props;
    dispatch({
      type: 'active/fetchFindSellerActivityInfo',
      payload: {
        activityId: id,
        // userId: getData('userId')
        userId: '',
      },
    });
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  // onSelectChange = (selectedRowKeys) => {
  //   console.log('selectedRowKeys changed: ', selectedRowKeys);
  //   this.setState({ selectedRowKeys });
  // }

  render() {
    // const { selectedRowKeys } = this.state;
    const { activeDetail, orderInfo } = this.props;
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // };
    // const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          {/* <Button
                    type="primary"
                    onClick={this.start}
                    disabled={!hasSelected}
                    loading={loading}
                >
                   导出对账单
                </Button> */}
          {/* <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span> */}
        </div>
        {/* <Table rowSelection={rowSelection} columns={columns} dataSource={data} />  */}
        {/* 详情 */}
        <Table
          columns={columns}
          dataSource={activeDetail}
          pagination={{
            hideOnSinglePage: true,
          }}
        />
        {/* 订单信息 */}
        {orderInfo.length === 0 ? (
          ''
        ) : (
          <div>
            <div className={styles.orderName}>订单信息</div>
            <Table columns={orderColumns} dataSource={orderInfo} />
          </div>
        )}
      </div>
    );
  }
}
export default ActivityDetailsTableView;
