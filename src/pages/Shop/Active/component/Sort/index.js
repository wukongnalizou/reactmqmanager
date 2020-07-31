import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import { getData } from '@/utils/localData';
import styles from './index.less';
/**
 * 模块：活动
 * 页面：活动
 * 组件：表格组件
 * modifyDate:2019-08-02
 * author：songshuyu
 */
@connect(({ active }) => ({
  activeList: active.activeList, // 活动列表
  total: active.total, // 数据总条数
}))
class TableView extends Component {
  state = {
    createTime: new Date().getTime(),
    pageNum: 0,
    currentStatus: '1',
  };

  componentDidMount() {
    this.props.onRef(this);
    this.getSellerList(this.props.status, 1);
    // eslint-disable-next-line
    this.state.currentStatus = this.props.status;
  }
  // componentDidUpdate(prevProps) {
  //   console.log('prevProps',prevProps)
  //   if (this.props.status !== prevProps.status) {
  //     this.getSellerList(this.props.status, 1);
  //     // eslint-disable-next-line
  //     this.state.currentStatus = this.props.status;
  //   }
  // }

  /**
   * 获取商家列表
   */
  getSellerList(status, pageNum) {
    const { dispatch, activeList } = this.props;
    const sellerId = this.props.SellerId;
    // eslint-disable-next-line
    this.state.createTime = activeList[activeList.length - 1]
      ? activeList[activeList.length - 1].createtIme
      : this.state.createTime;
    dispatch({
      type: 'active/fetchDisplayActivityBySeller',
      payload: {
        dateTime: this.state.createTime,
        pageNum,
        pageSize: 9,
        param: {
          sellerId,
          status,
        },
      },
    });
  }

  /**
   * 下一页
   */
  nextPageClick(e) {
    this.getSellerList(this.state.currentStatus, e);
  }

  /**
   * 查看详情
   */
  lookDetailClick = e => {
    router.push(`/shop/overShop/active/ActivityDetails?id=${e}&&SellerId=${this.props.SellerId}`);
  };

  render() {
    const { activeList, total } = this.props;
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
        title: '参与人数',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: '状态',
        key: 'subStatus',
        dataIndex: 'subStatus',
        // render: (text, record) => {
        //   return (
        //     <span>
        //       {record.subStatus === 0 ? '未发起' :
        //         record.subStatus === 1 ? '发起中' :
        //           record.subStatus === 2 ? '同意' :
        //             record.subStatus === 3 ? '驳回' :
        //               ''}
        //       {/* 4-6字段含义后端未提供 */}
        //     </span>)
        // }
      },
      {
        //   title: '解散',
        //   key: 'tags',
        //   dataIndex: 'tags',
        //   render: () =><Button type="danger">申请解散</Button>
      },
      {
        title: '操作',
        key: 'action',
        render: e => {
          return (
            <Button type="primary" onClick={() => this.lookDetailClick(e.id)}>
              详情
            </Button>
          );
        },
      },
    ];
    return (
      <div className={styles.table}>
        <Table
          columns={columns}
          dataSource={activeList.list}
          pagination={{
            defaultPageSize: 9,
            disabled: false,
            total,
            onChange: e => {
              this.nextPageClick(e);
            },
          }}
        />
      </div>
    );
  }
}
export default TableView;
