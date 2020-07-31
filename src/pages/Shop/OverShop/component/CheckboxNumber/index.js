import React, { PureComponent } from 'react';
import { Checkbox } from 'antd';
/**
 * 模块：商户中心
 * 页面：已入驻商户
 * 组件：评分多选框
 */
function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}
export default class CheckboxNumberView extends PureComponent {
  render() {
    return (
      <div>
        <Checkbox onChange={onChange}>1分</Checkbox>
        <Checkbox onChange={onChange}>2分</Checkbox>
        <Checkbox onChange={onChange}>3分</Checkbox>
        <Checkbox onChange={onChange}>4分</Checkbox>
        <Checkbox onChange={onChange}>5分</Checkbox>
      </div>
    );
  }
}
