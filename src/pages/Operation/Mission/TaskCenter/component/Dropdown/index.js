import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, message, Select } from 'antd';
import { connect } from 'dva';
/**
 * 模块：运营中心-任务中心
 * 页面：创建任务
 * 组件：下拉选
 * modifyDate:2019-07-01
 * author:Cin
 */

@connect(({ task }) => ({
  giftList: task.giftList, // 礼品列表
  actionList: task.actionList, // 行为绑定列表
}))
export default class DropdownView extends Component {
  /**
   * 选择行为列表
   */
  chooseActionClick(e) {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/setServerCode',
      payload: {
        serverCode: e.split('&')[0],
        assignmentActionId: e.split('&')[1],
      },
    });
  }

  render() {
    const { actionList } = this.props;
    const { Option } = Select;
    return (
      <div>
        <Select
          style={{ width: 200 }}
          defaultValue="请选择行为"
          onChange={e => {
            this.chooseActionClick(e);
          }}
        >
          {actionList.map((item, index) => (
              <Option value={`${item.serverCode}&${item.id}`} key={item.id}>
                {item.name}
              </Option>
            ))}
        </Select>
      </div>
    );
  }
}
