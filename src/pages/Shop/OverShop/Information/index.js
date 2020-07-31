import React, { Component } from 'react';
import { Avatar, Rate } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';
import noImg from '@/assets/global/noImg.jpg';
/**
 * 模块：商户中心-新申请入驻
 * 页面：详情
 * @author：zhaoyijn songshuyu
 */

@connect(({ information }) => ({
  information,
  storeDetailsData: information.storeDetailsData, // 商家详细信息
  businessTime: information.businessTime, // 店铺营业时间
  categoryNameStr: information.categoryNameStr, // 店铺经营范围
  serverStr: information.serverStr, // 店铺服务
}))
class Information extends Component {
  state = {};

  // 初始化
  componentDidMount() {
    this.dataFill();
  }

  // 获取已审核商家信息
  dataFill() {
    const { dispatch } = this.props;
    dispatch({
      type: 'information/storeDetails',
      payload: {
        id: this.props.location.query.sellerId,
      },
    });
  }

  render() {
    const { storeDetailsData, serverStr, businessTime, categoryNameStr } = this.props;
    return (
      <PageHeaderWrapper
        content={
          <div className={styles.content}>
            <div className={styles.title}>
              <div>
                <Avatar
                  className={styles.businness_photo}
                  src={Object.keys(storeDetailsData).length > 0 ? storeDetailsData.image : noImg}
                  alt="暂无图片"
                />
                <div className={styles.business_name}>
                  {Object.keys(storeDetailsData).length > 0 ? storeDetailsData.sellerName : ''}
                </div>
              </div>
              <div className={styles.business_rate}>
                <div>
                  <Rate
                    disabled
                    value={
                      Object.keys(storeDetailsData).length > 0 ? storeDetailsData.score / 10 : 0
                    }
                  />
                  <span className="ant-rate-text" style={{ marginTop: '0.06rem' }}>
                    {Object.keys(storeDetailsData).length > 0
                      ? `${storeDetailsData.score / 10}分`
                      : ''}
                  </span>
                </div>
              </div>
            </div>
            {/* 商家基本信息 */}
            <div className={styles.business_information}>
              <div className={styles.information_left}>
                <h3>商家基本信息</h3>
                <div className={styles.information_all}>
                  <ul>
                    <li>
                      <span>商家电话：</span>
                      {Object.keys(storeDetailsData).length > 0
                        ? storeDetailsData.sellerPhone
                        : '暂无'}
                    </li>
                    <li>
                      <span>商家地址：</span>
                      {Object.keys(storeDetailsData).length > 0 ? storeDetailsData.address : '暂无'}
                    </li>
                    <li>
                      <span>经营类目：</span>
                      {Object.keys(storeDetailsData).length > 0
                        ? storeDetailsData.categoryName
                        : '暂无'}{' '}
                    </li>
                    <li>
                      商圈：
                      {Object.keys(storeDetailsData).length > 0
                        ? storeDetailsData.sellerCircleName
                        : '暂无'}{' '}
                    </li>
                  </ul>
                </div>
                <div className={styles.upload}>
                  {storeDetailsData.images ? (
                    storeDetailsData.images.map(item => (
                      <div className={styles.commodity} key={item.id}>
                        <img className={styles.imgImages} src={item.imgUrl} alt="暂无图片" />
                      </div>
                    ))
                  ) : (
                    <div className={styles.commodity}>
                      <img className={styles.imgImages} src={noImg} alt="暂无图片" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* 负责人信息 */}
            <div className={styles.leader_information}>
              <div className={styles.leader_left}>
                <h3>负责人信息</h3>
                <div className={styles.leader_all}>
                  <ul>
                    <li>
                      <span>负责人：</span>{' '}
                      {Object.keys(storeDetailsData).length > 0
                        ? storeDetailsData.principalInfo.name
                        : '暂无'}
                    </li>
                    <li>
                      电话：{' '}
                      {Object.keys(storeDetailsData).length > 0
                        ? storeDetailsData.principalInfo.phone
                        : '暂无'}
                    </li>
                    <li>
                      身份证号：
                      {Object.keys(storeDetailsData).length > 0
                        ? storeDetailsData.principalInfo.idCard
                        : '暂无'}
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.leader_right}>
                <div className={styles.manager}>
                  <img
                    className={styles.imgIdContrary}
                    src={
                      Object.keys(storeDetailsData).length > 0
                        ? storeDetailsData.principalInfo.idContraryImage
                        : noImg
                    }
                    alt="暂无图片"
                  />
                </div>
                <div className={styles.manager}>
                  <img
                    className={styles.imgIdContrary}
                    src={
                      Object.keys(storeDetailsData).length > 0
                        ? storeDetailsData.principalInfo.idFrontImage
                        : noImg
                    }
                    alt="暂无图片"
                  />
                </div>
              </div>
            </div>
            {/* 商家详细信息 */}
            <div className={styles.detailed_information}>
              <div className={styles.detailed_left}>
                <h3>商家详细信息</h3>
                <div className={styles.detailed_all}>
                  <ul>
                    <li>
                      人均消费：￥
                      {Object.keys(storeDetailsData).length > 0
                        ? storeDetailsData.sellerDetailInfo.perCapitaAmount / 100
                        : 0}
                    </li>
                    <li>
                      今日订单：
                      {Object.keys(storeDetailsData).length > 0
                        ? storeDetailsData.sellerDetailInfo.orderToday
                        : 0}
                      笔
                    </li>
                    <li>
                      历史订单：
                      {Object.keys(storeDetailsData).length > 0
                        ? storeDetailsData.sellerDetailInfo.orderHistory
                        : 0}
                      笔
                    </li>
                    <li>经营范围：{categoryNameStr || '暂无'}</li>
                    <li>营业时间：{businessTime || '暂无'}</li>
                    <li>店铺服务：{serverStr || '暂无'}</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* 商品详情 */}
            {/* <div className={styles.commodity_detailed}>
                    <h3>商品详情</h3>
                    <div className={styles.commodity_all}>
                        <ul>
                            <li>人均消费：￥{Object.keys(storeDetailsData).length > 0 ? (storeDetailsData.perCapitaAmount / 100) : 0}</li>
                            <li>今日订单：{Object.keys(storeDetailsData).length > 0 ? storeDetailsData.orderToday : 0}笔</li>
                            <li>历史订单：{Object.keys(storeDetailsData).length > 0 ? storeDetailsData.orderHistory : 0}笔</li>
                            <li>营业时间：{businessTime}</li>
                            <li>店铺服务：{serverStr}</li>
                        </ul>
                    </div>
                </div> */}
          </div>
        }
      />
    );
  }
}
export default Information;
