import React, { PureComponent } from 'react';
import { Cascader } from 'antd';
import styles from './index.less';
/**
 * 模块：商户中心
 * 页面：已入驻商户
 * 组件：地区选框
 */
const options = [
  {
    value: 'liaoningshneg',
    label: '辽宁省',
    children: [
      {
        value: 'shenyangshi',
        label: '沈阳市',
        children: [
          {
            value: 'huangguqu',
            label: '皇姑区',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsushneg',
    label: '江苏省',
    children: [
      {
        value: 'nanjingshi',
        label: '南京市',
        children: [
          {
            value: 'zhonghuamen',
            label: '中华门',
          },
        ],
      },
    ],
  },
];
function onChange(value) {
  console.log(value);
}
export default class AreaView extends PureComponent {
  render() {
    return (
      <Cascader
        className={styles.cascader}
        options={options}
        onChange={onChange}
        placeholder="省/市/区"
      />
    );
  }
}
