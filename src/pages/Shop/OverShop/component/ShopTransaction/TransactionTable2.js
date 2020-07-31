import React, { PureComponent } from 'react';
import { Table } from 'antd';
import DrawerView from './Drawer';

/**
 * 模块：交易中心
 * 页面：交易中心
 * 组件：第一行组件、表格
 */

const columns = [
  {
    title: '交易时间',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '订单号 ',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '交易状态',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: '订单总金额（元）',
    dataIndex: 'money',
    key: 'money',
  },
  {
    title: '退款金额（元）',
    dataIndex: 'refund',
    key: 'refund',
  },
  {
    title: '实扣金额（元）',
    dataIndex: 'actual',
    key: 'actual',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => <DrawerView />,
  },
];

const data = [
  {
    key: '1',
    date: '2019-02-14 12:30',
    money: '￥150',
    number: '4548612248865',
    state: '未打款',
    refund: '￥20',
    actual: '￥100',
  },
  {
    key: '2',
    date: '2019-02-14 12:30',
    money: '￥160',
    number: '9548612288865',
    state: '已打款',
    refund: '￥20',
    actual: '￥100',
  },
  {
    key: '3',
    date: '2019-02-14 12:30',
    money: '￥160',
    number: '9548612288865',
    state: '已打款',
    refund: '￥20',
    actual: '￥100',
  },
  {
    key: '4',
    date: '2019-02-14 12:30',
    money: '￥120',
    number: '4548612248865',
    state: '未打款',
    refund: '￥20',
    actual: '￥100',
  },
  {
    key: '5',
    date: '2019-02-14 12:30',
    money: '￥120',
    number: '4548612248865',
    state: '未打款',
    refund: '￥20',
    actual: '￥100',
  },
  {
    key: '6',
    date: '2019-02-14 12:30',
    money: '￥120',
    number: '4548612248865',
    state: '抵押中',
    refund: '￥20',
    actual: '￥100',
  },
  {
    key: '7',
    date: '2019-02-14 12:30',
    money: '￥120',
    number: '4548612248865',
    state: '未打款',
    refund: '￥20',
    actual: '￥100',
  },
  {
    key: '8',
    date: '2019-02-14 12:30',
    money: '￥120',
    number: '4548612248865',
    state: '未打款',
    refund: '￥20',
    actual: '￥100',
  },
];

export default class TransactionTable2 extends PureComponent {
  render() {
    return (
      <div>
        {/* 表格组件 */}
        <div style={{ marginTop: 20 }}>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    );
  }
}
