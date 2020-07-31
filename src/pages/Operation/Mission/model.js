import moment from 'moment';
import router from 'umi/router';
import { message } from 'antd';
import {
  findBackAssignmentMainList, // 获取任务列表
  findAssignmentMainAndActionMappingByMainId, // 查询子任务
  addAssignmentMain, // 添加任务
  updateAssignmentMain, // 修改主任务模板
  updateAssignmentMainActionMapping, // 修改子任务模板
  findAssignmentGiftServerList, // 查询礼品列表
  findAssignmentActionListForBack, // 查询行为列表
} from './service';
import { setData } from '@/utils/localData';

export default {
  namespace: 'task',
  state: {
    // 任务列表
    taskList: [],
    // 任务总条数
    total: '',
    // 子任务列表
    childList: [],
    // 任务类型
    taskType: {
      0: '一次性任务',
      1: '每日任务',
      2: '周任务',
      3: '可重复性任务',
    },
    // 任务模式
    taskPattern: {
      0: '普通任务',
      1: '递进式任务',
      2: '分组任务',
      3: '分组式一次性领取任务',
    },
    // 礼品列表
    giftList: [],
    // 行为列表
    actionList: [],
    // 行为绑定码
    serverCode: '',
    // 行为id
    assignmentActionId: '',
    // 礼品id
    giftId: '',
    // 添加的子任务
    childTaskAdd: [],
    // 主任务
    mainTask: {},
    // 要修改的子任务
    resetChildTask: {},
  },
  effects: {
    // 获取任务列表
    *fetchFindBackAssignmentMainList(param, { call, put, select }) {
      const taskListData = yield call(findBackAssignmentMainList, param);
      const taskType = yield select(state => state.task.taskType);
      if (taskListData.success) {
        taskListData.data.list.forEach(item => {
          item.key = item.id;
          item.taskTypeName = taskType[item.type];
          item.taskPatternName = taskType[item.pattern];
        });
        yield put({
          type: 'setTaskList',
          payload: {
            taskList: taskListData.data.list,
            total: taskListData.data.total,
          },
        });
      }
    },
    // 获取主任务和子任务
    *fetchFindAssignmentMainAndActionMappingByMainId(param, { call, put, select }) {
      const childTaskData = yield call(findAssignmentMainAndActionMappingByMainId, param);
      const taskType = yield select(state => state.task.taskType);
      if (childTaskData.success) {
        childTaskData.data.assignmentMainActionMappingVoList.forEach(item => {
          item.key = item.id;
          item.taskTypeName = taskType[item.type];
          item.taskPatternName = taskType[item.pattern];
        });
        yield put({
          type: 'setChildList',
          payload: {
            childList: childTaskData.data.assignmentMainActionMappingVoList,
          },
        });
        yield put({
          type: 'setMainTask',
          payload: {
            mainTask: childTaskData.data,
          },
        });
      }
    },
    // 查询礼品列表
    *fetchFindAssignmentGiftServerList(param, { call, put, select }) {
      const giftListData = yield call(findAssignmentGiftServerList, param);
      const giftList = [];
      giftListData.data.forEach(item => {
        item.key = item.id;
        // if(item.serviceName !== 'account-service') {
        //     giftList.push(item);
        // }
      });
      if (giftListData.success) {
        yield put({
          type: 'setGiftList',
          payload: {
            // giftList: giftList
            giftList: giftListData.data,
          },
        });
      }
    },
    // 查询行为列表
    *fetchFindAssignmentActionListForBack(param, { call, put, select }) {
      const actionListData = yield call(findAssignmentActionListForBack, param);
      if (actionListData.success) {
        actionListData.data.forEach(item => {
          item.key = item.id;
        });
        yield put({
          type: 'setActionList',
          payload: {
            actionList: actionListData.data,
          },
        });
      }
    },
    // 添加任务
    *fetchAddAssignmentMain(param, { call, put, select }) {
      const addMainAssignmentData = yield call(addAssignmentMain, param);
      if (addMainAssignmentData.success) {
        router.push('/operations/mission/taskCenter');
      }
    },
    // 修改主任务
    *fetchUpdateAssignmentMain(param, { call, put, select }) {
      const updateAssignmentMainData = yield call(updateAssignmentMain, param);
      if (updateAssignmentMainData.data.count === 1) {
        router.push('/operations/mission/taskCenter');
      }
    },
    // 修改子任务
    *fetchUpdateAssignmentMainActionMapping(param, { call, put, select }) {
      const updateAssignmentMainActionMappingData = yield call(
        updateAssignmentMainActionMapping,
        param,
      );
      if (updateAssignmentMainActionMappingData.data.count === 1) {
        router.push('/operations/mission/taskCenter');
      }
    },
  },
  reducers: {
    // 设置任务列表
    setTaskList(state, { payload }) {
      return {
        ...state,
        taskList: payload.taskList,
        total: payload.total,
      };
    },
    // 设置子任务列表
    setChildList(state, { payload }) {
      return {
        ...state,
        childList: payload.childList,
      };
    },
    // 设置主任务
    setMainTask(state, { payload }) {
      return {
        ...state,
        mainTask: payload.mainTask,
      };
    },
    // 设置礼品列表
    setGiftList(state, { payload }) {
      return {
        ...state,
        giftList: payload.giftList,
      };
    },
    // 设置行为列表
    setActionList(state, { payload }) {
      return {
        ...state,
        actionList: payload.actionList,
      };
    },
    // 设置行为绑定码
    setServerCode(state, { payload }) {
      return {
        ...state,
        serverCode: payload.serverCode,
        assignmentActionId: payload.assignmentActionId,
      };
    },
    // 设置礼品id
    setGiftId(state, { payload }) {
      return {
        ...state,
        giftId: payload.giftId,
      };
    },
    // 设置添加的子任务
    setChildTaskAdd(state, { payload }) {
      return {
        ...state,
        childTaskAdd: payload.childTaskAdd,
      };
    },
    // 要修改的子任务
    resetChildTask(state, { payload }) {
      return {
        ...state,
        resetChildTask: payload.resetChildTask,
      };
    },
  },
};
