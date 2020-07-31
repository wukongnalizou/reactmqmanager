import React, { PureComponent } from 'react';
import { Button } from 'antd';
import Link from 'umi/link';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// 表格组件
import TaskTableView from './component/TaskTable';
import styles from './index.less';
/**
 * 模块：运营中心
 * 页面：任务中心-任务列表
 * @author:zhaoyijin
 */
export default class TaskCenter extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        content={
          <div>
            <div className={styles.create}>
              {/* 创建任务 */}
              <Link to="/operation/mission/taskCenter/createTask">
                <Button type="primary">创建任务</Button>
              </Link>
            </div>
            {/* 表格 */}
            <div className={styles.table}>
              <TaskTableView />
            </div>
          </div>
        }
      />
    );
  }
}
