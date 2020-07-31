import React, { Component } from 'react';
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
import moment from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
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
import styles from './index.less';
/**
 * 模块：商户中心
 * 页面：审核-开户方式-商家开户
 * author：lisimeng songshuyu
 */
const ShareholderData = []; // 股东
const options = []; // 省市二级联动数据
// 将省市数据整理成所需要的格式
areaCode.map(item => {
  // provinceData.push(item.province_name);
  const obj = {
    value: item.province_number,
    label: item.province_name,
  };
  const arr = [];
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
  checkValue: tripartite.checkValue, // 传送给三方的字段
  cmdId: tripartite.cmdId, // 传送给三方的字段
  merCustId: tripartite.merCustId, // 传送给三方的字段
  version: tripartite.version, // 传送给三方的字段
  searchBusiDate: tripartite.searchBusiDate, // 已有企业数据
  accountDetDate: tripartite.accountDetDate, // 企业数据,回填
  searchDisabled: tripartite.searchDisabled, // 控制输入框是否可输入
  submitDisabled: tripartite.submitDisabled, // 控制提交和绑定按钮切换
  accountDetStatus: tripartite.accountDetStatus, // 判断是新增还是修改
  loginBusiness: loading.effects['tripartite/submitBusiness'], // 提交的等待
}))
@Form.create()
class OpenShop extends Component {
  state = {
    licenseStatus: false, // 企业信息证照结束日期是否可选
    legalCheck: false, // 法人信息证照结束日期是否可选
    commonType: false, // 控制普通营业执照企业下的一个变量是否显示
    commonRequired: true, // 控制普通营业执照企业下的一个变量是否为必填项
    certificateType: false, // 控制三证合一类型下的三个变量是否显示
    certificateRequired: true, // 控制三证合一类型下的三个变量是否为必填项
    confirmDirty: false,
    licenseChecked: false,
    legalChecked: false,
    applyId: new Date().getTime(), // 后台需要的applyId
    isEdit: false, // 判断是新增还是修改
    sellerAccountId: 0, // 修改时候需要传账户id
  };

  // 初始化
  componentDidMount() {
    this.getOpenShopData(); // 获取企业信息，回填
  }

