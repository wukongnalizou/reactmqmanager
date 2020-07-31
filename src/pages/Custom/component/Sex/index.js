import React, { Component } from 'react';
import { Radio } from 'antd';
/**
 * 模块：用户中心
 * 页面：用户中心
 * 组件：性别单选
 */
const RadioGroup = Radio.Group;
class App extends React.Component {
  state = {
    value: 1,
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <RadioGroup onChange={this.onChange} value={this.state.value}>
        <Radio value={1}>全部</Radio>
        <Radio value={2}>男</Radio>
        <Radio value={3}>女</Radio>
      </RadioGroup>
    );
  }
}
export default class SexView extends Component {
  render() {
    return <App />;
  }
}
