import React, { PureComponent } from 'react';
import { Table, Divider, Tag } from 'antd';
/**
 * 模块：客服中心
 * 页面：在线客服
 * 组件：表格
 */
const columns = [
  {
    title: '排号',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '用户',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '呼叫时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '状态',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => (
          <Tag color="red" key={tag}>
            {tag}
          </Tag>
        ))}
      </span>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">实时接入</a>
        <Divider type="vertical" />
        <a href="javascript:;">挂断</a>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    number: '1号',
    name: '李易峰',
    time: '2019/02/02 12:30',
    tags: ['排队中'],
  },
  {
    key: '2',
    number: '2号',
    name: 'Jim Green',
    age: 42,
    time: '2019/02/02 12:30',
    tags: ['呼叫中'],
  },
  {
    key: '3',
    number: '3号',
    name: 'Joe Black',
    age: 32,
    time: '2019/02/02 12:30',
    tags: ['排队中'],
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
