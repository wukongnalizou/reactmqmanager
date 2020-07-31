import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { Tag } from 'antd';
import styles from './index.less';
import ActivityDetailsTableView from './component/ActivityDetailsTable';
/**
 * 页面：活动中心详情
 * @author：zhaoyijn
 */

export default class ActivityDetails extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        content={
          <div>
            {/* <div className={styles.content}>
                    <div className={styles.activityDetails}>
                        <h2>活动详情</h2>
                        <p>活动时间：2019-02-01 12:30</p>
                        <p>消费金额：¥500</p>
                        <p>付款方式：大随机</p>
                        <div className={styles.tag}>
                            <div><p>标签：</p></div>
                            <div>
                                <Tag color="magenta">magenta</Tag>
                                <Tag color="red">red</Tag>
                                <Tag color="volcano">volcano</Tag>
                            </div>
                        </div>
                    </div>
                    <div className={styles.merchantDetails}>
                    <h2>商家详情</h2>
                    <p>商家名称：时尚火锅</p>
                        <p>城市：沈阳</p>
                        <p>负责人：李某某</p>
                        <p>电话：130-8548-8888</p>
                        <p>地址：沈阳市皇姑区沈阳天地A座</p>
                    </div>
                </div> */}
            {/* 表格 */}
            {console.log('this.props.SellerId', this.props.SellerId)}
            <div className={styles.table}>
              <ActivityDetailsTableView
                id={this.props.location.query.id}
                SellerId={this.props.location.query.SellerId}
              />
            </div>
          </div>
        }
      />
    );
  }
}
