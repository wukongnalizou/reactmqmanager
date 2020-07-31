import React, { Component } from 'react';
// 创建商品组件
import { Input, Modal, Button } from 'antd';
/**
 * 模块：运营中心
 * 页面：任务中心-任务奖励
 * 组件：创建奖品
 */
export default class GiftCreateView extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button
          style={{ width: 100, height: 40, marginBottom: 10 }}
          type="primary"
          onClick={this.showModal}
        >
          创建奖品
        </Button>
        <Modal
          title="创建奖品"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p style={{ marginTop: 4 }}>奖品名称</p>
          <Input size="large" placeholder="输入名称" style={{ marginBottom: 20 }} />
          <p style={{ marginTop: 8 }}>库存</p>
          <Input size="large" placeholder="输入库存" style={{ marginBottom: 20 }} />
          <p style={{ marginTop: 8 }}>价值</p>
          <Input size="large" placeholder="输入金额" style={{ marginBottom: 20 }} />
          <p style={{ marginTop: 8 }}>礼品描述</p>
          <Input size="large" placeholder="输入该奖品描述" style={{ marginBottom: 20 }} />
          <p style={{ marginTop: 8 }}>接口地址</p>
          <Input size="large" placeholder="输入接口地址" style={{ marginBottom: 20 }} />
          <p style={{ marginTop: 8 }}>参数变量名</p>
          <Input size="large" placeholder="输入参数变量名" style={{ marginBottom: 20 }} />
          <p style={{ marginTop: 8 }}>服务名</p>
          <Input size="large" placeholder="输入服务名" style={{ marginBottom: 20 }} />
        </Modal>
      </div>
    );
  }
}
