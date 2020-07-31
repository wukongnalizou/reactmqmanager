import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
/**
 * 模块：商户中心
 * 页面：已入驻商户
 * 组件：日期
 */
const { RangePicker } = DatePicker;
function onChange(date, dateString) {
  console.log(date, dateString);
}
export default class DateView extends PureComponent {
  render() {
    return (
      <div>
        <RangePicker style={{ width: 330 }} onChange={onChange} />
      </div>
    );
  }
}
