import React, { PureComponent } from 'react';
import { Tabs } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';
// 组件：顶部搜索、排序组件
import TopView from './component/Top';
// 组件：表格组件
import TableView from './component/Table';
/**
 * 模块：活动
 * 页面：活动
 * 组件：选项卡
 * @author:lisimeng
 */
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
export default class Active extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        content={
          <div className={styles.tabs}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="待接单" key="1">
                <div>
                  <div>
                    <TopView />
                  </div>
                  <div>
                    <TableView />
                  </div>
                </div>
              </TabPane>
              <TabPane tab="成单待消费" key="2">
                <div>
                  <div>
                    <TopView />
                  </div>
                  <div>
                    <TableView />
                  </div>
                </div>
              </TabPane>
              <TabPane tab="未成单" key="3">
                <div>
                  <TopView />
                </div>
                <div>
                  <TableView />
                </div>
              </TabPane>
              <TabPane tab="活动进行中" key="4">
                <div>
                  <TopView />
                </div>
                <div>
                  <TableView />
                </div>
              </TabPane>
              <TabPane tab="历史活动" key="5">
                <div>
                  <TopView />
                </div>
                <div>
                  <TableView />
                </div>
              </TabPane>
            </Tabs>
          </div>
        }
      />
    );
  }
}
