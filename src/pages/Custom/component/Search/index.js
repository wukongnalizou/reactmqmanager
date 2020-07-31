import React, { PureComponent } from 'react';
import { Input } from 'antd';
/**
 * 模块：用户中心
 * 页面：用户中心
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
