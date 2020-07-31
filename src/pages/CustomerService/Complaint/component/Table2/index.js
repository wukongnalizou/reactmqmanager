import React, { Component } from 'react';
import { Table, Tag, Button } from 'antd';
import { connect } from 'dva';
import FeedbackView from '../Feedback';
import styles from './index.less';
/**
 * 模块：客服中心
 * 页面：投诉反馈-投诉商家
 * 组件：表格组件
 */

@connect(({ complain }) => ({
  sellerComplainList: complain.sellerComplainList, // 用户投诉列表
  sellerTotal: complain.sellerTotal, // 总条数
}))
class Table1View extends Component {
  state = {
    createTime: new Date().getTime(),
    pageNum: 0,
  };

  componentDidMount() {
    this.getSellerComplainList(1);
  }

  /**
   * 获取下一页
   */
  nextPageClick(e) {
    this.state.pageNum = e;
    this.getSellerComplainList(e);
  }

  /**
   * 刷新列表信息
   */
  transMsg(e) {
    setTimeout(() => {
      this.getSellerComplainList(this.state.pageNum);
    }, 1000);
  }

  /**
   * 获取商家投诉列表
   */
  getSellerComplainList(pageNum, content, startTime, endTime) {
    const { dispatch, sellerComplainList, sellerTotal } = this.props;
    this.state.createTime = sellerComplainList[sellerComplainList.length - 1]
      ? sellerComplainList[sellerComplainList.length - 1].createtIme
      : this.state.createTime;
    dispatch({
      type: 'complain/fetchFindSellerComplainList',
      payload: {
        dateTime: this.state.createTime,
        pageNum,
        pageSize: 9,
        param: {
          beginTime: startTime,
          endTime,
          keyword: content,
        },
      },
    });
  }

  render() {
    const columns = [
      {
        title: '商家',
        dataIndex: 'complainUserName',
        key: 'complainUserName',
        width: 100,
      },
      {
        title: '投诉时间',
        dataIndex: 'complainTime',
        key: 'complainTime',
        width: 200,
      },
      {
        title: '投诉人电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        //   title: '投诉类别',
        //   dataIndex: 'category',
        //   key: 'category'
        // },{
        title: '状态',
        dataIndex: 'statusShow',
        key: 'statusShow',
        width: 100,
      },
      {
        title: '投诉内容',
        dataIndex: 'complainContent',
        key: 'complainContent',
      },
      // {
      //   title: '回复',
      //   dataIndex: 'reply',
      //   key: 'reply',
      //   render: (a, e) => <FeedbackView id={e.id} type="shop" transMsg={msg => this.transMsg(msg)} />,
      // },
    ];
    const { sellerTotal, sellerComplainList } = this.props;
    return (
      <div className={styles.table}>
        <Table
          columns={columns}
          dataSource={sellerComplainList}
          pagination={{
            defaultPageSize: 9,
            disabled: false,
            total: sellerTotal,
            onChange: e => {
              this.nextPageClick(e);
            },
          }}
        />
      </div>
    );
  }
}
export default Table1View;
