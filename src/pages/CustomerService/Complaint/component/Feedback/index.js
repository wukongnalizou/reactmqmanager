import React, { Component } from 'react';
// 创建商品组件
import { Modal, Button, Input } from 'antd';
import { connect } from 'dva';
/**
 * 模块：客服中心
 * 页面：投诉反馈
 * 组件：反馈按钮
 */
const { TextArea } = Input;
@connect(({ complain }) => ({}))
class FeedbackView extends Component {
  state = {
    visible: false,
    // 反馈内容
    feedBackContent: '',
  };

  /**
   * 反馈
   */
  showModal(e) {
    this.setState({
      visible: true,
    });
  }

  /**
   * 提交反馈
   */
  handleOk = e => {
    this.setState({
      visible: false,
    });
    if (this.props.type === 'shop') {
      this.feedBackSeller();
    } else {
      this.feedBackUser();
    }
  };

  /**
   * 取消反馈
   */
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  /**
   * 输入评价
   */
  inputContent(e) {
    this.state.feedBackContent = e.target.value;
  }

  /**
   * 反馈商家投诉
   */
  feedBackSeller() {
    const { dispatch } = this.props;
    dispatch({
      type: 'complain/fetchApplySellerComplain',
      payload: {
        id: this.props.id,
        isNotarize: true,
        remark: this.state.feedBackContent,
        status: 2,
      },
    }).then(() => {
      this.props.transMsg('ok');
    });
  }

  /**
   * 反馈用户投诉
   */
  feedBackUser() {
    const { dispatch } = this.props;
    dispatch({
      type: 'complain/fetchApplyUserComplain',
      payload: {
        id: this.props.id,
        isNotarize: true,
        remark: this.state.feedBackContent,
        status: 2,
      },
    }).then(() => {
      this.props.transMsg('ok');
    });
  }

  render() {
    return (
      <div>
        <Button style={{ width: 80, height: 35 }} type="primary" onClick={e => this.showModal(e)}>
          反馈
        </Button>
        <Modal
          title="反馈此用户"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p style={{ marginTop: 4 }}>反馈内容</p>
          <TextArea
            rows={4}
            onChange={e => {
              this.inputContent(e);
            }}
          />
        </Modal>
      </div>
    );
  }
}
export default FeedbackView;
