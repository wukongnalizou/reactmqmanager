import React, { Component } from 'react';
import moment from 'moment';
import { Input, Menu, Dropdown, Button, Tag, Table, Popconfirm } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import ModalView from './component/Modal';
import styles from './index.less';
/**
 * 模块：分类服务
 * 页面：分类管理
 * @author：zhaoyijn
 */
const { Search } = Input;
const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        内容一
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        内容二
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        内容三
      </a>
    </Menu.Item>
  </Menu>
);
@connect(({ serve }) => ({
  total: serve.total, // 数据总条数
  serveListData: serve.serveListData, // 一级分类数据
  ServeCateData: serve.ServeCateData, // 二级分类数据
  lastServeCateData: serve.lastServeCateData, // 三级分类数据
}))
class Classification extends Component {
  state = {
    pageSize: 100, // 每页条数
    pageNum: 1, // 当前页
    name: null,
    code: null,
    key: [], // 展开行的key
    lastKey: [], // 商品分类第二级展开行的key
    mainId: '', // 主任务id
    childColumns: [
      { title: '名称', dataIndex: 'name', key: 'name' },
      // { title: '编码', dataIndex: 'code', key: 'code' },
      // { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
      // { title: '修改时间', dataIndex: 'modificationTime', key: 'modificationTime' },
      // { title: '缩略图',  key: 'thumbnail' , render: () => <a href="javascript:;">< img src={leader} /></a> },
      // { title: '标签', key: 'createdAt', render: () => <a href="javascript:;"><Tag color="blue">英雄联盟</Tag><Tag color="blue">英雄联盟</Tag></a> },
      {
        title: '编辑',
        key: 'edit',
        render: (text, record) => (
          <Button type="primary" onClick={() => this.edit(record.id)}>
            编辑
          </Button>
        ),
      },
      {
        title: '删除',
        key: 'delete',
        render: (text, record) => (
          <Popconfirm
            title="确定要删除该分类吗?"
            onConfirm={() => this.delete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary">删除</Button>
          </Popconfirm>
        ),
      },
    ],
    // visible: false,
    // isEdit: false, // 是否是修改
  };

  componentDidMount() {
    // this.getServeCateList() // 获取二级类目
    this.getServeList(); // 获取类别管理列表 (一级类目)
  }

  /**
   * 获取类别管理列表 (一级类目)
   */
  getServeList = () => {
    const { dispatch } = this.props;
    const { pageNum, pageSize, name, code } = this.state;
    dispatch({
      type: 'serve/getServeList',
      payload: {
        pageNum,
        pageSize,
        param: {
          name,
          code,
        },
      },
    });
  };

  /**
   * 获取二级类目
   */
  // getServeCateList = () => {
  //   const { dispatch } = this.props
  //   const { pageNum, pageSize, name, code } = this.state
  //   dispatch({
  //     type: 'serve/getServeCateList',
  //     payload: {
  //       pageNum,
  //       pageSize,
  //       param: {
  //         // name,
  //         // code,
  //       }
  //     }
  //   })
  // }
  /**
   * 每行子表格
   */
  expandedRowRender = e => {
    const { ServeCateData } = this.props;
    const { childColumns, lastKey } = this.state;
    return (
      <Table
        columns={childColumns}
        dataSource={ServeCateData}
        expandedRowRender={e.code === 'goods' ? this.lastExpandedRowRender : false}
        expandedRowKeys={lastKey}
        onExpand={(expanded, record) => {
          this.lastExpandClick(expanded, record);
        }}
        pagination={false}
      />
    );
  };

  lastExpandedRowRender = () => {
    const { lastServeCateData } = this.props;
    const { childColumns } = this.state;
    return <Table columns={childColumns} dataSource={lastServeCateData} pagination={false} />;
  };

  /**
   * 展开/关闭子任务
   */
  expandClick(expanded, record) {
    const { dispatch } = this.props;
    const { pageNum, pageSize } = this.state;
    this.state.mainId = record.id;
    this.setState({
      key: expanded === true ? [record.key] : [''],
      mainId: record.id,
    });
    if (expanded === true) {
      dispatch({
        type: 'serve/getServeCateList',
        payload: {
          code: record.code,
          // parentId: record.id,
          parentId: '-1',
        },
      });
    }
  }

  /**
   * 商品分类二级展开/关闭子任务
   */
  lastExpandClick(expanded, record) {
    console.log('record', record);
    const { dispatch } = this.props;
    const { pageNum, pageSize } = this.state;
    this.state.mainId = record.id;
    this.setState({
      lastKey: expanded === true ? [record.key] : [''],
      mainId: record.id,
    });
    if (expanded === true) {
      dispatch({
        type: 'serve/lastGetServeCateList',
        payload: {
          code: record.code,
          parentId: record.id,
          // parentId: '-1',
          // pageNum,
          // pageSize,
          // param: {
          //   typeCode: record.code,
          // }
        },
      });
    }
  }

  /**
   * 删除分类
   */
  delete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'serve/deleteServeCate',
      payload: { id },
    }).then(() => {
      this.setState({
        key: [''],
      });
    });
  };

  /**
   * 修改商圈
   */
  onRef = ref => {
    this.child = ref;
  };

  edit = e => {
    this.child.editChild(e);
    // this.props.MakeMoney()
  };

  render() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '编码',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text, record) => {
          return <span>{moment(record.createTime).format('YYYY-MM-DD:hh:mm')}</span>;
        },
      },
      {
        title: '修改时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        render: (text, record) => {
          return <span>{moment(record.updateTime).format('YYYY-MM-DD:hh:mm')}</span>;
        },
      },
      // { title: '缩略图', key: 'name', render: () => <a href="javascript:;">< img src={leader} /></a> },
      // { title: '标签', dataIndex: 'tag', key: 'tag', render: () => <a href="javascript:;"><Tag color="blue">英雄联盟</Tag><Tag color="blue">英雄联盟</Tag></a> },
      // { title: '编辑', dataIndex: 'edit', key: 'edit', render: () => (<span className="table-operation"><a href="javascript:;">编辑</a></span>) },
      // { title: '删除', dataIndex: 'delete', key: 'delete', render: () => (<span className="table-operation"><a href="javascript:;">删除</a></span>) },
    ];
    const { serveListData } = this.props;
    const { key } = this.state;
    return (
      <PageHeaderWrapper
        content={
          <div>
            <div className={styles.top}>
              {/* <Dropdown className={styles.dropdown} overlay={menu} placement="bottomRight">
            <Button>下拉选内容</Button>
          </Dropdown> */}
              {/* 搜索插件 */}
              {/* <div className={styles.searchView}>
            <Search
              placeholder="请输入搜索内容"
              onSearch={value => console.log(value)}
              enterButton
            />
          </div> */}
            </div>
            <ModalView onRef={this.onRef} />
            <Table
              columns={columns}
              dataSource={serveListData}
              expandedRowRender={this.expandedRowRender}
              expandRowByClick
              expandedRowKeys={key}
              onExpand={(expanded, record) => {
                this.expandClick(expanded, record);
              }}
              // pagination={{
              //   defaultPageSize : 10,
              //   disabled : false,
              //   total : total,
              //   onChange : (e)=>{this.nextPageClick(e)}
              // }}
            />
          </div>
        }
      />
    );
  }
}
export default Classification;
