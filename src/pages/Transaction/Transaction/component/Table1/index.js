import React, { PureComponent } from 'react';
import { Table, Button } from 'antd';
import Link from 'umi/link';
/**
 * 模块：交易中心
 * 组件：表格：商家交易订单、用户支付订单
 */
const columns = [
  {
    title: '商户名',
    dataIndex: 'name',
    key: 'name',
  },
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
    title: '流水号',
    dataIndex: 'serial',
    key: 'serial',
  },
  {
    title: '交易状态',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: '订单金额（元）',
    dataIndex: 'money',
    key: 'money',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Link to="/details/exchangeDetails">
        <Button type="primary">详情</Button>
      </Link>
    ),
  },
];
const data = [
  {
    key: '1',
    name: '呦呦饭',
    date: '2019-02-14 12:30',
    money: '￥120',
    number: '4548612248865',
    serial: '584665',
    state: '未打款',
  },
  {
    key: '2',
    name: '呦呦饭',
    date: '2019-02-14 12:30',
    money: '￥160',
    number: '9548612288865',
    serial: '584565',
    state: '已打款',
  },
  {
    key: '3',
    name: '呦呦饭',
    date: '2019-02-14 12:30',
    money: '￥160',
    number: '9548612288865',
    serial: '512565',
    state: '已打款',
  },
  {
    key: '4',
    name: '呦呦饭',
    date: '2019-02-14 12:30',
    money: '￥120',
    number: '4548612248865',
    serial: '784565',
    state: '未打款',
  },
  {
    key: '5',
    name: '呦呦饭',
    date: '2019-02-14 12:30',
    money: '￥120',
    number: '4548612248865',
    serial: '584565',
    state: '未打款',
  },
  {
    key: '6',
    name: '呦呦饭',
    date: '2019-02-14 12:30',
    money: '￥120',
    number: '4548612248865',
    serial: '584265',
    state: '未打款',
  },
  {
    key: '7',
    name: '呦呦饭',
    date: '2019-02-14 12:30',
    money: '￥120',
    number: '4548612248865',
    serial: '884565',
    state: '未打款',
  },
  {
    key: '8',
    name: '呦呦饭',
    date: '2019-02-14 12:30',
    money: '￥120',
    number: '4548612248865',
    serial: '536565',
    state: '未打款',
  },
];
export default class TableView extends PureComponent {
  render() {
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}
