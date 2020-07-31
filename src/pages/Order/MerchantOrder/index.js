import React, { PureComponent } from 'react';
import { Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SortView from './component/Sort';
import TableView from './component/Table';
import styles from './index.less';
/**
 * 页面：订单中心
 * @author：zhaoyijn
 */
const { Search } = Input;

export default class MerchantOrder extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        content={
          <div className={styles.content}>
            <div className={styles.top}>
              {/* 搜索插件 */}
              <div className={styles.searchView}>
                <Search
                  placeholder="请输入搜索内容"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              </div>
              {/* 排序插件 */}
              <div className={styles.sortView}>
                <SortView />
              </div>
            </div>
            {/* 表格插件 */}
            <div className={styles.tableView}>
              <TableView />
            </div>
          </div>
        }
      />
    );
  }
}
