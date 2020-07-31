import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// 表格组件
import TableView from './component/Table';
import styles from './index.less';
/**
 * 模块：分类服务
 * 页面：类别管理
 * @author：zhaoyijn
 */
export default class Category extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        content={
          <div>
            {/* 表格组件 */}
            <div className={styles.table}>
              <TableView />
            </div>
          </div>
        }
      />
    );
  }
}
