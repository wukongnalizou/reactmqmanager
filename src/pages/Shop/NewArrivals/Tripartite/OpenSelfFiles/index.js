import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
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
  Table,
  Popconfirm,
  Upload,
  Icon,
} from 'antd';
import moment from 'moment';
// import { baseUrl } from '@/utils/settings';
import { connect } from 'dva';
import router from 'umi/router';
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
 * 模块：个体户中心
 * 页面：审核-开户方式-商家开户
 * author：lisimeng songshuyu
 */
let setFile = {};
@connect(({ tripartite, loading }) => ({
  selfSellerIdData: tripartite.selfSellerIdData,
  reviewUploadStatus: tripartite.reviewUploadStatus, // 控制文件是否上传成功
  loginOpenSelf: loading.effects['tripartite/submitOpenSelf'], // 提交的等待
}))
@Form.create()
class OpenSelfFiles extends Component {
  state = {
    filesNum: 0, // 已上传文件个数
  };
  // 初始化
  componentDidMount() {
    this.uploadFilesList(); // 获取已上传文件列表
  }
  /**
   *  获取已上传文件列表
   */
  uploadFilesList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tripartite/uploadFilesList',
      payload: { sellerId: this.props.location.query.sellerId },
    }).then(() => {
      const { selfSellerIdData } = this.props;
      this.setState({
        filesNum: selfSellerIdData.length,
      });
    });
  };
  /**
   * 删除类别
   */
  delete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tripartite/deleteSelfFiles',
      payload: { id },
    }).then(() => {
      this.uploadFilesList();
    });
  };

  spenSelfAdd = () => {
    router.push(
      `/shop/newArrivals/tripartite/openSelf?userId=${this.props.location.query.userId}&&userCustId=${this.props.location.query.userCustId}&&sellerId=${this.props.location.query.sellerId}&&Id=${this.props.location.query.Id}`,
    );
  };
  /**
   * 个体商户上传文件
   */
  click = () => {
    const { dispatch } = this.props,
      { filesNum } = this.state;
    // 获取页面已有的一个form表单
    const form = document.getElementById('fileUploadForm');
    // 用表单来初始化
    const formData = new FormData(form);
    console.log('filesNum', filesNum);
    if (filesNum < 10) {
      dispatch({
        type: 'tripartite/reviewUpload',
        payload: formData,
      }).then(() => {
        if (this.props.reviewUploadStatus) {
          this.uploadFilesList();
          document.getElementById('fileUploadForm').reset();
        }
      });
    } else {
      message.warning('上传文件不得超过十个！');
    }
  };
  render() {
    const { selfSellerIdData } = this.props,
      columns = [
        {
          title: '名称',
          dataIndex: 'fileName',
          key: 'fileName',
        },
        {
          title: '文件描述',
          dataIndex: 'attachDesc',
          key: 'attachDesc',
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          render: (text, record) => {
            return <span>{moment(record.createTime).format('YYYY-MM-DD:hh:mm')}</span>;
          },
        },
        {
          title: '删除',
          key: 'delete',
          render: (text, record) => (
            <span>
              <Popconfirm
                title="确定要删除该分类吗?"
                onConfirm={() => this.delete(record.attachId)}
                okText="确定"
                cancelText="取消"
              >
                <Button type="primary">删除</Button>
              </Popconfirm>
            </span>
          ),
        },
      ];
    return (
      <PageHeaderWrapper
        content={
          <div>
            <Button
              className={styles.button}
              disabled={selfSellerIdData.length > 0 ? false : true}
              type="primary"
              onClick={this.spenSelfAdd}
            >
              开户
            </Button>
            <Table columns={columns} dataSource={selfSellerIdData} pagination={false} />
            {/* 个体户开户成功之后提交到三方 */}
            <form
              id="fileUploadForm"
              encType="multipart/form-data"
              // action="http://192.168.2.244:19201/pay/core/v1/api/upload/fileUpload"
              // target ='_blank'
              action=""
              method="post"
            >
              附件类型：
              <select className={styles.description} name="attachType">
                <option value="00">营业执照注册号</option>
                <option value="01">组织结构代码证</option>
                <option value="02">税务登记证号</option>
                <option value="03">法人证件</option>
                <option value="04">开户银行许可证</option>
                <option value="05">统一社会信用代码</option>
                <option value="08">开户电子协议</option>
                <option value="09">法人证件反面</option>
                <option value="10">经营照片</option>
                <option value="11">经营照片（地址照片）</option>
                <option value="12">经营照片（门面照片）</option>
                <option value="13">结算卡正面</option>
                <option value="14">结算卡反面</option>
                <option value="99">其他</option>
              </select>{' '}
              <br />
              文件描述：
              <input
                autoComplete="off"
                className={styles.description}
                type="text"
                name="attachDesc"
              />{' '}
              <br />
              上传文件：
              <input className={styles.upfiles} type="file" name="file" />
              <br />
              <input type="hidden" name="sellerId" value={this.props.location.query.sellerId} />
              <input type="hidden" name="userId" value={this.props.location.query.userId} />
              <input type="hidden" name="transType" value="05" />
              {/* <input type="submit" value="提交" /> */}
            </form>
            <Button type="primary" onClick={this.click}>
              提交
            </Button>
          </div>
        }
      />
    );
  }
}
export default OpenSelfFiles;
