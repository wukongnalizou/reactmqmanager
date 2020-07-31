import React, { PureComponent } from 'react';
import { Input, Tabs, Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import TableView from '../Table1';
import Table2View from '../Table2';
import Table3View from '../Table3';
import DateView from '../../../../Shop/OverShop/component/Date';
import styles from './index.less';
/**
 * 模块：交易中心
 * 组件：选项卡
 */
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
export default class TransactionView extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        content={
          <div>
            <div className={styles.top}>
              <div className={styles.dateView}>
                <DateView />
              </div>
              <div className={styles.input}>
                <Input placeholder="订单号" />
              </div>
              <div className={styles.button}>
                <Button>导出对账单</Button>
              </div>
            </div>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="商家交易订单" key="1">
                <div className={styles.content}>
                  {/* 表格插件 */}
                  <div className={styles.tableView}>
                    <TableView />
                  </div>
                </div>
              </TabPane>
              <TabPane tab="用户支付订单" key="2">
                <div className={styles.content}>
                  {/* 表格插件 */}
                  <div className={styles.tableView}>
                    <Table3View />
                  </div>
                </div>
              </TabPane>
              <TabPane tab="用户押金订单" key="3">
                <div className={styles.content}>
                  {/* 表格插件 */}
                  <div className={styles.tableView}>
                    <Table2View />
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        }
      />
    );
  }
}
