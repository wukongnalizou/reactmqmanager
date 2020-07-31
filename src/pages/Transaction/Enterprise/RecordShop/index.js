import React, { PureComponent } from 'react';
import { Input, Table, Button, DatePicker, Radio } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';
/**
 * 模块：交易中心
 * 页面：商家提现记录
 * @author：lisimeng
 */
// 日期
const { RangePicker } = DatePicker;
function onChange(date, dateString) {
  console.log(date, dateString);
}
// 表格
const columns = [
  {
    title: '商家名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '银行名',
    dataIndex: 'bank',
    key: 'bank',
  },
  {
    title: '银行账号',
    dataIndex: 'card',
    key: 'card',
  },
  {
    title: '提现金额',
    dataIndex: 'money',
    key: 'money',
  },
  {
    title: '提现时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '提现状态',
    dataIndex: 'status',
    key: 'status',
  },
];
const data = [
  {
    key: '1',
    bank: '中国建设银行',
    name: '陈火锅（沈阳天地店）',
    card: '2019-02-14 12:30',
    money: '￥120',
    time: '4548612248865',
    status: '成功',
  },
  {
    key: '2',
    bank: '中国建设银行',
    name: '海底捞（中街店）',
    card: '2019-02-14 12:30',
    money: '￥160',
    time: '9548612288865',
    status: '驳回',
  },
  {
    key: '3',
    bank: '中国建设银行',
    name: '海底捞（中街店）',
    card: '2019-02-14 12:30',
    money: '￥160',
    time: '9548612288865',
    status: '成功',
  },
  {
    key: '4',
    bank: '中国建设银行',
    name: '海底捞（中街店）',
    card: '2019-02-14 12:30',
    money: '￥120',
    time: '4548612248865',
    status: '驳回',
  },
  {
    key: '5',
    bank: '中国建设银行',
    name: '海底捞（中街店）',
    card: '2019-02-14 12:30',
    money: '￥120',
    time: '4548612248865',
    status: '成功',
  },
  {
    key: '6',
    bank: '中国建设银行',
    name: '海底捞（中街店）',
    card: '2019-02-14 12:30',
    money: '￥120',
    time: '4548612248865',
    status: '成功',
  },
  {
    key: '7',
    bank: '中国建设银行',
    name: '海底捞（中街店）',
    card: '2019-02-14 12:30',
    money: '￥120',
    time: '4548612248865',
    status: '成功',
  },
  {
    key: '8',
    bank: '中国建设银行',
    name: '海底捞（中街店）',
    card: '2019-02-14 12:30',
    money: '￥120',
    time: '4548612248865',
    status: '成功',
  },
];
export default class Transaction extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        content={
          <div>
            <div className={styles.top}>
              <div className={styles.dateView}>
                <RangePicker style={{ width: 330 }} onChange={onChange} />
              </div>
              <div className={styles.input}>
                <Input placeholder="商家名" />
              </div>
              <div className={styles.status}>
                <Radio.Group defaultValue="a" buttonStyle="solid">
                  <Radio.Button value="a">待审核</Radio.Button>
                  <Radio.Button value="b">全部</Radio.Button>
                </Radio.Group>
              </div>
              <div className={styles.button}>
                <Button>查找</Button>
              </div>
            </div>
            <div className={styles.content}>
              {/* 表格插件 */}
              <div className={styles.tableView}>
                <Table columns={columns} dataSource={data} />
              </div>
            </div>
          </div>
        }
      />
    );
  }
}
