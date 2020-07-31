import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import TableView from './component/Table';
import styles from './index.less';
/**
 * 模块：客服中心
 * 页面：在线客服接入
 * @author:lisimeng
 */
export default class Service extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        content={
          <div className={styles.content}>
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
