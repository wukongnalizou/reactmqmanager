import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
// import styles from './ActivityDetailsTable.less';
/**
 * 模块:运营中心
 * 页面：活动订单详情
 * 组件：表格
 */
const columns = [
  {
    title: '活动id',
    dataIndex: 'activityId',
    key: 'activityId',
  },
  {
    title: '付款时间',
    dataIndex: 'payTime',
    key: 'payTime',
    render: text => {
      return <span className={styles.left}>{text === null ? ' —— ' : text}</span>;
    },
  },
  {
    title: '总金额',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    render: text => {
      return <span>{text / 100}</span>;
    },
  },
  {
    title: '活动时间',
    key: 'createTime',
    dataIndex: 'createTime',
  },
];
@connect(({ sellerOrder }) => ({
  orderDetail: sellerOrder.orderDetail, // 活动详情
}))
class ActivityDetailsTableView extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  componentDidMount() {
    this.getSellerDetailsList();
  }

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

  getSellerDetailsList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'sellerOrder/fetchFindSellerGoodsOrderById',
      payload: {
        id: this.props.location.query.id,
      },
    });
  };

  // onSelectChange = (selectedRowKeys) => {
  //   console.log('selectedRowKeys changed: ', selectedRowKeys);
  //   this.setState({ selectedRowKeys });
  // }

  render() {
    // const {  selectedRowKeys } = this.state;
    const { orderDetail } = this.props;
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // };
    // const hasSelected = selectedRowKeys.length > 0;
    return (
      <PageHeaderWrapper
        content={
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
              dataSource={orderDetail}
              pagination={{
                hideOnSinglePage: true,
              }}
            />
          </div>
        }
      />
    );
  }
}
export default ActivityDetailsTableView;
