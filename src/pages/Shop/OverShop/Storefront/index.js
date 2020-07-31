import React, { Component } from 'react';
import { Avatar, Rate } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './index.less';
import noImg from '@/assets/global/noImg.jpg';
/**
 * 模块：商户中心-新申请入驻
 * 页面：详情
 * @author：zhaoyijn songshuyu
 */
// @connect(({ shop, sellerOrder }) => ({
//   storeDetailsData: shop.storeDetailsData, // 商家详细信息
//   businessTime: shop.businessTime, // 店铺营业时间
//   categoryNameStr: shop.categoryNameStr, // 店铺经营范围
//   serverStr: shop.serverStr, // 店铺服务
//   detailsGoddsData: sellerOrder.detailsGoddsData, // 商品详情
//   secondCategory: sellerOrder.secondCategory, // 经营范围二类
//   goodsStatus: sellerOrder.goodsStatus, // 商家状态
//   firstCategoryName: sellerOrder.firstCategoryName, // 经营范围一类名称
// }))

@connect(({ storefront }) => ({
  storeDetailsData: storefront.storeDetailsData, // 商家详细信息
  businessTime: storefront.businessTime, // 店铺营业时间
  categoryNameStr: storefront.categoryNameStr, // 店铺经营范围
  serverStr: storefront.serverStr, // 店铺服务
  detailsGoddsData: storefront.detailsGoddsData, // 商品详情
  secondCategory: storefront.secondCategory, // 经营范围二类
  goodsStatus: storefront.goodsStatus, // 商家状态
  firstCategoryName: storefront.firstCategoryName, // 经营范围一类名称
}))
class Information extends Component {
  state = {};

  // 初始化
  componentDidMount() {
    this.dataFill(); // 获取已审核商家信息
    this.getGoodsDetails(); // 获取商品详情
  }

  /**
   * 获取商品详情
   */
  getGoodsDetails = () => {
    const { dispatch, sellerId } = this.props;
    dispatch({
      type: 'storefront/goodsDetails',
      payload: {
        pageNum: 1,
        pageSize: 10,
        param: {
          sellerId: this.props.location.query.sellerId,
        },
      },
    });
  };

  /**
   * 获取已审核商家信息
   */
  dataFill() {
    const { dispatch } = this.props;
    dispatch({
      type: 'storefront/storeDetails',
      payload: {
        id: this.props.location.query.sellerId,
      },
    });
  }

  render() {
    const {
      storeDetailsData,
      firstCategoryName,
      detailsGoddsData,
      secondCategory,
      goodsStatus,
    } = this.props;
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
            {/* 商品详情 */}
            <div className={styles.business_information}>
              <div className={styles.information_left}>
                <h3>商品详情</h3>
                <div className={styles.commodity_all}>
                  <ul>
                    <li>
                      商品名称：
                      {Object.keys(detailsGoddsData).length > 0
                        ? detailsGoddsData.goodsName
                        : '暂无'}
                    </li>
                    <li>
                      人均消费：￥
                      {Object.keys(detailsGoddsData).length > 0
                        ? detailsGoddsData.average / 100
                        : 0}
                    </li>
                    <li>
                      最大人数：
                      {Object.keys(detailsGoddsData).length > 0 ? detailsGoddsData.maxNumber : 0}
                    </li>
                    <li>
                      最小人数：
                      {Object.keys(detailsGoddsData).length > 0 ? detailsGoddsData.minNumber : 0}
                    </li>
                    <li>
                      经营范围一类：
                      {Object.keys(detailsGoddsData).length > 0 ? firstCategoryName : '暂无'}
                    </li>
                    <li>
                      经营范围二类：
                      {Object.keys(detailsGoddsData).length > 0 ? secondCategory : '暂无'}
                    </li>
                    <li>
                      商品状态：{Object.keys(detailsGoddsData).length > 0 ? goodsStatus : '暂无'}
                    </li>
                    <li className={styles.img_li}>
                      <span className={styles.img_name}>商品主图：</span>
                      <span className={styles.commodity}>
                        <img
                          className={styles.imgImages}
                          src={detailsGoddsData.image}
                          alt="暂无图片"
                        />
                      </span>
                    </li>
                    <li className={styles.img_li}>
                      <div className={styles.upload}>
                        <span className={styles.img_name}>商品详情图：</span>
                        {detailsGoddsData.images ? (
                          detailsGoddsData.images.map(item => {
                            return (
                              <span className={styles.commodity} key={item.id}>
                                <img
                                  className={styles.imgImages}
                                  src={item.imgUrl}
                                  alt="暂无图片"
                                />
                              </span>
                            );
                          })
                        ) : (
                          <span className={styles.commodity}>
                            <img className={styles.imgImages} src={noImg} alt="暂无图片" />
                          </span>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        }
      />
    );
  }
}
export default Information;
