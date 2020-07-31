import React, { PureComponent } from 'react';
import { Table, Tag, Button } from 'antd';
import Link from 'umi/link';
import styles from './index.less';
/**
 * 模块：活动
 * 页面：活动
 * 组件：表格组件
 */
const columns = [
  {
    title: '创建时间',
    dataIndex: 'createtime',
    key: 'createtime',
  },
  {
    title: '开始时间',
    dataIndex: 'starttime',
    key: 'starttime',
  },
  {
    title: '预付款金额',
    dataIndex: 'money',
    key: 'money',
  },
  { title: '参与人数', dataIndex: 'number', key: 'number' },
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
    title: '解散',
    key: 'tags',
    dataIndex: 'tags',
    render: () => <Button type="danger">申请解散</Button>,
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Link to="/details/activityDetails">
        <Button type="primary">详情</Button>
      </Link>
    ),
  },
];
const data = [
  {
    key: '1',
    createtime: '2019-02-14 11:30',
    starttime: '2019-02-14 12:30',
    money: '￥120',
    number: '4人',
    tags: ['loser'],
  },
  {
    key: '2',
    createtime: '2019-02-14 11:30',
    starttime: '2019-02-14 12:30',
    money: '￥3000',
    number: '4人',
    tags: ['葬爱家族', '杀马特'],
  },
  {
    key: '3',
    createtime: '2019-02-14 11:30',
    starttime: '2019-02-14 12:30',
    money: '￥3000',
    number: '4人',
    tags: ['葬爱家族', '杀马特'],
  },
  {
    key: '2',
    createtime: '2019-02-14 11:30',
    starttime: '2019-02-14 12:30',
    money: '￥3000',
    number: '4人',
    tags: ['葬爱家族', '杀马特'],
  },
  {
    key: '4',
    createtime: '2019-02-14 11:30',
    starttime: '2019-02-14 12:30',
    money: '￥3000',
    number: '4人',
    tags: ['葬爱家族', '杀马特'],
  },
  {
    key: '5',
    createtime: '2019-02-14 11:30',
    starttime: '2019-02-14 12:30',
    money: '￥3000',
    number: '4人',
    tags: ['葬爱家族', '杀马特'],
  },
  {
    key: '6',
    createtime: '2019-02-14 11:30',
    starttime: '2019-02-14 12:30',
    money: '￥3000',
    number: '4人',
    tags: ['葬爱家族', '杀马特'],
  },
  {
    key: '7',
    createtime: '2019-02-14 11:30',
    starttime: '2019-02-14 12:30',
    money: '￥3000',
    number: '4人',
    tags: ['葬爱家族', '杀马特'],
  },
];
export default class TableView extends PureComponent {
  render() {
    return (
      <div className={styles.table}>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}