  /**
   * 商户开户提交
   */
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { applyId, isEdit, sellerAccountId } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      const data = values;
      if (!err) {
        const { licenseStatus, legalCheck } = this.state;
        // 判断企业证照结束是否是永久
        if (licenseStatus === true) {
          Object.assign(data, { licenseEndDate: '永久' });
        } else {
          Object.assign(data, { licenseEndDate: moment(data.licenseEndDate).format('YYYYMMDD') });
        }
        // 判断法人证照结束是否是永久
        if (legalCheck === true) {
          Object.assign(data, { legalCertEndDate: '永久' });
        } else {
          Object.assign(data, {
            legalCertEndDate: moment(data.legalCertEndDate).format('YYYYMMDD'),
          });
        }
        // 去掉controllingShareholder数组中多余的字段，多余字段用于表格key和判断是否
        data.controllingShareholder.map(item => {
          delete item.key;
          delete item.editable;
        });
        data.bankProv = data.area[0]; // 省
        data.bankArea = data.area[1]; // 市
        data.applyId = applyId;
        data.operateType = isEdit === false ? '00090000' : '00090001';
        if (isEdit === true) {
          data.sellerAccountId = sellerAccountId;
        }
        data.loginUserId = this.props.location.query.userId; // 登录人id
        data.sellerId = this.props.location.query.sellerId; // 商户id
        delete data.area; // 去掉多余数据
        Object.assign(data, {
          licenseStartDate: moment(data.licenseStartDate).format('YYYYMMDD'),
          legalCertStartDate: moment(data.legalCertStartDate).format('YYYYMMDD'),
          controllingShareholder: JSON.stringify(data.controllingShareholder),
          industry: '', // 页面中没有行业字段输入框，默认设置为空字符串
          // 'userType': 2, // 用户类型
          // 'retUrl': `https://192.168.2.123/backstage/v1/seller/updateApplyStatusPayIng/${this.props.location.query.Id}/${this.props.location.query.sellerId}`,
          retUrl: `http://hf-ret.mqkj.net.cn:8001/api/v1/seller/updateApplyStatusPayIng/${this.props.location.query.Id}/${this.props.location.query.sellerId}`,
        });
        // 商户开户
        dispatch({
          type: 'tripartite/submitBusiness',
          payload: data,
        }).then(() => {
          const { checkValue } = this.props;
          // 自动点击三方支付的submit，调用三方支付提交
          if (checkValue) {
            document.getElementById('hideSubmit').click();
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
        // 开户行地址格式整理
        const arerArr = [accountDetDate.bankProv, accountDetDate.bankArea];
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
          controllingShareholder: JSON.parse(accountDetDate.controllingShareholder),
          corpName: accountDetDate.corpName,
          businessCode: accountDetDate.businessCode,
          businessScope: accountDetDate.businessScope,
          contactEmail: accountDetDate.contactEmail,
          contactMobile: accountDetDate.contactMobile,
          contactName: accountDetDate.contactName,
          corpBusinessAddress: accountDetDate.corpBusinessAddress,
          corpFixedTelephone: accountDetDate.corpFixedTelephone,
          corpRegAddress: accountDetDate.corpRegAddress,
          corpTypeId: accountDetDate.corpTypeId,
          institutionCode: accountDetDate.institutionCode,
          // corpName: accountDetDate.sellerName,
          socialCreditCode: accountDetDate.socialCreditCode,
          taxCode: accountDetDate.taxCode,
          corpLicenseType: accountDetDate.corpLicenseType,
          licenseStartDate: moment(accountDetDate.licenseStartDate),
          legalName: accountDetDate.legalName,
          occupation: accountDetDate.occupation,
          legalCertType: accountDetDate.legalCertType,
          legalCertId: accountDetDate.legalCertId,
          legalCertStartDate: moment(accountDetDate.legalCertStartDate),
          legalMobile: accountDetDate.legalMobile,
          address: accountDetDate.address,
          bankAcctName: accountDetDate.bankAcctName,
          bankAcctNo: accountDetDate.bankAcctNo,
          bankBranch: accountDetDate.bankBranch,
          bankId: accountDetDate.bankId,
          area: arerArr,
        });
      }
    });
  };

  /**
   * 搜索已有企业账户
   */
  existAccount = () => {
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll(['contactName'], (err, values) => {
      const data = values;
      if (!err) {
        // 搜索
        dispatch({
          type: 'tripartite/searchBusiness',
          payload: data,
        }).then(() => {
          const { searchBusiDate } = this.props;
          if (searchBusiDate.length > 0) {
            form.setFieldsValue({
              businessCode: searchBusiDate[0].businessCode,
              businessScope: searchBusiDate[0].businessScope,
              contactEmail: searchBusiDate[0].contactEmail,
              contactMobile: searchBusiDate[0].contactMobile,
              contactName: searchBusiDate[0].contactName,
              corpBusinessAddress: searchBusiDate[0].corpBusinessAddress,
              corpFixedTelephone: searchBusiDate[0].corpFixedTelephone,
              corpRegAddress: searchBusiDate[0].corpRegAddress,
              corpTypeId: searchBusiDate[0].corpTypeId,
              institutionCode: searchBusiDate[0].institutionCode,
              corpName: searchBusiDate[0].sellerName,
              socialCreditCode: searchBusiDate[0].socialCreditCode,
              taxCode: searchBusiDate[0].taxCode,
              corpLicenseType: searchBusiDate[0].corpLicenseTypeId,
              licenseStartDate: moment(searchBusiDate[0].licenseStartDate),
            });
            // 判断企业信息返回的证照结束时间是否是永久
            if (searchBusiDate[0].licenseEndDate === '永久') {
              this.setState({
                licenseStatus: true,
                licenseChecked: true,
              });
            } else {
              form.setFieldsValue({
                licenseEndDate: moment(searchBusiDate[0].licenseEndDate),
              });
            }
          } else {
            message.warning('未查询到企业信息！');
          }
        });
      } else {
        message.warning(`请先填写企业联系人姓名`);
      }
    });
  };

  bindInfor = () => {
    const { dispatch, searchBusiDate } = this.props;
    dispatch({
      type: 'tripartite/bindInfor',
      payload: {
        businessName: searchBusiDate[0].sellerName,
        accountId: searchBusiDate[0].sellerAccountId,
        accountType: 2,
        sellerId: this.props.location.query.sellerId,
      },
    });
  };

  reloadAccount = () => {
    // 刷新页面
    window.location.reload();
  };

  /**
   * 校验企业名称和开户行账户名是否一致
   */
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('corpName')) {
      callback('必须和企业名称一致');
    } else {
      callback();
    }
  };

  /**
   * 校验企业名称和开户行账户名是否一致
   */
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['bankAcctName'], { force: true });
    }
    callback();
  };

  /**
   * 校验企业名称和开户行账户名是否一致
   */
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const {
      form: { getFieldDecorator },
      checkValue,
      cmdId,
      merCustId,
      version,
      loginBusiness,
      searchDisabled,
      submitDisabled,
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
            {/* 商户开户成功之后提交到三方 */}
            {/* <form action="https://eacloud.testpnr.com/api/publicRequests" method="post" id="form1" target="_blank"> */}
            <form
              action="https://eacloud.cloudpnr.com/api/publicRequests"
              method="post"
              id="form1"
              target="_blank"
            >
              <input type="hidden" name="check_value" value={checkValue}></input>
              <input type="hidden" name="version" value={version}></input>
              <input type="hidden" name="cmd_id" value={cmdId}></input>
              <input type="hidden" name="mer_cust_id" value={merCustId}></input>
              <input style={{ display: 'none' }} type="submit" id="hideSubmit" value="提交" />
            </form>
            <Form onSubmit={this.handleSubmit} hideRequiredMark>
              <div className={styles.content}>
                <Button className={styles.font} type="primary" onClick={this.existAccount}>
                  使用已有企业账号
                </Button>
                <Button className={styles.font} type="primary" onClick={this.reloadAccount}>
                  重置
                </Button>
                {/* 信息填写 */}
                <div>
                  {/* 企业信息 */}
                  <div className={styles.title}>企业信息</div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>企业名称全称：</span>
                      {getFieldDecorator('corpName', {
                        rules: [
                          { required: true, message: '请输入企业名称全称' },
                          {
                            validator: this.validateToNextPassword,
                          },
                        ],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          disabled={searchDisabled}
                          placeholder="请输入企业名称全称"
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
                          disabled={searchDisabled}
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
                        <Select
                          className={styles.Input}
                          disabled={searchDisabled}
                          placeholder="请选择企业类型ID"
                        >
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
                          disabled={searchDisabled}
                          placeholder="请选择企业证照类型"
                          onChange={this.corpTypeChange}
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
                          disabled={searchDisabled || commonType}
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
                          <DatePicker
                            disabled={searchDisabled}
                            className={styles.Input}
                            placeholder="请选择证照起始日期"
                          />,
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
                            disabled={searchDisabled || licenseStatus}
                            placeholder="请选择证照结束日期"
                          />,
                        )}
                      </LocaleProvider>
                    </Form.Item>
                    <Checkbox
                      checked={this.state.licenseChecked}
                      disabled={searchDisabled}
                      onChange={e => this.forever(e, 'license')}
                    >
                      永久
                    </Checkbox>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>组织机构代码：</span>
                      {getFieldDecorator('institutionCode', {
                        rules: [
                          { required: commonRequired, len: 9, message: '请输入9位组织机构代码' },
                        ],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          disabled={searchDisabled || commonType}
                          placeholder="请输入组织机构代码"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      <span className={styles.font2}>税务登记证号：</span>
                      {getFieldDecorator('taxCode', {
                        rules: [{ required: commonRequired, message: '请输入税务登记证号' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          disabled={searchDisabled || commonType}
                          placeholder="请输入税务登记证号"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      <span className={styles.font2}>统一社会信用代码：</span>
                      {getFieldDecorator('socialCreditCode', {
                        rules: [
                          {
                            required: certificateRequired,
                            len: 18,
                            message: '请输入18位统一社会信用代码',
                          },
                        ],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          disabled={searchDisabled || certificateType}
                          placeholder="请输入统一社会信用代码"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>企业经营地址：</span>
                      {getFieldDecorator('corpBusinessAddress', {
                        rules: [{ required: true, message: '请输入企业经营地址' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          disabled={searchDisabled}
                          placeholder="请输入企业经营地址"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      <span className={styles.font2}>企业注册地址：</span>
                      {getFieldDecorator('corpRegAddress', {
                        rules: [{ required: true, message: '请输入企业注册地址' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          disabled={searchDisabled}
                          placeholder="请输入企业注册地址"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>企业固定电话：</span>
                      {getFieldDecorator('corpFixedTelephone', {
                        rules: [{ required: true, message: '请输入企业固定电话' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          disabled={searchDisabled}
                          placeholder="请输入企业固定电话"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <Divider />
                  {/* 股东信息 */}
                  <div className={styles.title}>控股股东</div>
                  <div className={styles.shareholder}>
                    {getFieldDecorator('controllingShareholder', {
                      initialValue: ShareholderData,
                    })(<Shareholder />)}
                  </div>
                  {/* 法人信息 */}
                  <div className={styles.title}>法人信息</div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>法人姓名：</span>
                      {getFieldDecorator('legalName', {
                        rules: [{ required: true, message: '请输入法人姓名' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          disabled={searchDisabled}
                          placeholder="请输入法人姓名"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>法人职业：</span>
                      {getFieldDecorator('occupation', {
                        rules: [{ required: true, message: '请选择法人职业' }],
                      })(
                        <Select
                          disabled={searchDisabled}
                          className={styles.Input}
                          placeholder="请选择法人职业"
                        >
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
                      <span className={styles.font}>法人证件类型：</span>
                      {getFieldDecorator('legalCertType', {
                        rules: [{ required: true, message: '请选择法人证件类型' }],
                      })(
                        <Select
                          disabled={searchDisabled}
                          className={styles.Input}
                          placeholder="请选择法人证件类型"
                        >
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
                      <span className={styles.font2}>法人证件号码：</span>
                      {getFieldDecorator('legalCertId', {
                        rules: [{ required: true, message: '请输入证件号码' }],
                      })(
                        <Input
                          autoComplete="off"
                          disabled={searchDisabled}
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
                          <DatePicker
                            disabled={searchDisabled}
                            className={styles.Input}
                            placeholder="请选择证件起始日期"
                          />,
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
                            disabled={searchDisabled || legalCheck}
                            style={{ width: '3rem', marginRight: '0.2rem', marginLeft: '0.1rem' }}
                          />,
                        )}
                      </LocaleProvider>
                    </Form.Item>
                    <Checkbox
                      disabled={searchDisabled}
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
                          disabled={searchDisabled}
                          placeholder="请输入手机号码"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>法人住址：</span>
                      {getFieldDecorator('address', {
                        rules: [{ required: true, message: '请输入住址' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          disabled={searchDisabled}
                          placeholder="请输入住址"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <Divider />
                  {/* 企业联系人信息 */}
                  <div className={styles.title}>企业联系人信息</div>
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
                          disabled={searchDisabled}
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
                          disabled={searchDisabled}
                          placeholder="请输入邮箱"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <Divider />
                  {/* 企业账户信息 */}
                  <div className={styles.title}>企业账户信息</div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>开户行账户名：</span>
                      {getFieldDecorator('bankAcctName', {
                        rules: [
                          { required: true, message: '请输入开户行账户名' },
                          { validator: this.compareToFirstPassword },
                        ],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          disabled={searchDisabled}
                          placeholder="必须和企业名称一致"
                          onBlur={this.handleConfirmBlur}
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>开户银行账号：</span>
                      {getFieldDecorator('bankAcctNo', {
                        rules: [{ required: true, message: '请输入开户银行账号' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          disabled={searchDisabled}
                          placeholder="请输入开户银行账号"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      <span className={styles.font}>开户银行支行名称：</span>
                      {getFieldDecorator('bankBranch', {
                        rules: [{ required: true, message: '请输入开户银行支行名称' }],
                      })(
                        <Input
                          autoComplete="off"
                          className={styles.Input}
                          disabled={searchDisabled}
                          placeholder="请输入开户银行支行名称"
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.name}>
                    <Form.Item>
                      <span className={styles.font}>开户银行：</span>
                      {getFieldDecorator('bankId', {
                        rules: [{ required: true, message: '请输入开户银行账号' }],
                      })(
                        <Select
                          disabled={searchDisabled}
                          className={styles.Input}
                          placeholder="请输入开户银行账号"
                        >
                          <OptGroup label="B">
                            <Option value="03130011">北京银行</Option>
                            <Option value="04020011">北京农村商业银行</Option>
                            <Option value="03180000">渤海银行</Option>
                            <Option value="04020031">上海农村商业银行</Option>
                          </OptGroup>
                          <OptGroup label="G">
                            <Option value="03030000">光大银行</Option>
                            <Option value="03060000">广东发展银行</Option>
                          </OptGroup>
                          <OptGroup label="H">
                            <Option value="03040000">华夏银行</Option>
                            <Option value="03133301">杭州银行</Option>
                          </OptGroup>
                          <OptGroup label="J">
                            <Option value="03010000">交通银行</Option>
                          </OptGroup>
                          <OptGroup label="M">
                            <Option value="03050000">民生银行</Option>
                          </OptGroup>
                          <OptGroup label="N">
                            <Option value="03133201">南京银行</Option>
                          </OptGroup>
                          <OptGroup label="P">
                            <Option value="03100000">浦东发展银行</Option>
                            <Option value="03134402">平安银行</Option>
                          </OptGroup>
                          <OptGroup label="S">
                            <Option value="03130031">上海银行</Option>
                            <Option value="03070000">深圳发展银行</Option>
                          </OptGroup>
                          <OptGroup label="X">
                            <Option value="03090000">兴业银行</Option>
                          </OptGroup>
                          <OptGroup label="Z">
                            <Option value="03080000">招商银行</Option>
                            <Option value="01020000">中国工商银行</Option>
                            <Option value="01050000">中国建设银行</Option>
                            <Option value="01030000">中国农业银行</Option>
                            <Option value="01040000">中国银行</Option>
                            <Option value="04030000">中国邮政储蓄银行</Option>
                            <Option value="03160000">浙商银行</Option>
                            <Option value="03133307">浙江民泰商业银行</Option>
                            {/* <Option value="">浙江泰隆商业银行</Option> */}
                            <Option value="03020000">中信银行</Option>
                          </OptGroup>
                        </Select>,
                      )}
                    </Form.Item>
                    <Form.Item>
                      <span className={styles.font2}>开户行地址：</span>
                      {getFieldDecorator('area', {
                        rules: [{ required: true, message: '请选择开户行地址' }],
                      })(
                        <Cascader
                          className={styles.Input}
                          disabled={searchDisabled}
                          options={options}
                          placeholder="请选择开户行地址"
                        />,
                      )}
                      {/* })(<BranchBank />)} */}
                    </Form.Item>
                  </div>
                </div>
                <Divider />
                <div className={styles.bottom}>
                  {submitDisabled === false ? (
                    <Button
                      className={styles.button}
                      loading={loginBusiness}
                      htmlType="submit"
                      type="primary"
                    >
                      确认
                    </Button>
                  ) : (
                    <Button className={styles.button} onClick={this.bindInfor} type="primary">
                      绑定
                    </Button>
                  )}
                </div>
              </div>
            </Form>
          </div>
        }
      />
    );
  }
}
export default OpenShop;
