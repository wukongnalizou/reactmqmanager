import React, { Component } from 'react';
import { Pagination } from 'antd';
import { connect } from 'dva';
/**
 * 模块：商户中心
 * 页面：已入驻商户
 * 组件：分页
 */
@connect(({ shop }) => ({
  shop,
  total: shop.total,
}))
class PaginationView extends Component {
  state = {
    pageNum: 1,
  };

  componentDidMount() {
    this.getApplying();
  }

  // 请求
  getApplying = () => {
    const { dispatch, pageSize, type, status } = this.props;
    const { pageNum } = this.state;
    dispatch({
      type,
      payload: {
        pageNum,
        pageSize,
        param: {
          status,
          name: '',
        },
      },
    });
  };

  onChange = pageNumber => {
    this.setState(
      {
        pageNum: pageNumber,
      },
      res => {
        this.getApplying();
      },
    );
  };

  render() {
    const { pageSize } = this.props;
    return (
      <Pagination
        showQuickJumper
        defaultPageSize={pageSize}
        total={this.props.total}
        onChange={this.onChange}
      />
    );
  }
}
export default PaginationView;
