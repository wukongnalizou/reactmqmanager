import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import styles from './index.less';
/**
 * 页面：首页
 * 组件：待审核商家注册申请
 */
const complaintdata = [
  {
    title: '李记酸菜鱼',
  },
  {
    title: '李记酸菜鱼',
  },
  {
    title: '李记酸菜鱼',
  },
];

export default class ApplytView extends Component {
  render() {
    return (
      <div>
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
                description="约的人根本1111111没来！！！差评！！"
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
