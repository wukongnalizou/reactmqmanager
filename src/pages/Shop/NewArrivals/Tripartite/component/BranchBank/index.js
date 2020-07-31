import React, { PureComponent } from 'react';
import { Cascader } from 'antd';
/**
 * 模块：商户中心
 * 页面：审核-开户方式-商家开户
 * 组件：开户银行支行
 */
const options = [
  {
    value: 'liaoning',
    label: '辽宁省',
    children: [
      {
        value: 'shenyang',
        label: '沈阳市',
        children: [
          {
            value: 'beita',
            label: '北塔支行',
          },
        ],
      },
    ],
  },
  {
    value: 'jilin',
    label: '吉林省',
    children: [
      {
        value: 'changchun',
        label: '长春市',
        children: [
          {
            value: 'beita',
            label: '北塔支行',
          },
        ],
      },
    ],
  },
];
function onChange(value) {
  console.log(value);
}
export default class BranchBank extends PureComponent {
  render() {
    return (
      <div>
        <Cascader style={{ width: '3rem' }} options={options} onChange={onChange} placeholder=" " />
      </div>
    );
  }
}
