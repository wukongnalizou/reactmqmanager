import React, { Component } from 'react';
import { Tabs } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import TopView from '../Search';
import TableView from '../Sort';
// import TableView from '../active/Table1';
/**
 * 模块：商户中心
 * 页面：已入驻商户--商户活动
 * 组件：选项卡
 * @author:songshuyu
 */
// 组件：顶部搜索、排序组件
// import TopView from '../../components/activity/Top';
// //组件：表格组件
// import TableView from '../../components/activity/Table';

const { TabPane } = Tabs;
const tabValue = [
  {
    value: '待接单',
    key: '1',
  },
  {
    value: '待付款',
    key: '2',
  },
  {
    value: '未成单',
    key: '3',
  },
  {
    value: '待消费',
    key: '4',
  },
  {
    value: '活动中',
    key: '5',
  },
  {
    value: '历史',
    key: '6',
  },
];
@connect(({ active }) => ({
  activeList: active.activeList, // 活动列表
}))
class Active extends Component {
  state = {
    currentStatus: 1,
  };

  /**
   * 选项卡切换
   */
  changeClick(e) {
    const num = parseInt(e);
    this.setState({
      // eslint-disable-next-line radix
      currentStatus: num,
    });
    // 调用子组件的获取列表事件
    this.child.getSellerList(num, 1);
  }

  /*
   * 调用子组件的获取列表事件
   */
  onRef = ref => {
    this.child = ref;
  };

  render() {
    return (
      <div className={styles.tabs}>
        <Tabs
          defaultActiveKey="1"
          onChange={e => {
            this.changeClick(e);
          }}
        >
          {tabValue.map((value, key) => (
            <TabPane tab={value.value} key={value.key}>
              <div>
                {/* <div>
                    <TopView />
                  </div> */}
                <div>
                  <TableView
                    onRef={this.onRef}
                    SellerId={this.props.SellerId}
                    status={this.state.currentStatus}
                  />
                </div>
              </div>
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}
export default Active;
