import React, { Component } from 'react';
import { Table, Button, Popconfirm, Cascader } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
// 创建组件
import BusinessCreatView from './component/BusinessCreate';
import styles from './index.less';
/**
 * 模块：基础配置
 * 页面：商圈管理
 * author：lisimeng songshuyu
 */
@connect(({ configuration, loading }) => ({
  circlesListData: configuration.circlesListData,
  total: configuration.total, // 数据总条数
  categoryData: configuration.categoryData, // 省市区数据
  // loginGoods: loading.effects['storeReview/addGoods'] || loading.effects['storeReview/updateGoods'],
}))
export default class BusinessDistrict extends Component {
  state = {
    pageSize: 10, // 每页条数
    pageNum: 1, // 当前页
    beginTime: null, // 开始时间
    endTime: null, // 结束时间
    province: null, // 省
    city: null, // 市
    area: null, // 区
  };

  // 初始化
  componentDidMount() {
    this.getCirclesList(); // 获取商圈管理列表
  }

  /**
   * 获取商圈管理列表
   */
  getCirclesList = () => {
    const { dispatch } = this.props;
    const { pageNum, pageSize, province, city, area } = this.state;
    dispatch({
      type: 'configuration/getCirclesList',
      payload: {
        pageNum,
        pageSize,
        param: {
          province,
          city,
          area,
        },
      },
    });
  };

  /**
   * 分页变化
   */
  pageChange = page => {
    this.setState(
      {
        pageNum: page,
      },
      () => {
        this.getCirclesList();
      },
    );
  };

  /**
   * 修改商圈
   */
  edit = id => {
    console.log('id', id);
    const { dispatch } = this.props;
    dispatch({
      type: 'configuration/changeVisible',
      payload: true,
    });
  };

  /**
   * 删除商圈
   */
  delete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'configuration/deleteCircles',
      payload: { id },
    }).then(() => {
      this.getCirclesList(); // 获取商圈管理列表
    });
  };

  /**
   * 筛选
   */
  CascaderOnChange = e => {
    this.setState(
      {
        province: e[0],
        city: e[1],
        area: e[2],
      },
      () => {
        this.getCirclesList(); // 获取商圈管理列表
      },
    );
  };

  onRef = ref => {
    this.child = ref;
  };

  edit = e => {
    this.child.editChild(e);
  };

  render() {
    const { circlesListData, total, categoryData } = this.props;
    const { pageSize, pageNum } = this.state;
    // 表格列
    const columns = [
      {
        title: '商圈名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '是否热门',
        dataIndex: 'isHot',
        key: 'isHot',
        render: (text, record) => {
          return <span>{text === true ? '是' : '否'}</span>;
        },
      },
      {
        title: '修改',
        dataIndex: 'modify',
        key: 'modify',
        render: (text, record) => {
          console.log('record', record);
          return (
            <Button type="primary" onClick={() => this.edit(record.id)}>
              修改
            </Button>
          );
          // onClick={()=>this.edit(record.id)}
        },
      },
      {
        title: '删除',
        dataIndex: 'lowershelf',
        key: 'lowershelf',
        render: (text, record) => {
          return (
            <Popconfirm
              title="确定要删除该商圈吗?"
              onConfirm={() => this.delete(record.id)}
              // onCancel={this.cancel}
              okText="确定"
              cancelText="取消"
            >
              <Button type="primary">删除</Button>
            </Popconfirm>
          );
        },
      },
      // {
      //     title: '切换是否热门',
      //     dataIndex: 'lowershelf',
      //     key: 'lowershelf',
      //     render: () => <Button type="primary">切换</Button>
      // },
    ];
    const pagination = {
      pageSize,
      current: pageNum,
      onChange: pageNum => {
        this.pageChange(pageNum);
      },
      total,
    };
    return (
      <PageHeaderWrapper
        content={
          <div>
            <div className={styles.creat}>
              {/* 创建商圈 */}
              <BusinessCreatView onRef={this.onRef} />
            </div>
            <div className={styles.area}>
              {/* 地区选框插件 */}
              {/* <AreaView /> */}
              <Cascader
                className={styles.cascader}
                options={categoryData}
                onChange={this.CascaderOnChange}
                placeholder="省/市/区"
              />
            </div>
            <div>
              {/* 表格 */}
              <Table columns={columns} dataSource={circlesListData} pagination={pagination} />
            </div>
          </div>
        }
      />
    );
  }
}
