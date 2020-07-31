import React, { Component } from 'react';
import { Modal, Button, Menu, Select, Icon, Checkbox, Form, Input } from 'antd';
// import DropdownView from '../Classification/Dropdown';
import { connect } from 'dva';
import styles from './index.less';
/**
 * 模块：分类服务
 * 页面：类别管理
 * 组件：添加
 */
// function handleMenuClick(e) {
//   message.info('Click on menu item.');
// }
// 多选标签组件
const CheckboxGroup = Checkbox.Group;
// const plainOptions = ['英雄联盟', '王者荣耀', '跑跑卡丁车'];
@connect(({ serve }) => ({
  serveListData: serve.serveListData, // 一级分类数据
  serveCateSubmitStatus: serve.serveCateSubmitStatus, // 判断添加一个二级类是否成功
  serveCateInfoData: serve.serveCateInfoData, // 一个二级类详情
  ServeCateData: serve.ServeCateData, // 二级分类数据
}))
@Form.create()
class ModalView extends Component {
  state = {
    visible: false,
    twoLevelStatus: false, // 控制二级分类是否显示
  };

  showModal = () => {
    this.props.form.resetFields();
    this.setState({
      visible: true,
      isEdit: false, // 是否是编辑模式
      levelStatus: false, // 控制二级类目是否显示
      // twoLevelrequired:false, // 控制二级类目是否显示
    });
  };

  // 初始化
  componentDidMount() {
    this.props.onRef(this);
  }

  /*
   * 提交
   */
  handleOk = e => {
    const { form, dispatch, serveListData } = this.props;
    const { isEdit, id } = this.state;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const data = values;
      // let code = ''
      // serveListData.map(item=>{
      //   if(data.parentId === item.id){
      //     code = item.code
      //   }
      // })
      if (!data.parentId) {
        Object.assign(data, {
          parentId: -1,
        });
      }
      if (!err) {
        Object.assign(data, {
          sort: '0', // 排序默认传0
        });
        const type = isEdit === true ? 'serve/serveCateEdit' : 'serve/serveCateSubmit';
        if (isEdit === true) {
          Object.assign(data, { id });
        }
        dispatch({
          type,
          payload: data,
        }).then(() => {
          const { serveCateSubmitStatus } = this.props;
          if (serveCateSubmitStatus) {
            this.setState({
              visible: false,
            });
          }
        });
      }
    });
  };

  /**
   * 编辑
   */
  editChild = id => {
    this.props.form.resetFields();
    this.setState({
      visible: true,
      id,
    });
    const { dispatch, form } = this.props;
    dispatch({
      type: 'serve/getserveCateInfo',
      payload: { id },
    }).then(() => {
      const { serveCateInfoData } = this.props;
      this.setState({
        isEdit: true,
        // imageValue: serveCateInfoData.imgUrl,
      });
      if (serveCateInfoData.parentId === '-1') {
        form.setFieldsValue({
          name: serveCateInfoData.name,
          typeCode: serveCateInfoData.typeCode,
        });
      } else {
        form.setFieldsValue({
          name: serveCateInfoData.name,
          parentId: serveCateInfoData.parentId,
          typeCode: serveCateInfoData.typeCode,
        });
      }
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  /**
   * 点击一级分类
   */
  oneLevel(e) {
    const { dispatch } = this.props;
    if (e === 'goods') {
      dispatch({
        type: 'serve/getServeCateList',
        payload: {
          code: e,
          parentId: '-1',
        },
      });
      this.setState({
        levelStatus: true, // 将二级类显示
      });
    } else {
      this.setState({
        levelStatus: false, // 将二级类隐藏
      });
    }
  }

  /**
   * 点击二级分类
   */
  twoLevel(e) {
    const { dispatch } = this.props;
    dispatch({
      type: 'serve/getServeCateList',
      payload: {
        code: 'goods',
        parentId: e,
      },
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
      serveListData,
      ServeCateData,
    } = this.props;
    const { levelStatus } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          添加
        </Button>
        <Modal visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          {/* 下拉选 */}
          {/* <DropdownView /> */}
          {/* 下拉选组件 */}
          <Form hideRequiredMark>
            <Form.Item>
              <p className={styles.text}>一级分类：</p>
              {getFieldDecorator('typeCode', {
                rules: [{ required: true, message: '请选择一级分类' }],
              })(
                <Select placeholder="请选择一级分类" onChange={e => this.oneLevel(e)}>
                  {this.props.serveListData.map(item => (
                    <Select.Option key={item.id} value={item.code}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
            <Form.Item className={levelStatus === true ? '' : styles.none}>
              <p className={styles.text}>二级分类：</p>
              {getFieldDecorator('parentId', {
                rules: [{ required: false, message: '请选择二级分类' }],
              })(
                <Select placeholder="请选择二级分类" onChange={e => this.twoLevel(e)}>
                  {ServeCateData.length > 0
                    ? this.props.ServeCateData.map(item => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))
                    : ''}
                </Select>,
              )}
            </Form.Item>
            <p className={styles.text}>名称：</p>
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入名称' }],
              })(<Input autoComplete = "off" placeholder="输入名称" />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default ModalView;
