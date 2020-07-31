import React, { Component } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// 选项卡组件
import { Tabs } from 'antd';
// 创建新商品组件
import MoguCreateView from './component/MoguCreate';
// 表格组件
import MoguTableView from './component/MoguTable';
import styles from './index.less';
/**
 * 模块：运营中心
 * 页面：活动中心-活动商品
 * @author:lisimeng
 * modifyDate: 2019-07-12
 * author:Cin
 */
const { TabPane } = Tabs;
@connect(({ mogu }) => ({
  exchangeProductList: mogu.exchangeProductList, // 活动商品订单列表
}))
class Mogu extends Component {
  componentDidMount() {
    this.getProductList(0);
  }

  /**
   * 获取商品列表
   */
  getProductList(grade) {
    const { dispatch } = this.props;
    dispatch({
      type: 'mogu/fetchFindActivitiesProductList',
      payload: {
        dateTime: new Date().getTime(),
        pageNum: '1',
        pageSize: 10,
        param: {
          grade,
        },
      },
    });
  }

  callback(e) {
    this.getProductList(e);
  }
  /**
   * 修改商品
   */
  // resetGoodsClick(e, id) {
  //     console.log('修改商品', id);
  // }

  render() {
    return (
      <PageHeaderWrapper
        content={
          <div>
            <Tabs defaultActiveKey="0" onChange={e => this.callback(e)}>
              <TabPane tab="高级" key="0">
                {/* 创建新商品 */}
                <MoguCreateView grade="0" />
                {/* 表格 */}
                <div className={styles.table}>
                  <MoguTableView
                    grade="0"
                    resetGoodsClick={(e, id) => {
                      this.resetGoodsClick(e, id);
                    }}
                  />
                </div>
              </TabPane>
              <TabPane tab="初级" key="1">
                {/* 创建新商品 */}
                <MoguCreateView grade="1" />
                {/* 表格 */}
                <div className={styles.table}>
                  <MoguTableView
                    grade="1"
                    resetGoodsClick={(e, id) => {
                      this.resetGoodsClick(e, id);
                    }}
                  />
                </div>
              </TabPane>
              <TabPane tab="入门" key="2">
                {/* 创建新商品 */}
                <MoguCreateView grade="2" />
                {/* 表格 */}
                <div className={styles.table}>
                  <MoguTableView grade="2" />
                </div>
              </TabPane>
              <TabPane tab="常驻" key="3">
                {/* 创建新商品 */}
                <MoguCreateView grade="3" />
                {/* 表格 */}
                <div className={styles.table}>
                  <MoguTableView grade="3" />
                </div>
              </TabPane>
            </Tabs>
          </div>
        }
      />
    );
  }
}
export default Mogu;
