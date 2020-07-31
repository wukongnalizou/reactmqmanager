import React, { Component } from 'react';
import { Modal, Button, Radio, Input } from 'antd';
import { connect } from 'dva';
/**
 * 模块：运营中心
 * 页面：活动中心-兑换券充值
 * 组件：增加商品
 */
@connect(({ ticket }) => ({
  resetId: ticket.resetId,
  product: ticket.product,
}))
export default class AddTicketView extends Component {
  state = {
    visible: false,
    info: {}, // 添加的兑换券信息
  };

  showModal = () => {
    if (this.props.type === 'reset') {
      const { dispatch } = this.props;
      dispatch({
        type: 'ticket/fetchFindProductById',
        payload: {
          id: this.props.id,
        },
      }).then(() => {
        this.setVisible();
      });
    } else {
      this.setVisible();
    }
  };

  handleOk = () => {
    console.log(this.props.type);
    if (this.props.type === 'add') {
      // 添加商品
      this.addProduct();
    } else {
      // 修改商品
      this.updateProduct(this.state.info.name, this.state.info.number, this.state.info.prize);
    }
  };

  // 添加商品
  addProduct() {
    const { dispatch } = this.props;
    dispatch({
      type: 'ticket/fetchAddProduct',
      payload: {
        productNumber: this.state.info.number, // 商品数量
        currencyPrice: this.state.info.prize,
        haveInventory: false,
        payType: 1,
        productName: this.state.info.name,
        productType: 0,
        virtualProductServerId: '1125656796900102144',
        productDetailTypeId: '1126409348205776896',
        productCode: 'MOOMKINGPLAN_CERTIFICATE',
      },
    }).then(() => {
      this.props.addSuccess('yes');
      this.setVisible();
    });
  }

  // 修改商品
  updateProduct(productName, productNumber, currencyPrice) {
    const { dispatch } = this.props;
    dispatch({
      type: 'ticket/fetchUpdateProduct',
      payload: {
        id: this.props.id,
        currencyPrice,
        productName,
        productNumber,
      },
    }).then(() => {
      this.props.addSuccess('yes');
      this.setVisible();
    });
  }

  handleCancel = e => {
    this.setVisible();
  };

  // 输入信息
  inputMessage(e, name) {
    this.state.info[name] = e.target.value;
  }

  // 控制显示隐藏
  setVisible() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  render() {
    const { resetId, product } = this.props;
    return (
      <div>
        <Button
          // style={{ width: 100, height: 40, marginBottom: 10 }}
          type="primary"
          onClick={this.showModal}
        >
          {this.props.name}
        </Button>
        <Modal
          title={this.props.name}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p style={{ marginTop: 4 }}>商品名称</p>
          <Input
            style={{ marginBottom: 20 }}
            size="large"
            placeholder={this.props.type === 'add' ? '请输入名称' : product.productName}
            onChange={e => {
              this.inputMessage(e, 'name');
            }}
          />
          <p style={{ marginTop: 4 }}>商品个数</p>
          <Input
            style={{ marginBottom: 20 }}
            size="large"
            placeholder={this.props.type === 'add' ? '请输入个数' : product.productNumber}
            onChange={e => {
              this.inputMessage(e, 'number');
            }}
          />
          {/* <p style={{ marginTop: 4 }}>标准人民币价格</p>
          <Input style={{ marginBottom: 20 }} size="large" placeholder="请输入价格（整数单位：分）" /> */}
          <p style={{ marginTop: 4 }}>虚拟货币价格</p>
          <Input
            style={{ marginBottom: 20 }}
            size="large"
            placeholder={
              this.props.type === 'add' ? '请输入价格（整数单位：个）' : product.currencyPrice
            }
            onChange={e => {
              this.inputMessage(e, 'prize');
            }}
          />
          {/* <p style={{ marginTop: 4 }}>IOS人民币价格</p>
          <Input style={{ marginBottom: 20 }} size="large" placeholder="请输入价格（整数单位：分）" /> */}
        </Modal>
      </div>
    );
  }
}
