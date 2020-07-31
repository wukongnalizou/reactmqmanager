import React, { Component } from 'react';
import { Input, Divider, Button, Form, Select, Radio, Cascader } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
// 省市所有数据
import areaCode from '@/utils/area';
// import axios from 'axios';
import styles from './index.less';

/**
 * 模块：商户中心
 * 页面：审核-开户方式-个人用户
 * author：lisimeng songshuyu
 */
const RadioGroup = Radio.Group;
let options = []; // 省市二级联动数据
// 将省市数据整理成所需要的格式
areaCode.map(item => {
  // provinceData.push(item.province_name);
  let obj = {
    value: item.province_number,
    label: item.province_name,
  };
  let arr = [];
  item.cities.map(city => {
    const cityObj = {
      value: city.city_number,
      label: city.city_name,
    };
    arr.push(cityObj);
  });
  obj.children = arr;
  options.push(obj);
});
@connect(({ tripartite, loading }) => ({
  tripartite,
  accountSt: tripartite.accountSt, // 控制是否提交改变商家状态的请求
  loginPersonal: loading.effects['tripartite/submitPersonal'], // 提交的等待
}))
@Form.create()
class OpenPerson extends Component {
  state = {};

  // 初始化
  componentDidMount() {}

  // 个人信息提交
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      const data = values;
      data.custProv = data.area[0]; // 省
      data.custArea = data.area[1]; // 市
      data.sellerId = this.props.location.query.sellerId; // 商户登录人Id
      data.sellerUserId = this.props.location.query.userCustId; // 商户登录人Id
      data.loginUserId = this.props.location.query.userId; // 登录人Id
      delete data.area; // 去掉多余数据
      if (!err) {
        dispatch({
          type: 'tripartite/submitPersonal',
          payload: data,
        });
        // .then(()=>{
        //     const {accountSt} =this.props;
        //     if(accountSt){
        //         // 个人开户成功后通知后台将该条数据状态变成2（三方审核中）
        //         dispatch({
        //             type: 'tripartite/changeSt',
        //             payload:{
        //                 sellerApplyId: this.props.location.query.Id, // 审核人Id
        //                 sellerId: this.props.location.query.sellerId,
        //                 type: 1,
        //             },
        //         })
        //     }
        // })
      } else {
        message.warning(`请填写所有必填项`);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      loginPersonal,
    } = this.props;
    const { Option, OptGroup } = Select;
    return (
      <PageHeaderWrapper
        content={
          <Form onSubmit={this.handleSubmit} hideRequiredMark>
            <div className={styles.content}>
              {/* 信息填写 */}
              <div>
                <div className={styles.title}>个人信息</div>
                <div className={styles.name}>
                  <Form.Item>
                    <span className={styles.font}>用户姓名：</span>
                    {getFieldDecorator('userName', {
                      rules: [
                        {
                          required: true,
                          pattern: /^[\u4e00-\u9fa5]+$/,
                          message: '请输入用户真实姓名',
                        },
                      ],
                    })(
                      <Input
                        autoComplete="off"
                        className={styles.Input}
                        placeholder="请输入用户真实姓名"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    <span className={styles.font2}>性别：</span>
                    {getFieldDecorator('userSex', {
                      rules: [{ required: true, message: '请选择性别' }],
                    })(
                      <RadioGroup>
                        <Radio value={-1}>未知</Radio>
                        <Radio value={0}>女</Radio>
                        <Radio value={1}>男</Radio>
                      </RadioGroup>,
                    )}
                  </Form.Item>
                </div>
                <div className={styles.name}>
                  <Form.Item>
                    <span className={styles.font}>身份证号：</span>
                    {getFieldDecorator('certId', {
                      rules: [
                        {
                          required: true,
                          pattern: /^[A-Za-z0-9]+$/,
                          message: '请输入正确的身份证号',
                        },
                      ],
                    })(
                      <Input
                        autoComplete="off"
                        className={styles.Input}
                        placeholder="请输入身份证号"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    <span className={styles.font2}>证件有效期：</span>
                    {getFieldDecorator('valiDate', {
                      rules: [
                        { required: true, pattern: /^\d{8}$/, message: '请输入正确证件有效期' },
                      ],
                    })(
                      <Input
                        autoComplete="off"
                        className={styles.Input}
                        placeholder="格式为YYYYMMDD,例如： 20290420"
                      />,
                    )}
                  </Form.Item>
                </div>
                <div className={styles.name}>
                  <Form.Item>
                    <span className={styles.font}>手机号：</span>
                    {getFieldDecorator('userMobile', {
                      rules: [
                        {
                          required: true,
                          pattern: /^((13[0-9])|(14[0-9])|(15([0-9]))|(17([0-9]))|(18[0-9]))\d{8}$/,
                          message: '请输入手机号',
                        },
                      ],
                    })(
                      <Input
                        autoComplete="off"
                        className={styles.Input}
                        placeholder="请输入手机号"
                      />,
                    )}
                  </Form.Item>
                </div>
                <div className={styles.name}>
                  <Form.Item>
                    <span className={styles.font}>省市：</span>
                    {getFieldDecorator('area', {
                      rules: [{ required: true, message: '请选择省市' }],
                    })(
                      <Cascader
                        className={styles.Input}
                        options={options}
                        placeholder="请选择省市"
                      />,
                    )}
                  </Form.Item>
                </div>
                <div className={styles.name}>
                  <Form.Item>
                    <span className={styles.font}>住址：</span>
                    {getFieldDecorator('custAddress', {
                      rules: [{ required: true, message: '请输入地址' }],
                    })(
                      <Input
                        autoComplete="off"
                        className={styles.Input}
                        placeholder="请输入地址"
                      />,
                    )}
                  </Form.Item>
                </div>
                <div className={styles.name}>
                  <Form.Item>
                    <span className={styles.font}>职业：</span>
                    {getFieldDecorator('occupation', {
                      rules: [{ required: true, message: '请选择职业' }],
                    })(
                      <Select className={styles.Input} placeholder="请选择职业">
                        <Select.Option value="01">
                          国家机关、党群机关、企事业单位负责人
                        </Select.Option>
                        <Select.Option value="02">金融业从业人员</Select.Option>
                        <Select.Option value="03">房地产业从业人员</Select.Option>
                        <Select.Option value="04">商贸从业人员</Select.Option>
                        <Select.Option value="05">自由职业者</Select.Option>
                        <Select.Option value="06">科教文从业人员</Select.Option>
                        <Select.Option value="07">制造业从业人员</Select.Option>
                        <Select.Option value="08">卫生行业从业人员</Select.Option>
                        <Select.Option value="09">IT业从业人员</Select.Option>
                        <Select.Option value="10">农林牧渔劳动者</Select.Option>
                        <Select.Option value="11">生产工作、运输工作和部分体力劳动者</Select.Option>
                        <Select.Option value="12">退休人员</Select.Option>
                        <Select.Option value="13">不便分类的其他劳动者</Select.Option>
                      </Select>,
                    )}
                  </Form.Item>
                </div>
                <div className={styles.name}>
                  <Form.Item>
                    <span className={styles.font}>邮箱：</span>
                    {getFieldDecorator('userEmail', {
                      rules: [
                        {
                          required: true,
                          pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
                          message: '请输入正确邮箱',
                        },
                      ],
                    })(
                      <Input
                        autoComplete="off"
                        className={styles.Input}
                        placeholder="请输入邮箱"
                      />,
                    )}
                  </Form.Item>
                </div>
              </div>
              <Divider />
              <div className={styles.bottom}>
                <Button
                  className={styles.button}
                  loading={loginPersonal}
                  htmlType="submit"
                  type="primary"
                >
                  确认
                </Button>
              </div>
            </div>
          </Form>
        }
      />
    );
  }
}
export default OpenPerson;
