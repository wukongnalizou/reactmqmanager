import React, { Component } from 'react';
// 创建商品组件
import { Modal, Button, Input, Tabs, Radio } from 'antd';
import { connect } from 'dva';
// 上传图片组件
import UploadView from '@/components/MqComponent/UploadView';
import UploadFilesView from '@/components/MqComponent/UploadFiles';
/**
 * 模块：基础配置
 * 页面：头像框管理
 * 组件：创建头像框
 * modifyDate:2019-06-24
 * author:Cin
 */

// 标签页
const { TabPane } = Tabs;
const RadioGroup = Radio.Group;
function callback(key) {
  console.log(key);
}
@connect(({ avatar }) => ({
  movingUrl: avatar.movingUrl,
  staticUrl: avatar.staticUrl,
}))
class AatarCreatView extends Component {
  state = {
    visible: false,
    avatarName: '',
    avatarCondition: '',
    // 选择类型
    getType: 0,
  };

  /**
   * 创建头像框显示
   */
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  /**
   * 创建头像框取消隐藏
   */
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
          创建头像框
        </Button>
        <Modal
          title="创建头像框"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="静态头框" key="1">
              <p style={{ marginTop: 4 }}>头像框名称</p>
              <Input
                style={{ marginBottom: 20 }}
                size="large"
                placeholder="输入名称"
                onChange={e => {
                  this.inputData(e);
                }}
              />
              <p style={{ marginTop: 4 }}>头像框描述</p>
              <Input
                style={{ marginBottom: 20 }}
                size="large"
                placeholder="描述内容"
                onChange={e => {
                  this.inputDataCondition(e);
                }}
              />
              <p style={{ marginTop: 4 }}>头像框获取方式</p>
              <RadioGroup
                name="radiogroup"
                defaultValue={0}
                onChange={(e, name) => {
                  this.typeChange(e, 'type');
                }}
                style={{ marginBottom: 20 }}
              >
                <Radio value={0}>默认</Radio>
              </RadioGroup>
              {/* 上传图片  */}
              <UploadView />
            </TabPane>
            <TabPane tab="动态头框" key="2">
              {/* <p style={{ marginTop: 4}}>头像框名称</p>
                <Input style={{ marginBottom: 20}} size="large" placeholder="输入名称" /> */}
              {/* 上传文件  */}
              <UploadFilesView />
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    );
  }

  /**
   * 头像框名称输入
   */
  inputData(e) {
    this.state.avatarName = e.target.value;
  }

  /**
   * 头像框描述输入
   */
  inputDataCondition(e) {
    this.state.avatarCondition = e.target.value;
  }

  /**
   * 创建头像框确认
   */
  handleOk = e => {
    const { dispatch, movingUrl, staticUrl } = this.props;
    dispatch({
      type: 'avatar/fetchAddPhotoFrame',
      payload: {
        conditions: this.state.avatarCondition,
        createTime: new Date().getTime(),
        id: '',
        ossUrl: movingUrl,
        pfName: this.state.avatarName,
        staticUrl,
        type: this.state.getType,
        updateTime: new Date().getTime(),
      },
    });
    this.setState({
      visible: false,
    });
  };

  /**
   * 选择获取类型
   */
  typeChange(e) {
    this.state.getType = e.target.value;
  }
}
export default AatarCreatView;
