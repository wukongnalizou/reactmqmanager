import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

// 组件：选项卡
import TabsView from './component/Tab';
/**
 * 模块：商户中心
 * 页面：已入驻商户--商户活动
 * @author:lisimeng
 */
export default class Active extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        content={
          <div>
            {/* 组件：选项卡 */}
            <TabsView SellerId={this.props.location.query.sellerId} />
          </div>
        }
      />
    );
  }
}
