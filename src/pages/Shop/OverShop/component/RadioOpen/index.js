import React, { PureComponent } from 'react';
import { Radio } from 'antd';
/**
 * 模块：商户中心
 * 页面：已入驻商户
 * 组件：是否营业单选按钮
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
        <Radio value={2}>营业</Radio>
        <Radio value={3}>未营业</Radio>
      </RadioGroup>
    );
  }
}
export default class RadioOpenView extends PureComponent {
  render() {
    return <App />;
  }
}
