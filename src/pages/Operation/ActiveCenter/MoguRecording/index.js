import React, { Component } from 'react';
import { Tabs } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import RecordingTableView from './component/RecordingTable';
// import RecordingTable2View from '../../../components/operations/mogu/RecordingTable2';
// import RecordingTable3View from '../../../components/operations/mogu/RecordingTable3';
/**
 * 模块：运营中心
 * 页面：活动中心-魔咕计划-兑换记录
 * @author：lisimeng
 * modifyDate: 2019-07-12
 * author:Cin
 */
const { TabPane } = Tabs;

@connect(({ mogu }) => ({
  exchangeProductList: mogu.exchangeProductList, // 活动商品订单列表
}))
class MoguRecording extends Component {
  componentDidMount() {
    this.getRecordList(1, 0);
  }

  /**
   * 获取订单
   */
  getRecordList(pageNum, status) {
    const { dispatch } = this.props;
    dispatch({
      type: 'mogu/fetchFindExchangeProductOrderList',
      payload: {
        dateTime: new Date().getTime(),
        pageNum,
        pageSize: '7',
        param: {
          status,
        },
      },
    });
  }

  callback(e) {
    this.getRecordList(1, parseInt(e));
  }

  render() {
    return (
      <PageHeaderWrapper
        content={
          <div>
            <Tabs
              defaultActiveKey="0"
              onChange={e => {
                this.callback(e);
              }}
            >
              <TabPane tab="待发货" key="0">
                {/* 表格组件 */}
                <RecordingTableView status="0" />
              </TabPane>
              <TabPane tab="已发货" key="1">
                {/* 表格组件 */}
                <RecordingTableView status="1" />
              </TabPane>
              <TabPane tab="已完成" key="2">
                {/* 表格组件 */}
                <RecordingTableView status="2" />
              </TabPane>
              <TabPane tab="驳回" key="3">
                {/* 表格组件 */}
                <RecordingTableView status="3" />
              </TabPane>
            </Tabs>
          </div>
        }
      />
    );
  }
}
export default MoguRecording;
