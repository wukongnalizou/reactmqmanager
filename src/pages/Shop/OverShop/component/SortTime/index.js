import React, { PureComponent } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import styles from './index.less';
/**
 * 模块：商户中心
 * 页面：新申请入驻
 * 组件：排序
 */
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

export default class SorttimeView extends PureComponent {
  render() {
    return (
      <div className={styles.sortView}>
        <div className={styles.menu}>
          <Dropdown overlay={menuTime}>
            <a className="ant-dropdown-link" href="#">
              申请时间 <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </div>
    );
  }
}
