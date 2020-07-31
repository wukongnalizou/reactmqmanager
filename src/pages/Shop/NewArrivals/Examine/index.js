import React, { Component } from 'react';
import { Button, Modal, Form, Input, Popconfirm, Avatar } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import router from 'umi/router';
// 暂无图片
import noImg from '@/assets/global/noImg.jpg';
import styles from './index.less';
/**
 * 模块：商户中心-新申请入驻
 * 页面：审核
 * @author：zhaoyijn songshuyu
 */
const { TextArea } = Input;
@connect(({ newArrivals, loading }) => ({
  newArrivals,
  DetailsData: newArrivals.DetailsData, // 商家审核中详情
  contrast: newArrivals.contrast, // 商家审核中详情和上一次审核对比详情
  ategoryData: newArrivals.ategoryData, // 经营范围数据
  applyAuditStatus: newArrivals.applyAuditStatus, // 控制审核是否通过
  loginConfirmOk: loading.effects['storeReview/applyAudit'], // 审核的等待
}))
@Form.create()
class Information extends Component {
  state = {
    scopeFirst: '', // 经营范围一类目
    visible: false, // 控制Modal是否显示
    imgVisible: false, // 控制身份证的modal是否显示
    idImg: '', // 身份证发大图储存身份证
    basicInformation: [], // 修改之前基本信息的显示
    basicInformationAfter: [], // 修改之前基本信息的显示
    basicImgBrfore: [], // 修改之前图片的显示
    basicImgAfter: [], // 修改之后图片的显示
    examineShow: false, // 控制是否显示驳回前后的信息
    buttonShoeHide: true, // 控制审核通过和三方开户按钮的切换
    modalName: '', // 图片modal弹出框名称
  };

  // 初始化
  componentDidMount() {
    this.citiesAll(); // 经营范围
  }

