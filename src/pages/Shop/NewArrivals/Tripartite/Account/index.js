import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import Link from 'umi/link';
/**
 * 模块：商户中心
 * 页面：审核-开户方式
 * author：lisimeng
 */
const gridStyle = {
  width: '33.3%',
  textAlign: 'center',
};
export default class Account extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        content={
          // <div className={styles.content}>
          //     <div className={styles.shop}></div>
          // </div>
          <Card title="请选择开户方式">
            <Link
              to={`/shop/newArrivals/tripartite/openShop?userId=${this.props.location.query.userId}&&sellerId=${this.props.location.query.sellerId}&&Id=${this.props.location.query.Id}`}
            >
              <Card.Grid style={gridStyle}>商家开户</Card.Grid>
            </Link>
            <Link
              to={`/shop/newArrivals/tripartite/openPerson?userId=${this.props.location.query.userId}&&userCustId=${this.props.location.query.sellerUserId}&&sellerId=${this.props.location.query.sellerId}&&Id=${this.props.location.query.Id}`}
            >
              <Card.Grid style={gridStyle}>个人开户</Card.Grid>
            </Link>
            <Link
              to={`/shop/newArrivals/tripartite/openSelfFiles?userId=${this.props.location.query.userId}&&userCustId=${this.props.location.query.sellerUserId}&&sellerId=${this.props.location.query.sellerId}&&Id=${this.props.location.query.Id}`}
            >
              <Card.Grid style={gridStyle}>个体户开户</Card.Grid>
            </Link>
            {/* <Link to={`/shop/review/openSelf?userId=${this.props.location.query.userId}&&userCustId=${this.props.location.query.sellerUserId}&&sellerId=${this.props.location.query.sellerId}&&Id=${this.props.location.query.Id}`}>
                    <Card.Grid style={gridStyle}>个体户开户</Card.Grid>  
                </Link>             */}
          </Card>
        }
      />
    );
  }
}
