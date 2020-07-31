import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';
import {
  Input,
  Divider,
  Button,
  Form,
  Select,
  LocaleProvider,
  DatePicker,
  Checkbox,
  Cascader,
  message,
} from 'antd';
// 英译汉
import zh_CN from 'antd/lib/locale-provider/zh_CN';
// 股东
import Shareholder from '../component/ShareHolder';
// 开户银行
import Bank from '../component/Bank';
// 开户银行
import BranchBank from '../component/BranchBank';
// 省市所有数据
import areaCode from '@/utils/area';
import moment from 'moment';
import { connect } from 'dva';

/**
 * 模块：个体户中心
 * 页面：审核-开户方式-商家开户
 * author：lisimeng songshuyu
 */
// const ShareholderData = []; // 股东
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
  selfSellerIdData: tripartite.selfSellerIdData,
  accountDetDate: tripartite.accountDetDate, // 企业数据,回填
  loginOpenSelf: loading.effects['tripartite/submitOpenSelf'], // 提交的等待
  accountSt: tripartite.accountSt, // 判断开户是否成功
  accountDetStatus: tripartite.accountDetStatus, // 判断是新增还是修改
}))
@Form.create()
class openShop extends Component {
  state = {
    licenseStatus: false, // 企业信息证照结束日期是否可选
    legalCheck: false, // 经营者信息证照结束日期是否可选
    commonType: false, // 控制普通营业执照企业下的一个变量是否显示
    commonRequired: true, // 控制普通营业执照企业下的一个变量是否为必填项
    certificateType: false, // 控制三证合一类型下的三个变量是否显示
    certificateRequired: true, // 控制三证合一类型下的三个变量是否为必填项
    applyId: new Date().getTime(), // 后台需要的applyId
    isEdit: false, // 判断是新增还是修改
    sellerAccountId: 0, // 修改时候需要传账户id
    licenseChecked: false,
    legalChecked: false,
  };
  // 初始化
  componentDidMount() {
    this.uploadFilesList();
    this.getOpenShopData(); // 获取企业信息，回填
  }
  /**
   *  获取企业信息，回填
   */
  getOpenShopData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tripartite/accountDetailed',
      payload: {
        sellerId: this.props.location.query.sellerId,
      },
    }).then(() => {
      const { form, accountDetDate, accountDetStatus } = this.props;
      if (accountDetDate !== null && accountDetStatus !== '04') {
        this.setState({
          isEdit: true,
          sellerAccountId: accountDetDate.sellerAccountId,
          applyId: accountDetDate.applyId,
        });
        if (accountDetDate.licenseEndDate === '永久') {
          this.setState({
            licenseStatus: true,
            licenseChecked: true,
          });
        } else {
          form.setFieldsValue({
            licenseEndDate: moment(accountDetDate.licenseEndDate),
          });
        }
        // 判断企业信息返回的证照结束时间是否是永久
        if (accountDetDate.licenseEndDate === '永久') {
          this.setState({
            licenseStatus: true,
            licenseChecked: true,
          });
        } else {
          form.setFieldsValue({
            licenseEndDate: moment(accountDetDate.licenseEndDate),
          });
        }
        // 判断法人信息返回的证照结束时间是否是永久
        if (accountDetDate.legalCertEndDate === '永久') {
          this.setState({
            legalCheck: false,
            legalChecked: value,
          });
        } else {
          form.setFieldsValue({
            legalCertEndDate: moment(accountDetDate.legalCertEndDate),
          });
        }
        // 普通营业执照企业
        if (accountDetDate.corpLicenseType === '01030100') {
          this.setState({
            commonType: false,
            commonRequired: true,
            certificateType: true,
            certificateRequired: false,
          });
          // 普通营业执照企业
        } else {
          this.setState({
            commonType: true,
            commonRequired: false,
            certificateType: false,
            certificateRequired: true,
          });
        }
        form.setFieldsValue({
          userName: accountDetDate.corpName,
          businessCode: accountDetDate.businessCode,
          businessScope: accountDetDate.businessScope,
          contactEmail: accountDetDate.contactEmail,
          contactMobile: accountDetDate.contactMobile,
          contactName: accountDetDate.contactName,
          corpBusinessAddress: accountDetDate.corpBusinessAddress,
          corpTypeId: accountDetDate.corpTypeId,
          socialCreditCode: accountDetDate.socialCreditCode,
          corpLicenseType: accountDetDate.corpLicenseType,
          licenseStartDate: moment(accountDetDate.licenseStartDate),
          legalName: accountDetDate.legalName,
          occupation: accountDetDate.occupation,
          legalCertType: accountDetDate.legalCertType,
          legalCertId: accountDetDate.legalCertId,
          legalCertStartDate: moment(accountDetDate.legalCertStartDate),
          legalMobile: accountDetDate.legalMobile,
          address: accountDetDate.address,
          soloBusinessAddress: accountDetDate.corpBusinessAddress,
          soloRegAddress: accountDetDate.corpRegAddress,
          soloFixedTelephone: accountDetDate.corpFixedTelephone,
        });
      }
    });
  };
  uploadFilesList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tripartite/uploadFilesList',
      payload: { sellerId: this.props.location.query.sellerId },
    });
  };
  /**
   * 个体户开户提交
   */
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, selfSellerIdData } = this.props;
    const { applyId, isEdit, sellerAccountId } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      const data = values;
      if (!err) {
        const { licenseStatus, legalCheck } = this.state;
        // 判断企业证照结束是否是永久
        if (licenseStatus === true) {
          Object.assign(data, { licenseEndDate: '永久' });
        } else {
          Object.assign(data, { licenseEndDate: moment(data.licenseEndDate).format('YYYYMMDD') });
        }
        // 判断经营者证照结束是否是永久
        if (legalCheck === true) {
          Object.assign(data, { legalCertEndDate: '永久' });
        } else {
          Object.assign(data, {
            legalCertEndDate: moment(data.legalCertEndDate).format('YYYYMMDD'),
          });
        }
        data.loginUserId = this.props.location.query.userId; // 登录人id
        // data.userCustId = this.props.location.query.userCustId // 商家id
        data.sellerId = this.props.location.query.sellerId; // 商家id
        data.retUrl = `http://hf-ret.mqkj.net.cn:8001/api/v1/seller/updateApplyStatusPayIng/${this.props.location.query.Id}/${this.props.location.query.sellerId}`;
        data.applyId = applyId;
        if (isEdit === true) {
          data.userAccountId = sellerAccountId;
        }
        data.operateType = isEdit === false ? '00090000' : '00090001';
        let attachIdStr = '';
        if (selfSellerIdData.length > 0) {
          let selfArr = [];
          selfSellerIdData.map(item => {
            selfArr.push(item.attachId);
          });
          attachIdStr = selfArr.join(',');
        }
        Object.assign(data, {
          licenseStartDate: moment(data.licenseStartDate).format('YYYYMMDD'),
          legalCertStartDate: moment(data.legalCertStartDate).format('YYYYMMDD'),
          industry: '', // 页面中没有行业字段输入框，默认设置为空字符串
          attachNos: attachIdStr,
        });
        // 个体户开户
        dispatch({
          type: 'tripartite/submitOpenSelf',
          payload: data,
        }).then(() => {
          const { accountSt } = this.props;
          console.log('accountSt', accountSt);
          if (accountSt) {
            // 个人开户成功后通知后台将该条数据状态变成2（三方审核中）
            dispatch({
              type: 'tripartite/changeSt',
              payload: {
                sellerApplyId: this.props.location.query.Id, // 审核人Id
                sellerId: this.props.location.query.sellerId,
                type: 3, // 账户类型：1 个人，2 企业，3 个体
              },
            });
          }
        });
      } else {
        message.warning(`请填写所有必填项`);
      }
    });
  };
  /**
   * 点击永久多选框控制结束时间框是否可选
   */
  forever = (e, type) => {
    const value = e.target.checked;
    if (type === 'license' && value === true) {
      this.setState({
        licenseStatus: true,
        licenseChecked: value,
      });
    } else if (type === 'license' && value === false) {
      this.setState({
        licenseStatus: false,
        licenseChecked: value,
      });
    } else if (type === 'legal' && value === true) {
      this.setState({
        legalCheck: true,
        legalChecked: value,
      });
    } else if (type === 'legal' && value === false) {
      this.setState({
        legalCheck: false,
        legalChecked: value,
      });
    }
  };
  /**
   * 选择企业类型变化
   */
  corpTypeChange = e => {
    // 普通营业执照企业
    if (e === '01030100') {
      this.setState({
        commonType: false,
        commonRequired: true,
        certificateType: true,
        certificateRequired: false,
      });
      // 普通营业执照企业
    } else {
      this.setState({
        commonType: true,
        commonRequired: false,
        certificateType: false,
        certificateRequired: true,
      });
    }
  };
  render() {
    const {
      form: { getFieldDecorator },
      checkValue,
      cmdId,
      merCustId,
      version,
      loginOpenSelf,
    } = this.props;
    const {
      licenseStatus,
      legalCheck,
      commonType,
      certificateType,
      commonRequired,
      certificateRequired,
    } = this.state;
    const { Option, OptGroup } = Select;
    return (
      <PageHeaderWrapper
        content={
          <div>
            <Form onSubmit={this.handleSubmit} hideRequiredMark>
              <div className={styles.content}>
                {/* 信息填写 */}
                <div>
                  {/* 企业信息 */}
                  <div className={styles.title}>企业信息</div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>个体户名称：</span>
                      {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入个体户名称' }],
                      })(
                        <Input
                          autoComplete="off"
                          autoComplete="off"
                          className={styles.Input}
                          placeholder="请输入个体户名称"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>经营范围：</span>
                      {getFieldDecorator('businessScope', {
                        rules: [{ required: true, message: '请输入经营范围' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          placeholder="请输入经营范围"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>企业类型ID：</span>
                      {getFieldDecorator('corpTypeId', {
                        rules: [{ required: true, message: '请选择企业类型ID' }],
                      })(
                        <Select className={styles.Input} placeholder="请选择企业类型ID">
                          <Option value="01030000">普通企业</Option>
                          <Option value="01030001">个体户</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>企业证照类型：</span>
                      {getFieldDecorator('corpLicenseType', {
                        rules: [{ required: true, message: '请选择企业证照类型' }],
                      })(
                        <Select
                          className={styles.Input}
                          placeholder="请选择企业证照类型"
                          //  onChange={this.corpTypeChange}
                        >
                          <Select.Option value="01030100">普通营业执照企业</Select.Option>
                          <Select.Option value="01030101">三证合一企业</Select.Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>营业执照注册号：</span>
                      {getFieldDecorator('businessCode', {
                        rules: [{ required: commonRequired, message: '请输入营业执照注册号' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          // disabled={commonType}
                          placeholder="请输入营业执照注册号"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>证照起始日期：</span>
                      <LocaleProvider locale={zh_CN}>
                        {getFieldDecorator('licenseStartDate', {
                          rules: [{ required: true, message: '请选择证照起始日期' }],
                        })(
                          <DatePicker className={styles.Input} placeholder="请选择证照起始日期" />,
                        )}
                      </LocaleProvider>
                    </Form.Item>
                    <Form.Item>
                      <span className={styles.font2}>证照结束日期：</span>
                      <LocaleProvider locale={zh_CN}>
                        {getFieldDecorator('licenseEndDate', {
                          rules: [{ required: false, message: '请选择证照结束日期' }],
                        })(
                          <DatePicker
                            style={{ width: '3rem', marginRight: '0.2rem', marginLeft: '0.1rem' }}
                            disabled={licenseStatus}
                            placeholder="请选择证照结束日期"
                          />,
                        )}
                      </LocaleProvider>
                    </Form.Item>
                    <Checkbox
                      checked={this.state.licenseChecked}
                      onChange={e => this.forever(e, 'license')}
                    >
                      永久
                    </Checkbox>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>统一社会信用代码：</span>
                      {getFieldDecorator('socialCreditCode', {
                        rules: [
                          { required: certificateRequired, message: '请输入统一社会信用代码' },
                        ],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          disabled={certificateType}
                          placeholder="请输入统一社会信用代码"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>个体工商户经营地址：</span>
                      {getFieldDecorator('soloBusinessAddress', {
                        rules: [{ required: true, message: '请输入个体工商户经营地址' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          placeholder="请输入个体工商户经营地址"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      <span className={styles.font2}>个体工商户注册地址：</span>
                      {getFieldDecorator('soloRegAddress', {
                        rules: [{ required: true, message: '请输入个体工商户注册地址' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          placeholder="请输入个体工商户注册地址"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>个体工商户固定电话：</span>
                      {getFieldDecorator('soloFixedTelephone', {
                        rules: [{ required: true, message: '请输入个体工商户固定电话' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          placeholder="请输入个体工商户固定电话"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <Divider />
                  {/* 经营者信息 */}
                  <div className={styles.title}>经营者信息</div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>经营者姓名：</span>
                      {getFieldDecorator('legalName', {
                        rules: [{ required: true, message: '请输入经营者姓名' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          placeholder="请输入经营者姓名"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>经营者职业：</span>
                      {getFieldDecorator('occupation', {
                        rules: [{ required: true, message: '请选择经营者职业' }],
                      })(
                        <Select className={styles.Input} placeholder="请选择经营者职业">
                          <Option value="01">国家机关、党群机关、企事业单位负责人</Option>
                          <Option value="02">金融业从业人员</Option>
                          <Option value="03">房地产业从业人员</Option>
                          <Option value="04">商贸从业人员</Option>
                          <Option value="05">自由职业者</Option>
                          <Option value="06">科教文从业人员</Option>
                          <Option value="07">制造业从业人员</Option>
                          <Option value="08">卫生行业从业人员</Option>
                          <Option value="09">IT业从业人员</Option>
                          <Option value="10">农林牧渔劳动者</Option>
                          <Option value="11">生产工作、运输工作和部分体力劳动者</Option>
                          <Option value="12">退休人员</Option>
                          <Option value="13">不便分类的其他劳动者</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>经营者证件类型：</span>
                      {getFieldDecorator('legalCertType', {
                        rules: [{ required: true, message: '请选择经营者证件类型' }],
                      })(
                        <Select className={styles.Input} placeholder="请选择经营者职业">
                          <Option value="01020100">身份证</Option>
                          <Option value="01020101" disabled>
                            护照
                          </Option>
                          <Option value="01020102" disabled>
                            军官证
                          </Option>
                          <Option value="01020103" disabled>
                            士兵证
                          </Option>
                          <Option value="01020104" disabled>
                            回乡证
                          </Option>
                          <Option value="01020105" disabled>
                            警官证
                          </Option>
                          <Option value="01020106" disabled>
                            台胞证
                          </Option>
                          <Option value="01020107" disabled>
                            其他
                          </Option>
                        </Select>,
                      )}
                    </Form.Item>
                    <Form.Item>
                      <span className={styles.font2}>经营者证件号码：</span>
                      {getFieldDecorator('legalCertId', {
                        rules: [{ required: true, message: '请输入证件号码' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          placeholder="请输入证件号码"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>证件起始日期：</span>
                      <LocaleProvider locale={zh_CN}>
                        {getFieldDecorator('legalCertStartDate', {
                          rules: [{ required: true, message: '请选择证件起始日期' }],
                        })(
                          <DatePicker className={styles.Input} placeholder="请选择证件起始日期" />,
                        )}
                      </LocaleProvider>
                    </Form.Item>
                    <Form.Item>
                      <span className={styles.font2}>证件结束日期：</span>
                      <LocaleProvider locale={zh_CN}>
                        {getFieldDecorator('legalCertEndDate', {
                          rules: [{ required: false, message: '请选择证件结束日期' }],
                        })(
                          <DatePicker
                            placeholder="请选择证件结束日期"
                            disabled={legalCheck}
                            style={{ width: '3rem', marginRight: '0.2rem', marginLeft: '0.1rem' }}
                          />,
                        )}
                      </LocaleProvider>
                    </Form.Item>
                    <Checkbox
                      checked={this.state.legalChecked}
                      onChange={e => this.forever(e, 'legal')}
                    >
                      永久
                    </Checkbox>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>手机号码：</span>
                      {getFieldDecorator('legalMobile', {
                        rules: [
                          {
                            required: true,
                            pattern: /^((13[0-9])|(14[0-9])|(15([0-9]))|(17([0-9]))|(18[0-9]))\d{8}$/,
                            message: '请输入手机号码',
                          },
                        ],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          placeholder="请输入手机号码"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>经营者住址：</span>
                      {getFieldDecorator('address', {
                        rules: [{ required: true, message: '请输入住址' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          placeholder="请输入住址"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <Divider />
                  {/* 个体工商户联系人信息 */}
                  <div className={styles.title}>个体工商户联系人信息</div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>联系人姓名：</span>
                      {getFieldDecorator('contactName', {
                        rules: [{ required: true, message: '请输入姓名' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          placeholder="请输入姓名"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      <span className={styles.font2}>联系人手机号：</span>
                      {getFieldDecorator('contactMobile', {
                        rules: [{ required: true, message: '请输入手机号' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          placeholder="请输入手机号"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      <span className={styles.font2}>联系人邮箱：</span>
                      {getFieldDecorator('contactEmail', {
                        rules: [{ required: true, message: '请输入邮箱' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          placeholder="请输入邮箱"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <Divider />
                </div>
                <Divider />
                <div className={styles.bottom}>
                  <Button
                    className={styles.button}
                    loading={loginOpenSelf}
                    htmlType="submit"
                    type="primary"
                  >
                    确认
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        }
      />
    );
  }
}
export default openShop;
