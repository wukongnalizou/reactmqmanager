import React, { Component } from 'react';
// 表格组件
import { Table, Modal, Button, Input, Form, Popconfirm } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './index.less';
/**
 * 模块：分类服务
 * 页面：类别管理
 * 组件：表格
 * author: songshuyu
 */
@connect(({ serve }) => ({
  serveListData: serve.serveListData,
  total: serve.total, // 数据总条数
  serveStatus: serve.serveStatus, // 控制提交是否成功
  ServeInfoData: serve.ServeInfoData, // 获取一个类别的详细信息，回填（类别管理）
}))
@Form.create()
export default class TableView extends Component {
  state = {
    pageSize: 15, // 每页条数
    pageNum: 1, // 当前页
    name: null,
    code: null,
    visible: false,
    isEdit: false, // 是否是修改
  };

  /**
   * 初始化
   */
  componentDidMount() {
    this.getServeList(); // 获取类别管理列表
  }

  /**
   * 获取类别管理列表
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
   * 分页变化
   */
  pageChange = page => {
    this.setState(
      {
        pageNum: page,
      },
      () => {
        this.getServeList(); // 获取类别管理列表
      },
    );
  };

  showModal = () => {
    this.props.form.resetFields();
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    const { form, dispatch } = this.props;
    const { isEdit, id } = this.state;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const data = values;
      if (!err) {
        const type = isEdit === true ? 'serve/serveEditSubmit' : 'serve/serveSubmit';
        if (isEdit === true) {
          Object.assign(data, { id });
        }
        dispatch({
          type,
          payload: data,
        }).then(() => {
          const { serveStatus } = this.props;
          if (serveStatus) {
            this.setState({
              visible: false,
            });
            this.getServeList(); // 获取类别管理列表
          }
        });
      }
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  /**
   * 删除类别
   */
  delete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'serve/deleteServe',
      payload: { id },
    }).then(() => {
      this.getServeList(); // 获取类别管理列表
    });
  };

  /**
   * 编辑类别
   */
  edit = id => {
    this.setState({
      visible: true,
      id,
    });
    const { dispatch, form } = this.props;
    dispatch({
      type: 'serve/getServeInfo',
      payload: { id },
    }).then(() => {
      const { ServeInfoData } = this.props;
      this.setState({
        isEdit: true,
      });
      form.setFieldsValue({
        name: ServeInfoData.name,
        code: ServeInfoData.code,
      });
    });
  };

  render() {
    const {
        serveListData,
        total,
        form: { getFieldDecorator },
      } = this.props;
      const { pageSize, pageNum } = this.state;
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
          dataIndex: 'creatTime',
          key: 'creatTime',
          render: (text, record) => <span>{moment(record.createTime).format('YYYY-MM-DD:hh:mm')}</span>,
        },
        {
          title: '修改时间',
          key: 'updateTime',
          dataIndex: 'updateTime',
          render: (text, record) => <span>{moment(record.updateTime).format('YYYY-MM-DD:hh:mm')}</span>,
        },
        {
          title: '编辑',
          key: 'edit',
          render: (text, record) => (
            <span>
              <Button type="primary" onClick={() => this.edit(record.id)}>
                编辑
              </Button>
            </span>
          ),
        },
        {
          title: '删除',
          key: 'delete',
          render: (text, record) => (
            <span>
              <Popconfirm
                title="确定要删除该分类吗?"
                onConfirm={() => this.delete(record.id)}
                okText="确定"
                cancelText="取消"
              >
                <Button type="primary">删除</Button>
              </Popconfirm>
            </span>
          ),
        },
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
      <div>
        <Button type="primary" onClick={this.showModal}>
          添加
        </Button>
        <Modal visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form hideRequiredMark>
            <p className={styles.text}>名称</p>
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '输入名称' }],
              })(<Input autoComplete="off" placeholder="输入名称" />)}
            </Form.Item>
            <p className={styles.text}>编码号</p>
            <Form.Item>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '输入编码号' }],
              })(<Input autoComplete="off" placeholder="输入编码号" />)}
            </Form.Item>
          </Form>
        </Modal>
        <Table columns={columns} dataSource={serveListData} pagination={pagination} />
      </div>
    );
  }
}
