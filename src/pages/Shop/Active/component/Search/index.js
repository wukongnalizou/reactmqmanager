import React, { PureComponent } from 'react';
import { Input } from 'antd';
/**
 * 模块：商户中心
 * 页面：已入驻商户--商户活动
 * 组件：搜索
 */
const { Search } = Input;
export default class SearchView extends PureComponent {
  render() {
    return (
      <div>
        <Search placeholder="请输入搜索内容" onSearch={value => console.log(value)} enterButton />
      </div>
    );
  }
}
