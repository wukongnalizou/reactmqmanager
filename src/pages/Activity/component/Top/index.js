import React, { PureComponent } from 'react';
import { Input, Menu, Dropdown, Icon } from 'antd';
import styles from './index.less';
/**
 * 模块：活动
 * 页面：活动
 * 组件：顶部搜索、排序组件
 */

// 搜索组件
const { Search } = Input;
// 排序组件
const menuTime = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        新到老
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        老到新
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        无
      </a>
    </Menu.Item>
  </Menu>
);
const menuToday = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        多到少
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        少到多
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        无
      </a>
    </Menu.Item>
  </Menu>
);
const menuHistory = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        多到少
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        少到多
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        无
      </a>
    </Menu.Item>
  </Menu>
);

export default class TopView extends PureComponent {
  render() {
    return (
      <div className={styles.top}>
        {/* 搜索组件 */}
        <Search
          placeholder="请输入搜索内容"
          onSearch={value => console.log(value)}
          className={styles.search}
          enterButton
        />
        {/* 排序组件 */}
        <div className={styles.sort}>
          <div className={styles.menu}>
            <Dropdown overlay={menuTime}>
              <a className="ant-dropdown-link" href="#">
                活动时间 <Icon type="down" />
              </a>
            </Dropdown>
          </div>
          <div className={styles.menu}>
            <Dropdown overlay={menuToday}>
              <a className="ant-dropdown-link" href="#">
                消费金额 <Icon type="down" />
              </a>
            </Dropdown>
          </div>
          <div className={styles.menu}>
            <Dropdown overlay={menuHistory}>
              <a className="ant-dropdown-link" href="#">
                参与人数 <Icon type="down" />
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}
