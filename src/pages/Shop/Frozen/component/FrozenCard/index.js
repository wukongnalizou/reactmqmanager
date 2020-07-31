import React, { Component } from 'react';
import { Card, Icon, Avatar, Button, Modal, Input, Form, Radio, Rate } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './index.less';
/**
 * 模块：商户中心
 * 页面：冻结中用户
 * 组件：卡片
 */
const { Meta } = Card;
const { TextArea } = Input;
@connect(({ frozen }) => ({
  appliedData: frozen.appliedData, // 已冻结中商户数据
  freezeStatus: frozen.freezeStatus, // 控制冻结（解冻）是否成功
  // freezeStatus: frozen.freezeStatus, // 控制冻结（解冻）是否成功
  // freezeLoading:loading.effects['frozen/freezeBusiness'] || loading.effects['frozen/freezeAccount'],
}))
@Form.create()
class FrozenCardView extends Component {
  state = {
    visible: false,
    sellerId: '', // 商户id
  };
  // confirm = (e, sellerId) => {
  //   const { dispatch } = this.props
  //   dispatch({
  //     type: 'frozen/freezeBusiness',
  //     payload: {
  //       command: 0,
  //       sellerId,
  //     }
  //   }).then(()=>{
  //     // 刷新页面
  //     const { freezeStatus } =this.props;
  //     if(freezeStatus) {
  //       window.location.reload()
  //     }
  //   })
  // }

  showModal = (e, id) => {
    this.setState({
      visible: true,
      sellerId: id,
    });
  };

  handleOk = (e, sellerId) => {
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      const type = values.freezeType === 1 ? 'frozen/freezeBusiness' : 'frozen/freezeAccount';
      const status = values.freezeType === 1 ? 'command' : 'status';
      if (!err) {
        dispatch({
          type,
          payload: {
            [status]: 0,
            sellerId,
          },
        }).then(() => {
          this.setState({
            visible: false,
          });
          dispatch({
            type: 'frozen/getApplied',
            payload: {
              pageNum: 1,
              pageSize: 10,
              param: {
                status: 6,
              },
            },
          });
          // 刷新页面
          // const { freezeStatus } = this.props;
          // if (freezeStatus) {
          //   window.location.reload()
          // }
        });
      }
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      appliedData,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.shopaCard}>
        {appliedData.length > 0
          ? appliedData.map(item => {
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
                      //   <Icon type="pay-circle" />
                      //   <div style={{ marginBottom: -10 }}>账务</div>
                      // </div>
                      <div onClick={e => this.showModal(e, item.sellerId)}>
                        <Icon type="lock" />
                        {/* <Popconfirm
                      title="确定解冻此账户?"
                      onConfirm={(e) => this.confirm(e, item.sellerId)}
                      onCancel={this.cancel}
                      okText="是"
                      cancelText="否"
                    >
                      <div style={{ marginBottom: -10 }}>解冻</div>
                    </Popconfirm> */}
                        <div style={{ marginBottom: -10 }}>解冻</div>
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
                          <div style={{ marginBottom: -10 }}>活动</div>
                        </Link>
                      </div>,
                      <div>
                        <Link to={`/shop/overShop/information?sellerId=${item.sellerId}`}>
                          <Icon type="ellipsis" />
                          <div style={{ marginBottom: -10 }}>详情</div>
                        </Link>
                      </div>,
                    ]}
                  >
                    <Meta avatar={<Avatar src={item.image} />} title={item.sellerName} />
                    <Rate disabled defaultValue={item.score / 10} />
                    <div className={styles.data}>人均：¥{item.perCapitaAmount / 100}</div>
                    <div className={styles.data}>今日订单：{item.orderToday}</div>
                    <div className={styles.data}>历史订单：{item.orderHistory}</div>
                    <div className={styles.data}>
                      电话：{item.sellerPhone}(负责人：{item.principalName})
                    </div>
                    <div className={styles.data}>地址：{item.address}</div>
                    <div className={styles.data}>
                      店铺冻结状态：{item.isEnabled === true ? '已冻结' : '正常'}
                    </div>
                    <div className={styles.data}>
                      账户冻结状态：{item.accountStatus === 0 ? '正常' : '已冻结'}
                    </div>
                  </Card>
                </div>
              );
            })
          : '暂无数据'}
        <Modal
          title="解冻此账户"
          visible={this.state.visible}
          onOk={e => this.handleOk(e, this.state.sellerId)}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <div>选择解冻类型</div>
          <Form hideRequiredMark>
            <Form.Item>
              <div style={{ width: 455, marginTop: 20 }}>
                {getFieldDecorator('freezeType', {
                  rules: [{ required: true, message: '请选择解冻类型' }],
                })(
                  <Radio.Group>
                    <Radio value={1}>店铺</Radio>
                    <Radio value={2}>账户</Radio>
                  </Radio.Group>,
                )}
              </div>
            </Form.Item>
          </Form>
        </Modal>
        {/* <div className={styles.card}>
          <Card
            actions={[
              <div>
                <Icon type="file-text" />
                <div style={{ marginBottom: -10 }}>订单</div>
              </div>
              ,
              <div>
                <Icon type="pay-circle" />
                <div style={{ marginBottom: -10 }}>账务</div>
              </div>
              ,
              <div>
                <Link to='/shop/freezing'>
                  <Icon type="unlock" />
                  <div style={{ marginBottom: -10 }}>解冻</div>
                </Link>
              </div>
              ,
              <div>
                <Icon type="shop" />
                <div style={{ marginBottom: -10 }}>店面</div>
              </div>
              ,
              <div>
                <Link to='/shop/active'>
                  <Icon type="gift" />
                  <div style={{ marginBottom: -10 }}>活动</div>
                </Link>
              </div>
              ,
              <div>
                <Link to='/shop/information'>
                  <Icon type="ellipsis" />
                  <div style={{ marginBottom: -10 }}>详情</div>
                </Link>
              </div>
            ]}
          >
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title="李记酸菜鱼"
            />
            <Rate disabled defaultValue={3} />
            <div className={styles.data}>人均：¥120</div>
            <div className={styles.data}>今日订单：7笔</div>
            <div className={styles.data}>历史订单：1534笔</div>
            <div className={styles.data}>电话：024-6815-6616（负责人：董某某）</div>
            <div className={styles.data}>地址：辽宁省沈阳市皇姑区黄河北大街33号中汇广场A座4楼</div>
            <div className={styles.data}>冻结时间：2018-11-27 11:01:15</div>
          </Card>
        </div> */}
      </div>
    );
  }
}
export default FrozenCardView;
