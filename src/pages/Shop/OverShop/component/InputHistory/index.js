import React, { PureComponent } from 'react';
import { Input, Select } from 'antd';
/**
 * 模块：商户中心
 * 页面：已入驻商户
 * 组件：历史单量
 */
const InputGroup = Input.Group;
const { Option } = Select;

export default class InputHistoryView extends PureComponent {
  render() {
    return (
      <div>
        <InputGroup compact>
          <Select defaultValue="1">
            <Option value="1">Between</Option>
            <Option value="2">Except</Option>
          </Select>
          <Input style={{ width: 100, textAlign: 'center' }} placeholder="最小" />
          <Input
            style={{
              width: 30,
              borderLeft: 0,
              pointerEvents: 'none',
              backgroundColor: '#fff',
            }}
            placeholder="~"
            disabled
          />
          <Input style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="最大" />
        </InputGroup>
      </div>
    );
  }
}
