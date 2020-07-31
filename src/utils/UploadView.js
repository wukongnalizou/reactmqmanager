import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { connect } from 'dva';
// 裁剪图片
import ImgCrop from 'antd-img-crop';

/**
 * 单文件上传组件
 */

@connect(({ ossUpload, loading }) => ({
  uploadImgUrl: ossUpload.uploadImgUrl,
  isDone: ossUpload.isDone,
}))
class AcUploadView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      uploadImgId: null,
      uploadImgUrl: null,
    };
  }

  setUploadUrl = (uploadImgId, uploadImgUrl) => {
    const { callBack } = this.props;
    if (this.state.uploadImgUrl) {
      const { dispatch } = this.props;
      dispatch({
        type: 'ossUpload/fetchDelOssByUrl',
        payload: {
          url: [this.state.uploadImgUrl],
        },
      });
    }
    if (callBack && callBack instanceof Function) {
      callBack(
        {
          uploadImgId: uploadImgId,
          uploadImgUrl: uploadImgUrl,
        },
        {
          uploadImgId: this.state.uploadImgId,
          uploadImgUrl: this.state.uploadImgUrl,
        },
      );
    }
    this.setState({
      uploadImgId: uploadImgId,
      uploadImgUrl: uploadImgUrl,
    });
  };

  toUploadFile = e => {
    const { dispatch, channelType } = this.props;
    dispatch({
      type: 'ossUpload/fetchUploadOss',
      payload: { idNum: 1 },
      oss: {
        file: e.file, //文件对象
        fileType: 0, //上传文件类型 0 图像 1 视频 2 未知文件
        type: channelType, //上传渠道类型  0 未知 ，1 商家，2 商品，3 商品评价，4 用户，5 活动 9 系统
      },
      setUploadUrl: this.setUploadUrl,
    });
  };

  //上传前
  beforeUpload = file => {
    const { beforeUpload } = this.props;
    if (typeof beforeUpload === 'function') {
      let rs = beforeUpload(file);
      if (!rs) {
        return rs;
      }
    }

    return this.checkImageWH(file);
  };

  // 返回一个 promise：检测通过则返回resolve；失败则返回reject，并阻止图片上传
  checkImageWH = file => {
    const { cropWidth, cropHeight } = this.props;
    // let self = this;
    return new Promise(function(resolve, reject) {
      let filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = e => {
        let src = e.target.result;
        const image = new Image();
        image.onerror = reject;
        image.src = src;
        image.onload = function() {
          // 获取图片的宽高，并存放到file对象中
          file.width = this.width;
          file.height = this.height;
          //尺寸不符合
          if (this.width < cropWidth || this.height < cropHeight) {
            message.warn('图片尺寸小于 ' + cropWidth + ' x ' + cropHeight);
            reject();
          } else {
            resolve();
          }
        };
      };
    });
  };

  //剪切前
  beforeCrop = file => {
    //限制图片 格式、size、分辨率
    const isJPG = file.type === 'image/jpeg';
    const isJPEG = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!(isJPG || isJPEG || isGIF || isPNG)) {
      message.warn('只能上传JPG 、JPEG 、GIF、 PNG格式的图片~');
      return false;
    } else if (!isLt2M) {
      message.warn('超过2M限制，不允许上传~');
      return false;
    }
    return true;
  };

  render() {
    const { name, handleChange, cropWidth, cropHeight } = this.props;
    const { uploadImgUrl } = this.state;

    let uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    ); // 上传图片
    return (
      // <ImgCrop width={cropWidth} height={cropHeight} beforeCrop={this.beforeCrop} resize={true}>
      <Upload
        name={name}
        listType="picture-card"
        className="avatar-uploader"
        customRequest={this.toUploadFile}
        showUploadList={false}
        beforeUpload={this.beforeUpload}
        onChange={handleChange}
      >
        {uploadImgUrl ? <img src={uploadImgUrl} alt="" width="100%" /> : uploadButton}
      </Upload>
      // </ImgCrop>
    );
  }

  // 初始化
  componentDidMount() {
    const { value } = this.props;
    this.setState({
      uploadImgId: value,
      uploadImgUrl: value,
    });
  }

  componentDidUpdate() {
    const { uploadImgUrl } = this.state;
    const { value } = this.props;
    if (uploadImgUrl === '' && value) {
      this.setState({
        uploadImgId: value,
        uploadImgUrl: value,
      });
    }
  }
}

export default AcUploadView;
