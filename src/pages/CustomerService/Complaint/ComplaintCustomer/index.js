import React, { Component } from 'react';
import { Icon, Button, Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import Table1View from '../component/Table1';
// 时间检索
import DateView from '../component/Date';
import styles from './index.less';
/**
 * 模块：客服中心
 * 页面：投诉反馈-投诉顾客
 * @author:zhaoyijin
 */
// 投诉
const { Search } = Input;
@connect(({ complain }) => ({
  userComplainList: complain.userComplainList, // 用户投诉列表
  total: complain.total,
}))
class ComplaintCustomer extends Component {
  state = {
    createTime: new Date().getTime(),
    pageNum: 1,
  };

  render() {
    return (
      <PageHeaderWrapper
        content={
          <div className={styles.content}>
            {/* 左侧内容 */}
            <div className={styles.left}>
              {/* 表格 */}
              <div className={styles.tableView}>
                <Table1View />
              </div>
            </div>
            {/* 右侧筛选 */}
            <div className={styles.right}>
              {/* 标题筛选 */}
              <div className={styles.title}>
                <div className={styles.icon}>
                  <Icon type="form" />
                </div>
                <span>筛选</span>
              </div>
              <DateView currentPage="user" />
            </div>
          </div>
        }
      />
    );
  }
}
export default ComplaintCustomer;
