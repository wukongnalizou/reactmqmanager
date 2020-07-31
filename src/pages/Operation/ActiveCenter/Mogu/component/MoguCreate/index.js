import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
// 创建商品组件
import { Modal, Button, Input, Radio } from 'antd';
// 上传图片组件
// import UploadView from '../../UploadView/UploadViewList';
import UploadView from '@/components/MqComponent/UploadView';
import { styles } from './index.less';
/**
 * 模块：运营中心
 * 页面：魔咕计划
 * 组件：创建商品
 * modifyDate: 2019-07-12
 * author:Cin
 */
@connect(({ mogu }) => ({
  // addImageList: mogu.addImageList,
  detailImg: mogu.detailImg,
  enLargeImg: mogu.enLargeImg,
  listImg: mogu.listImg,
  productDetail: mogu.productDetail,
}))
class MoguCreateView extends Component {
  state = {
    visible: false,
    info: {},
    value: 0,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    this.state.info.grade = 0;
    // 修改商品
    if (this.props.reset) {
      const { productDetail } = this.props;
      this.setState({
        info: productDetail,
      });
    } else {
      const { dispatch } = this.props;
      dispatch({
        type: 'mogu/setProductDetail',
        payload: {
          productDetail: {},
        },
      });
    }
  }

  /**
   * 添加商品
   */
  addGoods(contentListArray) {
    const { dispatch, detailImg, enLargeImg, listImg } = this.props;
    dispatch({
      type: 'mogu/fetchAddActivitiesProduct',
      payload: {
        contentList: contentListArray, // 商品描述
        cost: this.state.info.cost, // 人民币价值
        detailImgUrl: detailImg, // 详情图片地址
        eachExtractNum: this.state.info.eachExtractNum, // 每次抽取个数
        exchangeCertificatePrice: this.state.info.exchangeCertificatePrice, // 兑奖券兑换单价
        exchangeContent: this.state.info.exchangeContent, // 兑换说明
        grade: this.state.info.grade, // 商品级别
        inventory: this.state.info.inventory, // 库存
        isDelete: 0, // 是否删除
        isEnabled: 1, // 是否可用
        listImgUrl: listImg, // 列表图片地址
        enlargedImgUrl: enLargeImg, // 放大图
        name: this.state.info.name, // 商品名称
        probability: parseInt(this.state.info.probability), // 商品被选中此次出奖的概率
        productAttribute: this.state.info.productAttribute, // 商品属性
      },
    }).then(() => {
      this.setState({
        visible: false,
      });
      setTimeout(e => {
        const { dispatch } = this.props;
        dispatch({
          type: 'mogu/fetchFindActivitiesProductList',
          payload: {
            dateTime: new Date().getTime(),
            pageNum: '1',
            pageSize: 10,
            param: {
              grade: this.props.grade,
            },
          },
        });
      }, 500);
    });
  }

  /**
   * 修改商品
   */
  resetGoods(contentListArray) {
    const { dispatch, productDetail, detailImg, enLargeImg, listImg } = this.props;
    dispatch({
      type: 'mogu/fetchUpdateOrDeleteActivitiesProduct',
      payload: {
        id: this.props.id,
        content: contentListArray,
        cost: this.state.info.cost, // 人民币价值
        detailImgUrl: detailImg ? detailImg : productDetail.detailImgUrl, // 详情图片地址
        eachExtractNum: this.state.info.eachExtractNum, // 每次抽取个数
        exchangeCertificatePrice: this.state.info.exchangeCertificatePrice, // 兑奖券兑换单价
        exchangeContent: this.state.info.exchangeContent, // 兑换说明
        grade: this.state.info.grade, // 商品级别
        inventory: this.state.info.inventory, // 库存
        isDelete: 0, // 是否删除
        isEnabled: 1, // 是否可用
        listImgUrl: listImg ? listImg : productDetail.listImgUrl, // 列表图片地址
        enlargedImgUrl: enLargeImg ? enLargeImg : productDetail.enlargedImgUrl, // 放大图地址
        name: this.state.info.name, // 商品名称
        probability: parseInt(this.state.info.probability), // 商品被选中此次出奖的概率
        productAttribute: this.state.info.productAttribute, // 商品属性
      },
    }).then(() => {
      router.push('/operations/activeCenter/mogu');
    });
  }

  handleOk = e => {
    const { productDetail } = this.props;
    let contentListArray = this.state.info.contentList
      ? this.state.info.contentList.split(',')
      : productDetail.content;
    // 添加商品
    if (!this.props.reset) {
      this.addGoods(contentListArray);
    } else {
      // 修改商品
      this.resetGoods(contentListArray);
    }
  };

