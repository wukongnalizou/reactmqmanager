import React, { Component } from 'react';
import { Tag } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import MoguCreateView from '../component/MoguCreate';
import styles from './index.less';
/**
 * 页面：订单中心详情
 * @author：zhaoyijn
 */
@connect(({ mogu }) => ({
  productDetail: mogu.productDetail, // 商品详情
}))
class ExchangeDetails extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'mogu/fetchFindActivitiesProductById',
      payload: {
        id: this.props.location.query.id,
      },
    });
  }

  render() {
    const { productDetail } = this.props;
    return (
      <PageHeaderWrapper
        content={
          <div>
            <div className={styles.content}>
              {/* 商品详情 */}
              <div className={styles.activityDetails}>
                <h2>商品详情</h2>
                <p>id: {productDetail.id}</p>
                <p>名称: {productDetail.name}</p>
                <p>描述: {productDetail.content}</p>
                <p>兑换券兑换单价: {productDetail.exchangeCertificatePrice}</p>
                <p>兑换说明: {productDetail.exchangeContent}</p>
                <p>级别: {productDetail.grade}</p>
                <p>库存: {productDetail.inventory}</p>
                <img src={productDetail.listImgUrl} className={styles.image} />
                <img src={productDetail.detailImgUrl} className={styles.imageSecond} />
                <img src={productDetail.enlargedImgUrl} className={styles.imageSecond} />
                <MoguCreateView content="修改商品" reset={true} id={this.props.location.query.id} />
              </div>
              {/* 商家详情 */}
              {/* <div className={styles.merchantDetails}>
                    <h2>商家详情</h2>
                    <p>商家名称：时尚火锅</p>
                        <p>城市：沈阳</p>
                        <p>负责人：李某某</p>
                        <p>电话：130-8548-8888</p>
                        <p>地址：沈阳市皇姑区沈阳天地A座</p>
                    </div>    */}
            </div>
            {/* 表格 */}
            {/* <div className={styles.orderDetailsTableView}><ExchangeDetailsTableView /></div> */}
          </div>
        }
      />
    );
  }
}
export default ExchangeDetails;
