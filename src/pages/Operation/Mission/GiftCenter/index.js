import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// 创建组件
import GiftCreateView from './component/GiftCreate';
import leader from '@/assets/global/leader.png';
/**
 * 模块：运营中心
 * 页面：任务中心-任务奖励
 * @author：lisimeng
 */

// 表格列
const columns = [
  {
    //     title: '奖品图片',
    //     dataIndex: 'picture',
    //     key: 'picture',
    //     render: () => <img src={leader} />,
    // }, {
    title: '奖品名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '库存',
    dataIndex: 'inventory',
    key: 'inventory',
  },
  {
    title: '接口地址',
    dataIndex: 'api',
    key: 'api',
  },
  {
    title: '参数变量名',
    dataIndex: 'param',
    key: 'param',
  },
  {
    title: '服务名',
    dataIndex: 'serviceName',
    key: 'serviceName',
  },
  {
    title: '修改',
    dataIndex: 'modify',
    key: 'modify',
    render: () => <Button type="primary">修改</Button>,
  },
  {
    title: '下架',
    dataIndex: 'lowershelf',
    key: 'lowershelf',
    render: () => <Button type="primary">下架</Button>,
  },
];
@connect(({ task }) => ({
  giftList: task.giftList, // 礼品列表
}))
export default class GiftCenter extends Component {
  componentDidMount() {
    const { dispatch, resetChildTask, giftList } = this.props;
    // 查询礼品列表
    dispatch({
      type: 'task/fetchFindAssignmentGiftServerList',
      payload: {},
    });
  }

  render() {
    const { giftList } = this.props;
    return (
      <PageHeaderWrapper
        content={
          <div>
            <div>
              {/* 创建奖品 */}
              <GiftCreateView />
            </div>
            {/* 表格 */}
            <div>
              <Table columns={columns} dataSource={giftList} />
            </div>
          </div>
        }
      />
    );
  }
}
