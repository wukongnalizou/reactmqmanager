import React, { Component } from 'react';
// 创建商品组件
import { Modal, Button, Form, Cascader, Input, Radio } from 'antd';
import { connect } from 'dva';
import Cities from '@/utils/cities';
/**
 * 模块：基础配置
 * 页面：商圈管理
 * 组件：创建商圈
 * author：songshuyu
 */
// 是否热门单选
const RadioGroup = Radio.Group;
@connect(({ configuration, loading }) => ({
  total: configuration.total, // 数据总条数
  // UploadListValue: configuration.UploadListValue,
  circlesStatus: configuration.circlesStatus, // 控制提交是否成功
  visible: configuration.visible,
  CirclesEditData: configuration.CirclesEditData, // 获取单个商圈信息，回填
  // pageNum: configuration.pageNum, // 当前页
  // pageSize: configuration.pageSize, // 每页条数
  // loginGoods: loading.effects['storeReview/addGoods'] || loading.effects['storeReview/updateGoods'],
}))
@Form.create()
class BusinessCreatView extends Component {
  state = {
    visible: false,
    categoryData: [], // 商圈
    isEdit: false, // 是否是修改
    id: '',
    imageValue: '', // 商圈图片
  };

  // 初始化
  componentDidMount() {
    this.citiesAll(); // 获取所在商圈
    this.props.onRef(this);
  }

  editChild = id => {
    this.setState({
      visible: true,
      id,
    });
    const { dispatch, form } = this.props;
    dispatch({
      type: 'configuration/getCirclesEdit',
      payload: { id },
    }).then(() => {
      const { CirclesEditData } = this.props;
      this.setState({
        isEdit: true,
        imageValue: CirclesEditData.imgUrl,
      });
      form.setFieldsValue({
        name: CirclesEditData.name,
        province: [CirclesEditData.province, CirclesEditData.city, CirclesEditData.area],
        isHot: CirclesEditData.isHot,
        address: CirclesEditData.address,
      });
    });
  };

  // 获取所在商圈
  citiesAll = () => {
    const options2 = [];
    // eslint-disable-next-line
    Cities.map(item => {
      if (item.level === 1) {
        const obj =
            item.name === '辽宁省'
              ? {
                  label: item.name,
                  value: item.code,
                }
              : {
                  label: item.name,
                  value: item.code,
                  disabled: true,
                };
          const children = [];
        const num = item.sheng;
        // eslint-disable-next-line
        Cities.map(twoItem => {
          if (twoItem.sheng === num && twoItem.level === 2) {
            const childrenObj =
              twoItem.name === '沈阳市'
                ? {
                    label: twoItem.name,
                    value: twoItem.code,
                    isLeaf: false,
                  }
                : {
                    label: twoItem.name,
                    value: twoItem.code,
                    isLeaf: false,
                    disabled: true,
                  };
            const childrenThree = [];
            const { di } = twoItem;
            // eslint-disable-next-line
            Cities.map(threeItem => {
              if (threeItem.sheng === num && threeItem.di === di && threeItem.level === 3) {
                const childrenthreeObj = {
                  label: threeItem.name,
                  value: threeItem.code,
                };
                childrenThree.push(childrenthreeObj);
              }
              childrenObj.children = childrenThree;
            });
            children.push(childrenObj);
          }
          obj.children = children;
        });
        options2.push(obj);
      }
    });
    this.setState({
      categoryData: options2,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'configuration/categoryDataRe',
      payload: options2,
    });
  };

  showModal = () => {
    this.props.form.resetFields();
    this.setState({
      visible: true,
    });
  };
  /*
   * 提交
   */

  handleOk = e => {
    const { form, dispatch } = this.props;
    const { isEdit, id, imageValue } = this.state;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const data = values;
      if (!err) {
        Object.assign(data, {
          imgUrl: imageValue, // 商品主图
          province: values.province[0],
          city: values.province[1],
          area: values.province[2],
        });
        const type =
          isEdit === true ? 'configuration/circlesEditSubmit' : 'configuration/circlesSubmit';
        if (isEdit === true) {
          Object.assign(data, { id });
        }
        dispatch({
          type,
          payload: data,
        }).then(() => {
          const { circlesStatus } = this.props;
          if (circlesStatus) {
            this.setState({
              visible: false,
            });
            // 刷新页面
            // window.location.reload()
          }
        });
      }
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  // 是否热门单选
  state = {
    value: 1,
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  /**
   * 保存图片的值
   */

  imageSet = e => {
    this.state.imageValue = e.uploadImgUrl;
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { categoryData, imageValue } = this.state;
    return (
      <div>
        <Button
          style={{ width: 100, height: 40, marginBottom: 10 }}
          type="primary"
          onClick={this.showModal}
        >
          创建商圈
        </Button>
        <Modal
          title="创建商圈"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form hideRequiredMark>
            <div style={{ marginTop: 4 }}>商圈名称</div>
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入名称' }],
              })(<Input autoComplete = "off" placeholder="请输入名称" style={{ marginBottom: 20 }} />)}
            </Form.Item>
            <div style={{ marginTop: 8 }}>省市区</div>
            {/* 地区选框插件 */}
            <Form.Item>
              {getFieldDecorator('province', {
                rules: [{ required: true, message: '请选择省市区' }],
              })(
                <Cascader
                  options={categoryData}
                  // onChange={this.circlesIdChange}
                  placeholder="请选择省市区"
                />,
              )}
            </Form.Item>
            <div style={{ marginTop: 8 }}>地址</div>
            <Form.Item>
              {getFieldDecorator('address', {
                rules: [{ required: true, message: '请输入地址' }],
              })(<Input autoComplete = "off" placeholder="请输入地址" style={{ marginBottom: 20 }} />)}
            </Form.Item>
            {/* <div style={{ marginTop: 8, marginBottom: 8 }}>商圈图片</div> */}
            {/* 上传图片 */}
            {/* <UploadView name='imgUrl'
              value={imageValue} //默认属性
              channelType={2}  //上传渠道类型  0 未知 ，1 商家，2 商品，3 商品评价，4 用户，5 活动 9 系统
              cropHeight={276}
              cropWidth={414}
              beforeUpload={(file) => {
                console.log("文件上传前", file)
                return true
              }}
              handleChange={(file) => {
                console.log("文件上传状态", file)
              }}
              callBack={(e, e2) => {
                console.log("回调", e, e2)
                this.imageSet(e)
              }} /> */}

            <div style={{ marginTop: 28 }}>是否热门</div>
            <Form.Item>
              {getFieldDecorator('isHot', {
                rules: [{ required: true, message: '请输入地址' }],
              })(
                <RadioGroup onChange={this.onChange} value={this.state.value}>
                  <Radio value>是</Radio>
                  <Radio value={false}>否</Radio>
                </RadioGroup>,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default BusinessCreatView;
