import React, { Component } from 'react';
import { DatePicker, Button, Input } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './index.less';
/**
 * 模块：客服中心
 * 页面：投诉反馈
 * 组件：时间检索
 */
const { RangePicker } = DatePicker;
const { Search } = Input;
@connect(({ complain }) => ({
  userComplainList: complain.userComplainList, // 用户投诉列表
  sellerComplainList: complain.sellerComplainList, // 商家投诉列表
  total: complain.total,
}))
class DateView extends Component {
  state = {
    createTime: new Date().getTime(),
    pageNum: 0,
    // 搜索内容
    searchContent: '',
    // 搜索开始时间
    startTime: '',
    // 搜索结束时间
    endTime: '',
  };

  /**
   * 内容搜索
   */
  sellerSearchClick(e) {
    this.getSellerComplainList(1, e, '', '');
    this.state.searchContent = e;
  }

  /**
   * 时间搜索
   */
  onChange(e) {
    this.state.startTime = moment(e[0]).valueOf();
    this.state.endTime = moment(e[1]).valueOf();
    if (this.props.currentPage === 'shop') {
      this.getSellerComplainList(1, '', this.state.startTime, this.state.endTime);
    } else {
      this.getUserComplainList(1, '', this.state.startTime, this.state.endTime);
    }
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

  /**
   * 获取商家投诉列表
   */
  getSellerComplainList(pageNum, content, startTime, endTime) {
    const { dispatch, sellerComplainList } = this.props;
    this.state.createTime = sellerComplainList[sellerComplainList.length - 1]
      ? sellerComplainList[sellerComplainList.length - 1].createTime
      : this.state.createTime;
    dispatch({
      type: 'complain/fetchFindSellerComplainList',
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

  /**
   * 确认搜索
   */
  confirmClick() {
    if (this.props.currentPage === 'shop') {
      this.getSellerComplainList(
        1,
        this.state.searchContent,
        this.state.startTime,
        this.state.endTime,
      );
    } else {
      this.getUserComplainList(
        1,
        this.state.searchContent,
        this.state.startTime,
        this.state.endTime,
      );
    }
  }

  /**
   * 输入
   */
  search(e) {
    this.state.searchContent = e.target.value;
  }

  render() {
    return (
      <div className={styles.right}>
        {/* 搜索插件 */}
        <div className={styles.searchView}>
          <Search
            placeholder="请输入搜索内容"
            onSearch={value => this.sellerSearchClick(value)}
            onChange={e => {
              this.search(e);
            }}
            enterButton
          />
        </div>
        {/* 入驻时间 */}
        <div className={styles.date}>
          <span className={styles.title}>投诉时间</span>
          <div>
            <RangePicker style={{ width: 330 }} onChange={e => this.onChange(e)} />
          </div>
        </div>
        {/* 确认按钮 */}
        <div>
          <Button
            className={styles.button}
            type="primary"
            onClick={e => {
              this.confirmClick(e);
            }}
          >
            确认
          </Button>
        </div>
      </div>
    );
  }
}
export default DateView;
