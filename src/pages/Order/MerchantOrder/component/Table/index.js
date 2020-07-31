import React, { PureComponent } from 'react';
import { Table, Tag, Button } from 'antd';
import Link from 'umi/link';
/**
 * 模块：订单中心
 * 组件：表格
 */
const columns = [
  {
    title: '商家名称',
    dataIndex: 'name',
    key: 'name',
    // eslint-disable-next-line no-script-url
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: '活动时间',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '消费金额',
    dataIndex: 'money',
    key: 'money',
  },
  {
    title: '参与人数',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </span>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Link to="/order/orderDetail">
        <div>
          <Button type="primary">查看详情 </Button>
        </div>
      </Link>
    ),
  },
];

const data = [
  {
    key: '1',
    name: '时尚火锅',
    date: '2019-02-11',
    money: '￥500',
    number: '4人',
    tags: ['失恋联盟', '漫威粉'],
  },
  {
    key: '2',
    name: '李小叶炸鸡',
    date: '2019-02-14',
    money: '￥120',
    number: '4人',
    tags: ['loser'],
  },
  {
    key: '3',
    name: '长城小吃',
    date: '2019-02-15',
    money: '￥3000',
    number: '4人',
    tags: ['葬爱家族', '杀马特'],
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
