import React, { Component } from 'react';
import { Card, Icon, Avatar, Form } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
// 时间转换控件
import moment from 'moment';
import styles from './index.less';
/**
 * 模块：商户中心
 * 页面：审核
 * 组件：卡片
 * @author songshuyu
 */

const { Meta } = Card;
@connect(({ newArrivals }) => ({
  newArrivals,
  ApplyingData: newArrivals.ApplyingData,
}))
@Form.create()
class NewCardView extends Component {
  state = {};
  // 初始化

  render() {
    const { ApplyingData } = this.props;
    return (
      <div className={styles.shopaCard}>
        {ApplyingData.length > 0
          ? ApplyingData.map(item => {
              return (
                <div key={item.id} className={styles.card}>
                  <Card
                    actions={[
                      // <div>
                      //   <Link to={`/shop/information?sellerId=${item.sellerInfo.sellerId}`}>
                      //     <Icon type="ellipsis"/>
                      //     <p style={{ marginBottom:-10}}>详情</p>
                      //   </Link>
                      // </div>
                      // ,
                      <div>
                        <Link
                          disabled={!!(item.status === 2 || item.status === 3)}
                          to={`/shop/newArrivals/examine?sellerId=${item.sellerInfo.sellerId}&Id=${item.id}&sellerUserId=${item.sellerUserId}&userId=${item.userId}`}
                        >
                          <Icon type="check-circle" />
                          <p style={{ marginBottom: -10 }}>
                            {item.status === 1 ? '开户' : item.status === 2 || item.status === 3 ? null : '审核'}
                          </p>
                        </Link>
                      </div>,
                    ]}
                  >
                    <Meta
                      avatar={<Avatar src={item.sellerInfo.image} />}
                      title={item.sellerInfo.name}
                    />
                    <p className={styles.data}>地址：{item.sellerInfo.address}</p>
                    <p className={styles.data}>电话：{item.sellerInfo.phone}</p>
                    <p className={styles.data}>负责人：{item.sellerInfo.principalName}</p>
                    <p className={styles.data}>
                      申请时间：{moment(item.createTime).format('YYYY-MM-DD hh:mm')}
                    </p>
                    {/* <p className={styles.data}>审核状态：<span>{item.status===0?'待审核':'已驳回'}</span></p> */}
                    <p className={styles.data}>审核人：{item.userName ? item.userName : '暂无'}</p>
                    <p className={styles.data}>
                      最后审核时间：{moment(item.applyTime).format('YYYY-MM-DD hh:mm')}
                    </p>
                  </Card>
                </div>
              );
            })
          : '暂无数据'}
      </div>
    );
  }
}
export default NewCardView;
