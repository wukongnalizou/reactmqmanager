import React, { Component } from 'react';
import { Table, Button, Radio, Popconfirm } from 'antd';
import { connect } from 'dva';

/**
 * 模块：用户中心
 * 页面：用户中心
 * 组件：表格
 */

const RadioGroup = Radio.Group;
@connect(({ userBack }) => ({
  userList: userBack.userList, // 用户列表
  total: userBack.total, // 用户总数
}))
export default class TableView extends Component {
  state = {
    createTime: new Date().getTime(),
    pageNum: 1,
    columns: [
      { title: '用户名', width: 100, dataIndex: 'username', key: 'name', fixed: 'left' },
      { title: '性别', width: 100, dataIndex: 'sexShow', key: 'sex', fixed: 'left' },
      { title: '姓名', dataIndex: 'name', key: 'name' },
      { title: '昵称', dataIndex: 'nickname', key: 'nickname' },
      { title: '生日', dataIndex: 'birthdayShow', key: 'birthdayShow' },
      { title: '电话', dataIndex: 'telNumber', key: 'telNumber' },
      { title: '身份证号', dataIndex: 'idnum', key: 'idnum' },
      {
        title: '操作',
        dataIndex: 'lock',
        key: 'lock',
        render: (e, task) => (
          <Popconfirm
            title="确定执行此操作吗?"
            onConfirm={e => {
              this.isLock(e, task);
            }}
            okText="是"
            cancelText="否"
          >
            <Button type={task.isUnlocked ? 'primary' : 'danger'}>
              {task.isUnlocked ? '锁定' : '解锁'}
            </Button>
          </Popconfirm>
        ),
      },
    ],
  };

  componentDidMount() {
    this.getUserList(1);
  }

  // 查询用户列表
  getUserList(pageNum) {
    const { dispatch } = this.props;
    dispatch({
      type: 'userBack/fetchSelUserAll',
      payload: {
        dateTime: this.state.createTime,
        pageNum,
        pageSize: 9,
        param: {
          queryType: 2,
          queryValue: '',
        },
      },
    });
  }

  // 获取下一页
  nextPageClick(e) {
    this.getUserList(e);
    this.setState({
      pageNum: e,
    });
  }

  // 用户锁定解锁
  isLock(e, task) {
    const { dispatch } = this.props;
    const { pageNum } = this.state;
    // 锁定用户
    if (task.isUnlocked) {
      dispatch({
        type: 'userBack/fetchLockUser',
        payload: {
          userId: task.userId,
        },
      }).then(() => {
        // location.reload([true]);
        this.getUserList(pageNum);
      });
    } else {
      // 解锁用户
      dispatch({
        type: 'userBack/fetchUnlockUser',
        payload: {
          userId: task.userId,
        },
      }).then(() => {
        // window.location.reload([true]);
        this.getUserList(pageNum);
      });
    }
  }

  render() {
    const { total, userList } = this.props;
    return (
      <div>
        <Table
          columns={this.state.columns}
          dataSource={userList}
          scroll={{ x: 1300 }}
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
