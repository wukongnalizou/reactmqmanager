import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Tag, Button } from 'antd';
import FeedbackView from '../Feedback';
import styles from './index.less';
/**
 * 模块：客服中心
 * 页面：投诉反馈-投诉顾客
 * 组件：表格组件
 */

@connect(({ complain }) => ({
  userComplainList: complain.userComplainList, // 用户投诉列表
  total: complain.total, // 总条数
}))
class Table1View extends Component {
  state = {
    createTime: new Date().getTime(),
    pageNum: 1,
  };

  componentDidMount() {
    this.getUserComplainList(1);
  }

  /**
   * 获取下一页
   */
  nextPageClick(e) {
    this.state.pageNum = e;
    this.getUserComplainList(e);
  }

  /**
   * 刷新列表信息
   */
  transMsg(e) {
    setTimeout(() => {
      this.getUserComplainList(this.state.pageNum);
    }, 1000);
  }

  /**
   * 获取用户投诉列表
   */
  getUserComplainList(pageNum, content, startTime, endTime) {
    const { dispatch, userComplainList, total } = this.props;
    this.state.createTime = userComplainList[userComplainList.length - 1]
      ? userComplainList[userComplainList.length - 1].createTime
      : this.state.createTime;
    dispatch({
      type: 'complain/fetchFindUserComplainList',
      payload: {
        dateTime: this.state.createTime,
        pageNum,
        pageSize: 5,
        param: {
          beginTime: startTime,
          endTime,
          keyword: content,
        },
      },
    });
  }

  render() {
    const { total, userComplainList } = this.props;
    const columns = [
      {
        title: '用户',
        dataIndex: 'complainUserInfo',
        key: 'complainUserInfo',
      },
      {
        title: '投诉时间',
        dataIndex: 'complainTime',
        key: 'complainTime',
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
        // }, {
        title: '状态',
        dataIndex: 'statusShow',
        key: 'statusShow',
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
      //   render: (a, e) => <FeedbackView id={e.id} type="user" transMsg={msg => this.transMsg(msg)} />,
      // },
    ];
    return (
      <div className={styles.table}>
        <Table
          columns={columns}
          dataSource={userComplainList}
          pagination={{
            defaultPageSize: 5,
            disabled: false,
            total,
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
