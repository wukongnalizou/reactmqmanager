import React, { Component } from 'react';
import { Icon, Button, Input } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';
// 表格
import Table1View from '../component/Table2';
// 时间检索
import DateView from '../component/Date';
/**
 * 模块：客服中心
 * 页面：投诉反馈-投诉商家
 * @author:lisimeng
 */
// 投诉
const { Search } = Input;
@connect(({ complain }) => ({
  sellerComplainList: complain.sellerComplainList, // 商家投诉列表
  total: complain.total,
}))
class ComplaintShop extends Component {
  state = {
    createTime: new Date().getTime(),
    pageNum: 0,
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
              <DateView currentPage="shop" />
            </div>
          </div>
        }
      />
    );
  }
}
export default ComplaintShop;
