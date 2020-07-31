import React, { Component } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import leader from '@/assets/global/leader.png';
/**
 * 模块：运营中心
 * 页面：积分商城
 * 组件：表格
 */
@connect(({ task }) => ({
  taskList: task.taskList, // 任务列表
  total: task.total, // 任务总条数
  childList: task.childList, // 子任务列表
  resetChildTask: task.resetChildTask, // 要修改的子任务
}))
class TaskTableView extends Component {
  state = {
    createTime: new Date().getTime(),
    pageNum: 0,
    mainId: '', // 主任务id
    key: [''], // 展开行的key
    isExpend: false, // 是否展开
    isExpandRowByClick: false, // 是否通过点击展开子任务
    columns: [
      {
        title: '任务名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '任务描述',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: '任务类型',
        dataIndex: 'taskTypeName',
        key: 'taskTypeName',
      },
      {
        title: '任务模式',
        dataIndex: 'taskPatternName',
        key: 'taskPatternName',
      },
      {
        title: '任务奖励',
        dataIndex: 'giftNum',
        key: 'giftNum',
      },
      {
        title: '修改',
        dataIndex: 'modify',
        key: 'modify',
        render: (e, task) => {
          return (
            <Button
              type="primary"
              onClick={e => {
                this.updateClick(e, task.id);
              }}
            >
              修改
            </Button>
          );
        },
      },
      {
        title: '删除',
        dataIndex: 'lowershelf',
        key: 'lowershelf',
        render: (e, task) => (
          <Popconfirm
            title="确定执行此操作吗?"
            onConfirm={e => {
              this.deleteTask(e, task.id, 'main', task.pattern);
            }}
            okText="是"
            cancelText="否"
          >
            <Button type="primary">删除</Button>
          </Popconfirm>
        ),
      },
    ],
    childColumns: [
      {
        title: '任务名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '任务描述',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: '任务类型',
        dataIndex: 'taskTypeName',
        key: 'taskTypeName',
      },
      {
        title: '任务模式',
        dataIndex: 'taskPatternName',
        key: 'taskPatternName',
      },
      {
        title: '任务奖励',
        dataIndex: 'giftNum',
        key: 'giftNum',
      },
      {
        title: '修改',
        dataIndex: 'modify',
        key: 'modify',
        render: (e, childTask) => {
          return (
            <Button
              type="primary"
              onClick={e => {
                this.updateChildClick(e, childTask);
              }}
            >
              修改
            </Button>
          );
        },
      },
    ],
  };

  componentDidMount() {
    setTimeout(() => {
      this.getTaskList(1);
    }, 500);
  }

  /**
   * 获取任务列表
   */
  getTaskList(pageNum) {
    const { dispatch, taskList } = this.props;
    this.state.createTime = taskList[taskList.length - 1]
      ? taskList[taskList.length - 1].createTime
      : this.state.createTime;
    dispatch({
      type: 'task/fetchFindBackAssignmentMainList',
      payload: {
        dateTime: this.state.createTime,
        pageNum,
        pageSize: 10,
        param: {
          name: '',
        },
      },
    });
  }

  expandedRowRender = e => {
    const { childList } = this.props;
    return <Table columns={this.state.childColumns} dataSource={childList} pagination={false} />;
  };
  /**
   * 展开子任务
   */
  expandClick(expanded, record) {
    const { dispatch } = this.props;
    this.state.mainId = record.id;
    this.setState({
      isExpandRowByClick: expanded,
      key: expanded === true ? [record.key] : [''],
    });
    dispatch({
      type: 'task/fetchFindAssignmentMainAndActionMappingByMainId',
      payload: {
        id: record.id,
      },
    });
  }

  /**
   * 下一页
   */
  nextPageClick(e) {
    this.getTaskList(e);
  }

  /**
   * 修改主任务
   */
  updateClick(e, id) {
    this.expandClick('', id);
    router.push('/operation/mission/taskCenter/createTask?reset=ok&type=main');
  }

  /**
   * 修改子任务
   */
  updateChildClick(e, childTask) {
    const { dispatch, resetChildTask } = this.props;
    dispatch({
      type: 'task/resetChildTask',
      payload: {
        resetChildTask: childTask,
      },
    });
    router.push('/operation/mission/taskCenter/createTask?reset=ok&type=child');
  }

  /**
   * 删除任务
   */
  deleteTask(e, id, name, pattern) {
    const { dispatch } = this.props;
    if (name === 'main') {
      dispatch({
        type: 'task/fetchUpdateAssignmentMain',
        payload: {
          id,
          isDelete: 1,
          pattern,
        },
      }).then(() => {
        setTimeout(() => {
          this.getTaskList(1);
        }, 500);
      });
    }
  }

  render() {
    const { taskList, total } = this.props;
    return (
      <div>
        <Table
          columns={this.state.columns}
          dataSource={taskList}
          expandedRowRender={this.expandedRowRender}
          expandRowByClick={this.state.isExpandRowByClick}
          expandedRowKeys={this.state.key}
          onExpand={(expanded, record) => {
            this.expandClick(expanded, record);
          }}
          pagination={{
            defaultPageSize: 10,
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
export default TaskTableView;
