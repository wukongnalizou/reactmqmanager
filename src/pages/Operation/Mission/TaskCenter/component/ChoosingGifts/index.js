import React, { Component } from 'react';
import { Modal, Button, Card } from 'antd';
import { connect } from 'dva';
import mogu from '@/assets/task/logo.png';
import certificate from '@/assets/task/ticket.png';
import styles from './index.less';
/**
 * 模块：运营中心-任务中心
 * 页面：选择礼品
 * 组件：弹出、卡片
 * modifyDate:2019-07-01
 * author:Cin
 */
// 卡片
const { Meta } = Card;
@connect(({ task }) => ({
  giftList: task.giftList, // 礼品列表
}))
class ChoosingGiftsView extends Component {
  state = {
    loading: false,
    visible: false,
    // 绑定礼品显示内容
    giftContent: '选择礼品',
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  chooseClick(e, id, name) {
    this.setState({
      giftContent: name,
      visible: false,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'task/setGiftId',
      payload: {
        giftId: id,
      },
    });
  }

  render() {
    const { visible, loading } = this.state;
    const { giftList } = this.props;
    return (
      <div>
        <Button onClick={this.showModal}>{this.state.giftContent}</Button>
        <Modal
          visible={this.state.visible}
          // title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={
            [
              // <Button key="back" onClick={this.handleCancel}>返回</Button>,
              // <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              //   创建商品
              // </Button>,
            ]
          }
        >
          <div className={styles.gift}>
            {giftList.map((item, index) => (
                <div className={styles.giftOne} key={index}>
                  <Card
                    style={{ width: 200 }}
                    hoverable
                    cover={
                      item.serviceName === 'store-service' ? (
                        <img alt="example" src={mogu} />
                      ) : (
                        <img alt="example" src={certificate} />
                      )
                    }
                    onClick={e => {
                      this.chooseClick(e, item.id, item.name);
                    }}
                  >
                    <Meta className={styles.title} title={item.name} />
                  </Card>
                </div>
              ))}
          </div>
        </Modal>
      </div>
    );
  }
}
export default ChoosingGiftsView;
