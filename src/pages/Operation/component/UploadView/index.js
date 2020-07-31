import React, { Component } from 'react';
import { Upload, Icon, Modal } from 'antd';
import { connect } from 'dva';
import UploadView from '@/utils/UploadView';
/**
 * 模块：公用
 * 组件：上传照片
 */
@connect(({ avatar, mogu }) => ({
  staticUrl: avatar.staticUrl,
  listImg: mogu.listImg, // 列表图片地址
  detailImg: mogu.detailImg, // 详情图片地址
  enLargeImg: mogu.enLargeImg, // 放大图片地址
}))
class OssUploadView extends Component {
  state = {
    previewVisible: false,
    imageUrl: '',
  };

  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">添加图片</div>
      </div>
    );
    return (
      <div className="clearfix">
        <UploadView
          name="avatar"
          value={this.state.imageUrl}
          channelType={9}
          fileType={0}
          cropHeight={100}
          cropWidth={100}
          beforeUpload={file =>
            // console.log("文件上传前", file)
             true
          }
          handleChange={file => {
            console.log('文件上传状态', file.file.status);
          }}
          callBack={(e, e2) => {
            // console.log("回调", e, e2)
            this.setState({
              imageUrl: e.uploadImgUrl,
            });
            const { dispatch, listImg, detailImg, enLargeImg } = this.props;
            // 设置魔咕计划商品图片
            if (this.props.type === 'listImg') {
              dispatch({
                type: 'mogu/setImageUrl',
                payload: {
                  detailImg,
                  enLargeImg,
                  listImg: e.uploadImgUrl,
                },
              });
            } else if (this.props.type === 'detailImg') {
              dispatch({
                type: 'mogu/setImageUrl',
                payload: {
                  detailImg: e.uploadImgUrl,
                  enLargeImg,
                  listImg,
                },
              });
            } else if (this.props.type === 'enLargeImg') {
              dispatch({
                type: 'mogu/setImageUrl',
                payload: {
                  detailImg,
                  enLargeImg: e.uploadImgUrl,
                  listImg,
                },
              });
            } else {
              // 设置头像框
              dispatch({
                type: 'avatar/setStaticUrl',
                payload: {
                  staticUrl: e.uploadImgUrl,
                },
              });
            }
          }}
        ></UploadView>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={this.state.imageUrl} />
        </Modal>
      </div>
    );
  }
//   componentDidMount() {
//     // console.log('获取的地址',this.props.imageUrl )
//     // this.setState({
//     //   imageUrl: this.props.imageUrl
//     // })
//   }
}
export default OssUploadView;
