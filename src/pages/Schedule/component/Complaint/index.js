import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import Link from 'umi/link';
import styles from './index.less';
import iconComplaint from '@/assets/global/iconComplaint.png';
/**
 * 模块：首页
 * 组件：投诉用户
 */

// 投诉用户名
const complaintdata = [
  {
    title: '藏爱家族',
  },
  {
    title: '藏爱家族',
  },
  {
    title: '藏爱家族',
  },
  {
    title: '藏爱家族',
  },
];
export default class ComplaintView extends Component {
  render() {
    return (
      <div className={styles.complaint}>
        <div className={styles.title}>
          <img className={styles.icon} src={iconComplaint} alt="" />
          <span>投诉用户</span>
          <Link to="/customerService/complaint">
            <a href="#" className={styles.more}>
              查看全部
            </a>
          </Link>
        </div>
        <List
          className={styles.list}
          itemLayout="horizontal"
          dataSource={complaintdata}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    className={styles.icon}
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description="约的人根本222没来！！！差评！！"
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
