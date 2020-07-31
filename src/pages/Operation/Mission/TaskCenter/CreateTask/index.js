import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Radio, Alert, Table, Input, Button, Popconfirm, Form, Select } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DropdownView from '../component/Dropdown'; // 下拉选组件
import ChoosingGiftsView from '../component/ChoosingGifts';
import Shareholder from '../component/ShareholderTask';
import styles from './index.less';
/**
 * 模块：运营中心
 * 页面：创建任务
 * @author:zhaoyijin
 * mofifyDate:2019-07-01
 * author:Cin
 */
const RadioGroup = Radio.Group;
const { Option } = Select;
@connect(({ task }) => ({
  giftList: task.giftList, // 礼品列表
  actionList: task.actionList, // 行为列表
  giftId: task.giftId, // 礼品id
  childList: task.childList, // 子任务列表
  mainTask: task.mainTask, // 主任务
  childTaskAdd: task.childTaskAdd, // 添加子任务
  serverCode: task.serverCode, // 主任务行为码
  assignmentActionId: task.assignmentActionId, // 主任务行为id
  resetChildTask: task.resetChildTask, // 修改的子任务
}))
@Form.create()
class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      actionShow: true, // 行为显示
      mainTask: {}, // 主任务
      childTask: [], // 子任务
      count: 0, // 子任务index
      childTaskData: [], // 子任务输入模板
      childShow: false, // 修改子任务显示
      tips: '', // 未填信息提示
    };
  }

  componentDidMount() {
    const { dispatch, resetChildTask } = this.props;
    // 查询礼品列表
    dispatch({
      type: 'task/fetchFindAssignmentGiftServerList',
      payload: {},
    });
    // 查询行为列表
    dispatch({
      type: 'task/fetchFindAssignmentActionListForBack',
      payload: {},
    });
    this.setState({
      mainTask: resetChildTask,
      tips: '',
    });
  }

  aaClick() {
    this.setState({
      isShow: true,
      actionShow: false,
    });
  }

  bbClick() {
    this.setState({
      isShow: false,
      actionShow: true,
    });
  }

  /**
   * 任务名称&描述输入
   */
  taskChange(e, name) {
    if (name === 'name') {
      this.state.mainTask.taskName = e.target.value;
    } else if (name === 'count') {
      this.state.mainTask.serverCount = e.target.value;
    } else if (name === 'giftCount') {
      this.state.mainTask.giftCount = e.target.value;
    } else if (name === 'content') {
      this.state.mainTask.taskContent = e.target.value;
    }
  }

  /**
   * 任务类型&模式
   */
  typeChange(e, name) {
    const { dispatch, giftList, actionList } = this.props;
    // 查询礼品列表
    dispatch({
      type: 'task/fetchFindAssignmentGiftServerList',
      payload: {},
    });
    // 查询行为列表
    dispatch({
      type: 'task/fetchFindAssignmentActionListForBack',
      payload: {},
    });
    if (name === 'type') {
      this.state.mainTask.taskType = e.target.value;
    } else {
      this.state.mainTask.taskPattern = e.target.value;
    }
  }

  /**
   * 添加的子任务数据处理
   */
  childTaskSolve() {
    const { dispatch, childTaskAdd, actionList } = this.props;
    const taskList = childTaskAdd;
    const action = actionList;
    taskList.forEach(task => {
      action.forEach(action => {
        if (action.serverCode === task.serverCode) {
          task.assignmentActionId = action.id;
          task.pattern = this.state.mainTask.taskPattern;
          task.type = this.state.mainTask.taskType;
        }
      });
    });
    dispatch({
      type: 'task/setChildTaskAdd',
      payload: {
        childTaskAdd: taskList,
      },
    });
  }

  /**
   * 主任务信息是否填写完整校验
   */
  isCompleteFunc() {
    const { giftId, serverCode } = this.props;
    const mainTaskArray = ['taskName', 'taskContent', 'taskType', 'taskPattern', 'giftCount'];
    const mainTaskName = ['任务名', '任务描述', '任务类型', '任务模式', '礼品个数'];
    console.log(giftId, serverCode, this.state.mainTask);
    if (!giftId || giftId === '') {
      this.setState({
        tips: '礼品绑定',
      });
      return;
    } else if (
      (!serverCode && this.state.actionShow) ||
      (serverCode === '' && this.state.actionShow)
    ) {
      this.setState({
        tips: '行为绑定',
      });
      return;
    } else if (
      (!this.state.mainTask.serverCount && this.state.actionShow) ||
      (this.state.mainTask.serverCount === '' && this.state.actionShow)
    ) {
      this.setState({
        tips: '行为触发次数',
      });
      return;
    } else {
      for (let i = 0; i < mainTaskArray.length; i++) {
        if (
          this.state.mainTask[mainTaskArray[i]] === undefined ||
          this.state.mainTask[mainTaskArray[i]] === ''
        ) {
          //进行提示
          this.setState({
            tips: mainTaskName[i],
          });
          return;
        }
      }
    }
  }

  /**
   * 关闭必填提示
   */
  onCloseClick() {
    this.setState({
      tips: '',
    });
  }

  /**
   * 发布任务
   */
  saveTask(e) {
    const { dispatch, childTaskAdd, giftId, serverCode, mainTask, assignmentActionId } = this.props;
    this.childTaskSolve();
    const isReset = this.props.location.query.reset;
    this.isCompleteFunc();
    // 添加任务
    if (!isReset) {
      if (this.state.tips === '') {
        if (childTaskAdd.length !== 0) {
          // 有子任务时添加子任务
          dispatch({
            type: 'task/fetchAddAssignmentMain',
            payload: {
              assignmentGiftServerId: giftId, // 礼品id
              content: this.state.mainTask.taskContent, // 行为描述
              giftNum: this.state.mainTask.giftCount, // 奖励个数
              name: this.state.mainTask.taskName, // 行为名称
              pattern: this.state.mainTask.taskPattern, // 任务模式
              reqAddAssignmentMainActionMappingVoList: childTaskAdd, // 子任务
              serverCode, // 行为唯一码
              standard: this.state.mainTask.serverCount, // 进度标准
              type: this.state.mainTask.taskType, // 任务类型
            },
          });
        } else {
          // 无子任务时将主任务信息添加到子任务中
          dispatch({
            type: 'task/fetchAddAssignmentMain',
            payload: {
              assignmentGiftServerId: giftId, // 礼品id
              content: this.state.mainTask.taskContent, // 行为描述
              giftNum: this.state.mainTask.giftCount, // 奖励个数
              name: this.state.mainTask.taskName, // 行为名称
              pattern: this.state.mainTask.taskPattern, // 任务模式
              reqAddAssignmentMainActionMappingVoList: [
                {
                  assignmentActionId,
                  assignmentGiftServerId: giftId, // 礼品id
                  content: this.state.mainTask.taskContent, // 行为描述
                  giftNum: this.state.mainTask.giftCount, // 奖励个数
                  name: this.state.mainTask.taskName, // 行为名称
                  pattern: this.state.mainTask.taskPattern, // 任务模式
                  serverCode, // 行为唯一码
                  standard: this.state.mainTask.serverCount, // 进度标准
                  type: this.state.mainTask.taskType, // 任务类型
                },
              ], // 子任务
              serverCode, // 行为唯一码
              standard: this.state.mainTask.serverCount, // 进度标准
              type: this.state.mainTask.taskType, // 任务类型
            },
          });
        }
      }
    } else if (this.props.location.query.type === 'main') {
      // 修改主任务
      dispatch({
        type: 'task/fetchUpdateAssignmentMain',
        payload: {
          assignmentGiftServerId: giftId,
          content: this.state.mainTask.taskContent
            ? this.state.mainTask.taskContent
            : mainTask.content,
          giftNum: this.state.mainTask.giftCount ? this.state.mainTask.giftCount : mainTask.giftNum,
          id: mainTask.id,
          isDelete: 0,
          name: this.state.mainTask.taskName ? this.state.mainTask.taskName : mainTask.name,
          pattern: this.state.mainTask.taskPattern
            ? this.state.mainTask.taskPattern
            : mainTask.pattern,
        },
      });
    } else if (this.props.location.query.type === 'child') {
      // 修改子任务
      dispatch({
        type: 'task/fetchUpdateAssignmentMainActionMapping',
        payload: {
          assignmentActionId,
          assignmentGiftServerId: giftId,
          assignmentMainId: this.state.mainTask.assignmentMainId,
          content: this.state.mainTask.taskContent
            ? this.state.mainTask.taskContent
            : this.state.mainTask.content,
          giftNum: this.state.mainTask.giftCount,
          id: this.state.mainTask.id,
          isEnable: 1,
          name: this.state.mainTask.taskName
            ? this.state.mainTask.taskName
            : this.state.mainTask.name,
          pattern: this.state.mainTask.taskPattern
            ? this.state.mainTask.taskPattern
            : this.state.mainTask.pattern,
        },
      });
    }
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { mainTask, childList, resetChildTask } = this.props;
    const isReset = this.props.location.query.reset;
    return (
      <PageHeaderWrapper
        content={
          <div>
            {this.props.location.query.type !== 'child' ? (
              <div className={styles.container}>
                <div className={styles.left}>
                  <p>任务名称</p>
                  <p>任务描述</p>
                  <p>任务类型</p>
                  <p>任务模式</p>
                  {this.state.actionShow ? <p>行为绑定</p> : ''}
                  <p>绑定礼品</p>
                  <p>礼品个数</p>
                </div>
                <div className={styles.right}>
                  <div className={styles.taskName}>
                    <Input
                      placeholder={isReset ? mainTask.name : '任务名称'}
                      onChange={(e, name) => {
                        this.taskChange(e, 'name');
                      }}
                    />
                  </div>
                  <div className={styles.warningDiv}>
                    <Input
                      placeholder={isReset ? mainTask.content : '描述内容'}
                      onChange={(e, name) => {
                        this.taskChange(e, 'content');
                      }}
                    />
                  </div>
                  <div className={styles.radio}>
                    <RadioGroup
                      name="radiogroup"
                      defaultValue={isReset ? mainTask.type : ''}
                      onChange={(e, name) => {
                        this.typeChange(e, 'type');
                      }}
                    >
                      <Radio value={0}>一次性任务</Radio>
                      <Radio value={1}>每日任务</Radio>
                      <Radio value={2}>周任务</Radio>
                      <Radio value={3}>可重复性任务</Radio>
                    </RadioGroup>
                  </div>
                  <div className={styles.radio}>
                    <RadioGroup
                      name="radiogroup"
                      defaultValue={isReset ? mainTask.pattern : ''}
                      onChange={(e, name) => {
                        this.typeChange(e, 'pattern');
                      }}
                    >
                      <Radio value={0} onClick={this.bbClick.bind(this)}>
                        普通任务
                      </Radio>
                      <Radio value={1} onClick={this.aaClick.bind(this)}>
                        递进式任务
                      </Radio>
                      <Radio value={2} onClick={this.aaClick.bind(this)}>
                        分组任务
                      </Radio>
                      <Radio value={3} onClick={this.aaClick.bind(this)}>
                        分组式一次性领取任务
                      </Radio>
                    </RadioGroup>
                  </div>
                  {this.state.actionShow ? (
                    <div className={styles.dropdownView}>
                      {/* 下拉选组件 */}
                      <DropdownView />
                      <p>需要行为触发次数</p>
                      <Input
                        placeholder={isReset ? mainTask.standard : '1次'}
                        onChange={(e, name) => {
                          this.taskChange(e, 'count');
                        }}
                        style={{ width: 200 }}
                      />
                    </div>
                  ) : (
                    ''
                  )}
                  {/* 选择礼品组件 */}
                  <div className={styles.choosingGiftsView}>
                    <ChoosingGiftsView />
                  </div>
                  {/* 礼品个数 */}
                  <div className={styles.taskNumeber}>
                    <Input
                      placeholder={isReset ? mainTask.giftNum : '1次'}
                      onChange={(e, name) => {
                        this.taskChange(e, 'giftCount');
                      }}
                    />
                  </div>
                  {/* 礼品个数 */}
                </div>
              </div>
            ) : (
              <div className={styles.container}>
                <div className={styles.left}>
                  <p>任务名称</p>
                  <p>任务描述</p>
                  <p>任务模式</p>
                  <p>行为绑定</p>
                  <p>绑定礼品</p>
                  <p>礼品个数</p>
                </div>
                <div className={styles.right}>
                  <div className={styles.taskName}>
                    <Input
                      placeholder={isReset ? resetChildTask.name : '任务名称'}
                      onChange={(e, name) => {
                        this.taskChange(e, 'name');
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder={isReset ? resetChildTask.content : '描述内容'}
                      onChange={(e, name) => {
                        this.taskChange(e, 'content');
                      }}
                    />
                  </div>
                  <div className={styles.radio}>
                    <RadioGroup
                      name="radiogroup"
                      defaultValue={isReset ? resetChildTask.pattern : ''}
                      onChange={(e, name) => {
                        this.typeChange(e, 'pattern');
                      }}
                    >
                      <Radio value={0} onClick={this.bbClick.bind(this)}>
                        普通任务
                      </Radio>
                      <Radio value={1} onClick={this.aaClick.bind(this)}>
                        递进式任务
                      </Radio>
                      <Radio value={2} onClick={this.aaClick.bind(this)}>
                        分组任务
                      </Radio>
                      <Radio value={3} onClick={this.aaClick.bind(this)}>
                        分组式一次性领取任务
                      </Radio>
                    </RadioGroup>
                  </div>
                  <div className={styles.dropdownView}>
                    {/* 下拉选组件 */}
                    <DropdownView />
                    <p>需要行为触发次数</p>
                    <Input
                      placeholder={isReset ? resetChildTask.standard : '1次'}
                      onChange={(e, name) => {
                        this.taskChange(e, 'count');
                      }}
                    />
                  </div>
                  {/* 选择礼品组件 */}
                  <div className={styles.choosingGiftsView}>
                    <ChoosingGiftsView />
                  </div>
                  {/* 礼品个数 */}
                  <div className={styles.taskNumeber}>
                    <Input
                      placeholder={isReset ? resetChildTask.giftNum : '1次'}
                      onChange={(e, name) => {
                        this.taskChange(e, 'giftCount');
                      }}
                    />
                  </div>
                  {/* 礼品个数 */}
                </div>
              </div>
            )}
            {/* 点击显示添加子任务 */}
            <div
              className={
                this.state.isShow &&
                this.props.location.query.type !== 'main' &&
                this.props.location.query.type !== 'child'
                  ? styles.subTask
                  : styles.hide
              }
            >
              {getFieldDecorator('controllingShareholder', {
                initialValue: this.state.childTaskData,
              })(<Shareholder />)}
            </div>
            {/* 创建任务按钮 */}
            <div className={styles.create}>
              <Button
                type="primary"
                onClick={e => {
                  this.saveTask(e);
                }}
              >
                发布任务
              </Button>
            </div>
            {/* 错误提示框 */}
            {this.state.tips !== '' ? (
              <Alert
                message="提示"
                description={`${this.state.tips}是必填项`}
                type="error"
                closeText="x"
                showIcon
                style={{ width: 600, position: 'absolute', top: 300, left: 600 }}
                onClose={e => {
                  this.onCloseClick(e);
                }}
              />
            ) : (
              ''
            )}
          </div>
        }
      />
    );
  }
}
export default CreateTask;
