import React, { Component } from 'react';
import { Upload, Icon, Modal } from 'antd';
import { connect } from 'dva';
// 裁剪图片
import ImgCrop from 'antd-img-crop';

/**
 * 上传图片
 * 上传多张图片，无裁剪，在魔咕计划中使用（活动）
 */
@connect(({ storeReview, ossUpload, loading }) => ({
  fileList: ossUpload.fileList,
}))
class AcUploadListView extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    console.log('状态', fileList);
  };

  toUploadFile = e => {
    //console.log("上传=》",e)
    const { dispatch, callBack, channelType } = this.props;
    dispatch({
      type: 'ossUpload/fetchUploadListOss',
      payload: { idNum: 1 },
      oss: {
        file: e.file, //文件对象
        fileType: 0, //上传文件类型 0 图像 1 视频 2 未知文件
        type: channelType, //上传渠道类型  0 未知 ，1 商家，2 商品，3 商品评价，4 用户，5 活动 9 系统
      },
      callBack: callBack,
    });
  };

  onRemove = e => {
    const { dispatch, callBack } = this.props;
    // 删除oss服务器上照片
    dispatch({
      type: 'ossUpload/fetchDelOssByUrl',
      payload: {
        url: [e.url],
      },
    }).then(() => {
      dispatch({
        type: 'ossUpload/removeFileList',
        payload: { uid: e.uid, callBack: callBack },
      });
    });
  };

  render() {
    const { previewVisible, previewImage } = this.state;
    const { beforeUpload, fileMaxLength, cropWidth, cropHeight, fileList } = this.props;
    //console.log("渲染=》", fileList)
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        {/* <ImgCrop width={cropWidth} height={cropHeight} resize={true}> */}
        <Upload
          listType="picture-card"
          fileList={fileList}
          customRequest={this.toUploadFile}
          beforeUpload={beforeUpload}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.onRemove}
        >
          {fileList.length >= fileMaxLength ? null : uploadButton}
        </Upload>
        {/* </ImgCrop> */}
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }

  // 初始化
  componentDidMount() {
    const { value } = this.props;
    let list = [];
    console.log('value', value);
    if (value && value.length > 0) {
      value.forEach(element => {
        list.push({
          uid: element,
          name: null,
          status: 'old',
          url: element,
        });
      });
      const { dispatch } = this.props;
      dispatch({
        type: 'ossUpload/initFileList',
        payload: list,
      });
    }
  }

  componentDidUpdate() {
    const { value, fileList } = this.props;
    let list = [];
    if (value && value.length > 0 && fileList.length === 0) {
      value.forEach(element => {
        list.push({
          uid: element,
          name: null,
          status: 'old',
          url: element,
        });
      });
      const { dispatch } = this.props;
      dispatch({
        type: 'ossUpload/initFileList',
        payload: list,
      });
    }
  }
}

export default AcUploadListView;
