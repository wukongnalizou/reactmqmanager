import { Avatar, Icon, Menu, Spin } from 'antd';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { removeData } from '@/utils/localData'
import HeaderDropdown from '../HeaderDropdown';
import avatar from '@/assets/global/avatar.png';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      // const { dispatch } = this.props;

      // if (dispatch) {
      //   dispatch({
      //     type: 'login/logout',
      //   });
      // }
      removeData('access_token');
      router.push('/user/login');
      // return;
    }

    // router.push(`/account/${key}`);
  };

  render() {
    const { currentUser = {}, menu } = this.props;
    if (!menu) {
      return (
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={avatar} alt="avatar" />
          <span className={styles.name}>admin</span>
        </span>
      );
    }
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {/* <Menu.Item key="center">
          <Icon type="user" />
          个人中心
        </Menu.Item>
        <Menu.Item key="settings">
          <Icon type="setting" />
          个人设置
        </Menu.Item>
        <Menu.Divider /> */}
        <Menu.Item key="logout">
          <Icon type="logout" />
          注销
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={avatar} alt="avatar" />
          <span className={styles.name}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    );
  }
}

export default connect(({ user }) => ({
  currentUser: { name: 'admin' },
}))(AvatarDropdown);
