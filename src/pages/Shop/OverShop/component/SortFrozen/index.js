import React, { PureComponent } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import styles from './index.less';
/**
 * 模块：商户中心
 * 页面：冻结中用户
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
const menuShoppig = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        高到低
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        低到高
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        无
      </a>
    </Menu.Item>
  </Menu>
);
const menuScore = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        高到低
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        低到高
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        无
      </a>
    </Menu.Item>
  </Menu>
);
export default class SortfrozenView extends PureComponent {
  render() {
    return (
      <div className={styles.sortView}>
        <div className={styles.menu}>
          <Dropdown overlay={menuTime}>
            <a className="ant-dropdown-link" href="#">
              入驻时间 <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div className={styles.menu}>
          <Dropdown overlay={menuToday}>
            <a className="ant-dropdown-link" href="#">
              今日单量 <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div className={styles.menu}>
          <Dropdown overlay={menuHistory}>
            <a className="ant-dropdown-link" href="#">
              历史单量 <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div className={styles.menu}>
          <Dropdown overlay={menuShoppig}>
            <a className="ant-dropdown-link" href="#">
              人均消费 <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div className={styles.menu}>
          <Dropdown overlay={menuScore}>
            <a className="ant-dropdown-link" href="#">
              评分 <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div className={styles.menu}>
          <Dropdown overlay={menuScore}>
            <a className="ant-dropdown-link" href="#">
              冻结时间 <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </div>
    );
  }
}