  /**
   * 信息输入
   */
  inputInfo(e, name) {
    if (name === 'grade') {
      this.setState(
        {
          value: e.target.value,
        },
        e => {
          this.state.info[name] = this.state.value;
        },
      );
    } else {
      this.state.info[name] = e.target.value;
    }
  }

  render() {
    const { resetGoodsId, productDetail } = this.props;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          {this.props.content ? this.props.content : '创建新商品'}
        </Button>
        <div>
          <Modal
            title={this.props.content ? this.props.content : '创建新商品'}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p style={{ marginTop: 4 }}>商品名称</p>
            <Input
              size="large"
              placeholder={productDetail.name ? productDetail.name : '输入名称'}
              onChange={e => {
                this.inputInfo(e, 'name');
              }}
            />
            <p style={{ marginTop: 8 }}>人民币价值</p>
            <Input
              size="large"
              placeholder={productDetail.cost ? productDetail.cost : '输入人民币价值'}
              onChange={e => {
                this.inputInfo(e, 'cost');
              }}
            />
            <p style={{ marginTop: 8 }}>每次抽取个数</p>
            <Input
              size="large"
              placeholder={
                productDetail.eachExtractNum ? productDetail.eachExtractNum : '输入每次抽取个数'
              }
              onChange={e => {
                this.inputInfo(e, 'eachExtractNum');
              }}
            />
            <p style={{ marginTop: 8 }}>兑奖券兑换单价</p>
            <Input
              size="large"
              placeholder={
                productDetail.exchangeCertificatePrice
                  ? productDetail.exchangeCertificatePrice
                  : '输入兑奖券兑换单价'
              }
              onChange={e => {
                this.inputInfo(e, 'exchangeCertificatePrice');
              }}
            />
            <p style={{ marginTop: 8 }}>兑换说明</p>
            <Input
              size="large"
              placeholder={
                productDetail.exchangeContent ? productDetail.exchangeContent : '输入兑换说明'
              }
              style={{ marginBottom: 20 }}
              onChange={e => {
                this.inputInfo(e, 'exchangeContent');
              }}
            />
            <p style={{ marginTop: 8 }}>商品级别</p>
            <Radio.Group
              onChange={e => {
                this.inputInfo(e, 'grade');
              }}
              value={productDetail.grade ? productDetail.grade : this.state.value}
              style={{ marginBottom: 20 }}
            >
              <Radio value={0}> 高级 </Radio>
              <Radio value={1}> 初级 </Radio>
              <Radio value={2}> 入门 </Radio>
              <Radio value={3}> 常驻 </Radio>
            </Radio.Group>
            <p style={{ marginTop: 8 }}>库存</p>
            <Input
              size="large"
              placeholder={productDetail.inventory ? productDetail.inventory : '输入库存'}
              style={{ marginBottom: 20 }}
              onChange={e => {
                this.inputInfo(e, 'inventory');
              }}
            />
            <p style={{ marginTop: 8 }}>商品被选中此次出奖的概率</p>
            <Input
              size="large"
              placeholder={
                productDetail.probability
                  ? productDetail.probability
                  : '输入商品被选中此次出奖的概率'
              }
              style={{ marginBottom: 20 }}
              onChange={e => {
                this.inputInfo(e, 'probability');
              }}
            />
            <p style={{ marginTop: 8 }}>商品描述(请使用英文逗号)</p>
            <Input
              size="large"
              placeholder={
                productDetail.content
                  ? JSON.parse(productDetail.content)
                  : '输入商品描述 每条描述之间用逗号间隔'
              }
              style={{ marginBottom: 20 }}
              onChange={e => {
                this.inputInfo(e, 'contentList');
              }}
            />
            <p style={{ marginTop: 8 }}>商品属性</p>
            <Input
              size="large"
              placeholder={
                productDetail.productAttribute ? productDetail.productAttribute : '输入商品属性'
              }
              style={{ marginBottom: 20 }}
              onChange={e => {
                this.inputInfo(e, 'productAttribute');
              }}
            />
            {/* 上传图片 */}
            {/* <p style={{ marginTop: 8 }}>上传图片(请将列表图放在第一个,详情图放在第二个,放大图放在第三个)</p>
            <UploadView /> */}
            <p style={{ marginTop: 8 }}>上传列表图图片</p>
            <UploadView type="listImg" />
            <p style={{ marginTop: 8 }}>上传详情图</p>
            <UploadView type="detailImg" />
            <p style={{ marginTop: 8 }}>上传放大图片</p>
            <UploadView type="enLargeImg" />
          </Modal>
        </div>
      </div>
    );
  }
}
export default MoguCreateView;