  /**
   * 获取经营范围，用于循环在页面中展示,还有商圈
   */
  citiesAll = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'newArrivals/ategory',
      payload: {},
    }).then(() => {
      this.getBusinessDetails(); // 获取商家审核对比详情
    });
  };

  /**
   * 经营范围
   */
  ategory(ategoryData, DetailsData, scopeFirst) {
    ategoryData.map(item => {
      if (item.id === DetailsData.sellerInfo.categoryId) {
        this.setState({
          [scopeFirst]: item.name,
        });
      }
    });
  }

  /**
   * 获取商家审核对比详情
   */
  getBusinessDetails() {
    const { dispatch } = this.props;
    dispatch({
      type: 'newArrivals/businessDetails',
      payload: {
        id: this.props.location.query.sellerId,
      },
    }).then(() => {
      const { ategoryData, DetailsData } = this.props;
      this.ategory(ategoryData, DetailsData, 'scopeFirst');
      const { contrast } = this.props;
      // 控制审核通过和三方开户按钮的切换
      this.setState({
        buttonShoeHide: DetailsData.status === 1 ? false : true,
      });
      if (contrast.length > 1) {
        this.setState({
          examineShow: true,
        });
        const arrBefore = []; // 修改之前的数组
        const arrAfter = []; // 修改之后的数组
        const imgBefore = []; // 修改之前的图片
        const imgAfter = []; // 修改之后的图片
        const arrObjsKey = Object.keys(contrast[1].sellerInfo);
        const nameKey = [
          { value: '商家名称', key: 'name' },
          { value: '商家地址', key: 'address' },
          { value: '身份证号', key: 'idNumber' },
          { value: '商家电话', key: 'phone' },
          { value: '负责人', key: 'principalName' },
          { value: '身份证正面照', key: 'idFrontImage' },
          { value: '身份证反面照', key: 'idContraryImage' },
          { value: '头像', key: 'image' },
          { value: '负责人电话', key: 'principalPhone' },
          { value: '经营类目', key: 'categoryName' },
          { value: '商圈', key: 'circlesName' },
        ];
        arrObjsKey.map(item => {
          if (contrast[1].sellerInfo[item] !== contrast[0].sellerInfo[item]) {
            nameKey.map(childItem => {
              if (childItem.key === item) {
                if (
                  childItem.key === 'idFrontImage' ||
                  childItem.key === 'idContraryImage' ||
                  childItem.key === 'image'
                ) {
                  imgBefore.push({
                    name: childItem.value,
                    value: contrast[1].sellerInfo[item],
                  });
                  imgAfter.push({
                    name: childItem.value,
                    value: contrast[0].sellerInfo[item],
                  });
                } else {
                  arrBefore.push({
                    name: childItem.value,
                    value:
                      contrast[1].sellerInfo[item] === null ? '空' : contrast[1].sellerInfo[item],
                  });
                  arrAfter.push({
                    name: childItem.value,
                    value:
                      contrast[0].sellerInfo[item] === null ? '空' : contrast[0].sellerInfo[item],
                  });
                }
              }
            });
          }
        });
        if (arrBefore.length > 0 || imgBefore.length > 0) {
          this.setState({
            examineShow: false,
          });
        }
        this.setState({
          basicInformation: arrBefore,
          basicInformationAfter: arrAfter,
          basicImgBrfore: imgBefore,
          basicImgAfter: imgAfter,
        });
      } else {
        this.setState({
          examineShow: true,
        });
      }
    });
  }

  // 确认审核通过
  confirmOk = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'newArrivals/applyAudit',
      payload: {
        id: this.props.location.query.Id,
        causeList: ['确认通过'],
        isCheckPass: 2,
        sellerId: this.props.location.query.sellerId,
      },
    }).then(() => {
      const { applyAuditStatus } = this.props;
      if (applyAuditStatus) {
        router.push('/shop/newArrivals');
        this.setState({
          buttonShoeHide: false, // 控制审核通过和三方开户按钮的切换
        });
      }
    });
  };

  // 审核驳回
  auditReject = () => {
    this.setState({
      visible: true,
    });
  };

  /**
   * 跳转到三方开户
   */
  threeAccount = () => {
    const { sellerId } = this.props.location.query;
    router.push(
      `/shop/newArrivals/tripartite/account?userId=${this.props.location.query.userId}&&sellerId=${this.props.location.query.sellerId}&&sellerUserId=${this.props.location.query.sellerUserId}&&Id=${this.props.location.query.Id}`,
    );
  };

  // 确认驳回
  handleOk() {
    const id = this.props.onsubmitId;
    const url = `/api/v1/flows/tasks/${id}/complete`;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'newArrivals/applyAudit',
          payload: {
            id: this.props.location.query.Id,
            causeList: [values.remark],
            isCheckPass: 0,
            sellerId: this.props.location.query.sellerId,
          },
        }).then(() => {
          this.setState({
            visible: false,
          });
          router.push('/shop/newArrivals');
        });
      }
    });
  }

  /**
   * 取消函数
   */
  handleCancel(e) {
    this.setState({
      visible: false,
    });
  }

  /**
   * 展开身份证预览
   */
  imgShowModal(img, name) {
    this.setState({
      imgVisible: true,
      idImg: img,
      modalName: name,
    });
  }

  /**
   * 展开身份证预览
   */
  imgHandleCancel = () => {
    this.setState({
      imgVisible: false,
    });
  };

  render() {
    const {
      scopeFirst,
      basicInformation,
      basicInformationAfter,
      basicImgBrfore,
      basicImgAfter,
      examineShow,
      buttonShoeHide,
      idImg,
      modalName,
    } = this.state;
    const {
      form: { getFieldDecorator },
      DetailsData,
      loginConfirmOk,
    } = this.props;
    return (
      <PageHeaderWrapper
        content={
          <div className={styles.content}>
            <div className={styles.title}>
              <Avatar
                className={styles.businness_photo}
                src={Object.keys(DetailsData).length > 0 ? DetailsData.sellerInfo.image : noImg}
                onClick={() => this.imgShowModal(DetailsData.sellerInfo.image, '头像')}
                alt=""
              />
              <p className={styles.business_name}>
                {Object.keys(DetailsData).length > 0 ? DetailsData.sellerInfo.name : ''}
              </p>
            </div>
            {/* 商家基本信息 */}
            <div className={styles.business_information}>
              <div className={styles.information_left}>
                <h3>商家基本信息</h3>
                <div className={styles.information_all}>
                  <ul>
                    <li>
                      商家电话：
                      {Object.keys(DetailsData).length > 0 ? DetailsData.sellerInfo.phone : ''}
                    </li>
                    <li>
                      商家地址：
                      {Object.keys(DetailsData).length > 0 ? DetailsData.sellerInfo.address : ''}
                    </li>
                    <li>经营类目：{scopeFirst}</li>
                    <li>
                      商圈：
                      {Object.keys(DetailsData).length > 0 &&
                      DetailsData.sellerInfo.circlesName !== null
                        ? DetailsData.sellerInfo.circlesName
                        : '无'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.leader_information}>
              <div className={styles.leader_left}>
                <h3>负责人信息</h3>
                <div className={styles.leader_all}>
                  <ul>
                    <li>
                      负责人：
                      {Object.keys(DetailsData).length > 0
                        ? DetailsData.sellerInfo.principalName
                        : ''}
                    </li>
                    <li>
                      电话：
                      {Object.keys(DetailsData).length > 0
                        ? DetailsData.sellerInfo.principalPhone
                        : ''}
                    </li>
                    <li>
                      身份证号：
                      {Object.keys(DetailsData).length > 0 ? DetailsData.sellerInfo.idNumber : ''}
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.leader_right}>
                <div className={styles.manager}>
                  <img
                    className={styles.imgIdContrary}
                    onClick={() =>
                      this.imgShowModal(DetailsData.sellerInfo.idContraryImage, '身份证')
                    }
                    src={
                      Object.keys(DetailsData).length > 0
                        ? DetailsData.sellerInfo.idContraryImage
                        : ''
                    }
                    alt=""
                  />
                </div>
                <div className={styles.manager}>
                  <img
                    className={styles.imgIdContrary}
                    onClick={() => this.imgShowModal(DetailsData.sellerInfo.idFrontImage, '身份证')}
                    src={
                      Object.keys(DetailsData).length > 0 ? DetailsData.sellerInfo.idFrontImage : ''
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
            <Modal
              title={modalName}
              visible={this.state.imgVisible}
              onCancel={this.imgHandleCancel}
              footer={null}
            >
              <img className={styles.ModalImgIdContrary} src={idImg} alt="" />
            </Modal>
            <div className={examineShow === true ? styles.none : ''}>
              {/* 审核之前的信息 */}
              <div className={styles.information_contrast}>
                <h3>修改前信息</h3>
                <div className={styles.businness_information}>
                  {basicInformation.length > 0
                    ? basicInformation.map((item, index) => {
                        return (
                          <div className={styles.contrast_div} key={index}>
                            {`${item.name} : ${item.value}`}
                          </div>
                        );
                      })
                    : ''}
                  {basicImgBrfore.length > 0
                    ? basicImgBrfore.map((item, index) => {
                        return (
                          <div className={styles.contrast_div} key={index}>
                            <span className={styles.contrast_span}>{item.name}:</span>
                            <img className={styles.businessLogo} src={item.value} alt="" />
                          </div>
                        );
                      })
                    : ''}
                </div>
              </div>
              {/* <p className={styles.time}>2018-12-05 08:17:22</p> */}
              {/* 审核意见 */}
              <div className={styles.examine}>
                {/* <div className={styles.auditor}>
                            <h3>审核员-魔小咕：</h3>
                            <p>2018-12-05 09:11:17</p>
                        </div> */}
                <div className={styles.reason}>
                  <h3>驳回原因:</h3>
                  {/* <img className={styles.problem} src={problem} alt="" /> */}
                  <div>
                    {Object.keys(this.props.contrast).length > 1 &&
                    this.props.contrast[1].remark !== null
                      ? JSON.parse(this.props.contrast[1].remark)[0]
                      : ''}
                  </div>
                </div>
              </div>
              {/* 审核之后的信息 */}
              <div className={styles.information_contrast}>
                <h3>修改后信息</h3>
                <div className={styles.businness_information}>
                  {basicInformationAfter.length > 0
                    ? basicInformationAfter.map((item, index) => {
                        return (
                          <div className={styles.contrast_div} key={index}>
                            {`${item.name} : ${item.value}`}
                          </div>
                        );
                      })
                    : ''}
                  {basicImgAfter.length > 0
                    ? basicImgAfter.map((item, index) => {
                        return (
                          <div className={styles.contrast_div} key={index}>
                            <span className={styles.contrast_span}>{item.name}:</span>
                            <img className={styles.businessLogo} src={item.value} alt="" />
                          </div>
                        );
                      })
                    : ''}
                </div>
              </div>
            </div>
            {/* 审核按钮 */}
            <div className={styles.button}>
              <div>
                <Popconfirm
                  title="你确定执行此操作吗?"
                  loading={loginConfirmOk}
                  onConfirm={this.confirmOk}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button
                    className={buttonShoeHide === true ? styles.approved : styles.none}
                    type="primary"
                  >
                    审核通过
                  </Button>
                </Popconfirm>
                <Button
                  className={buttonShoeHide === true ? styles.none : styles.approved}
                  type="primary"
                  onClick={this.threeAccount}
                >
                  三方开户
                </Button>
              </div>
              <div>
                <Button className={styles.reject} type="primary" onClick={this.auditReject}>
                  审核驳回
                </Button>
                {/* 审核驳回弹出框 */}
                <Modal
                  // title="Basic Modal"
                  visible={this.state.visible}
                  title="驳回原因"
                  onOk={() => {
                    this.handleOk();
                  }}
                  onCancel={() => {
                    this.handleCancel();
                  }}
                  okText="确认"
                  cancelText="取消"
                  destroyOnClose="true"
                  maskClosable="false"
                >
                  <Form autoComplete="off">
                    <Form.Item>
                      <p style={{ width: 455, marginTop: 20 }}>
                        {getFieldDecorator('remark', {
                          rules: [{ required: true, message: '请输入驳回原因' }],
                        })(<TextArea rows={7} placeholder="请输入驳回原因" />)}
                      </p>
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            </div>
          </div>
        }
      />
    );
  }
}
export default Information;
