import React, { Component } from 'react';
import Link from 'umi/link';
import { Modal, Input, Rate, Card, Icon, Avatar, Form, Popconfirm } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
/**
 * 模块：商户中心
 * 页面：已入驻商户
 * 组件：商家简介卡片
 * @author: zhaoyijin/lisimeng/songshuyu
 */
// 对话框input
const { TextArea } = Input;
// 对话框
const { Meta } = Card;
@connect(({ shop }) => ({
  shop,
  appliedData: shop.appliedData, // 已入驻商户数据
  freezeStatus: shop.freezeStatus, // 控制冻结（解冻）是否成功
}))
@Form.create()
class ShopCardView extends Component {
  state = {
    visible: false,
  };
  // showModal = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // }

  // handleOk = (e) => {
  //   console.log('e',e)
  //   this.setState({
  //     visible: false,
  //   });
  // }

  // handleCancel = (e) => {
  //   this.setState({
  //     visible: false,
  //   });
  // }
  confirm = (e, sellerId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'shop/freezeBusiness',
      payload: {
        command: 1,
        sellerId,
      },
    }).then(() => {
      // 刷新页面
      const { freezeStatus } = this.props;
      if (freezeStatus) {
        window.location.reload();
      }
    });
  };

  render() {
    const { appliedData } = this.props;
    return (
      <div className={styles.shopaCard}>
        {/* 循环渲染已入驻商户列表 */}
        {appliedData.length > 0
          ? appliedData.map((item, index) => {
              return (
                <div key={item.sellerId} className={styles.card}>
                  <Card
                    actions={[
                      <div>
                        <Link to={`/shop/overShop/shopOrder?sellerId=${item.sellerId}`}>
                          <Icon type="file-text" />
                          <p style={{ marginBottom: -10 }}>订单</p>
                        </Link>
                      </div>,
                      // ,
                      // <div>
                      //   <Link to='/shop/shopTransaction'>
                      //     <Icon type="pay-circle" />
                      //     <p style={{ marginBottom: -10 }}>账务</p>
                      //   </Link>
                      // </div>
                      <div>
                        <Popconfirm
                          title="确定冻结此账户?"
                          onConfirm={e => this.confirm(e, item.sellerId)}
                          okText="是"
                          cancelText="否"
                        >
                          <Icon type="lock" />
                          <p style={{ marginBottom: -10 }}>冻结</p>
                        </Popconfirm>
                        <Modal
                          title="冻结此商户"
                          visible={this.state.visible}
                          onOk={this.handleOk}
                          onCancel={this.handleCancel}
                        >
                          <p>填写冻结原因</p>
                          <p>
                            <TextArea rows={4} />
                          </p>
                        </Modal>
                      </div>,
                      <div>
                        <Link to={`/shop/overShop/storefront?sellerId=${item.sellerId}`}>
                          <Icon type="shop" />
                          <p style={{ marginBottom: -10 }}>店面</p>
                        </Link>
                      </div>,
                      <div>
                        <Link to={`/shop/overShop/active?sellerId=${item.sellerId}`}>
                          <Icon type="gift" />
                          <p style={{ marginBottom: -10 }}>活动</p>
                        </Link>
                      </div>,
                      <div>
                        <Link to={`/shop/overShop/information?sellerId=${item.sellerId}`}>
                          <Icon type="ellipsis" />
                          <p style={{ marginBottom: -10 }}>详情</p>
                        </Link>
                      </div>,
                    ]}
                  >
                    <Meta avatar={<Avatar src={item.image} />} title={item.sellerName} />
                    <Rate disabled defaultValue={item.score / 10} />
                    <p className={styles.data}>人均：¥{item.perCapitaAmount / 100}</p>
                    <p className={styles.data}>今日订单：{item.orderToday}</p>
                    <p className={styles.data}>历史订单：{item.orderHistory}</p>
                    <p className={styles.data}>电话：{item.sellerPhone}</p>
                    <p className={styles.data}>负责人：{item.principalName}</p>
                    <p className={styles.data}>地址：{item.address}</p>
                  </Card>
                </div>
              );
            })
          : '暂无数据'}
      </div>
    );
  }
}
export default ShopCardView;
