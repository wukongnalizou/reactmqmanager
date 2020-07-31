import React, { Component } from 'react';
import { Upload, Icon, Button } from 'antd';
import { connect } from 'dva';
import styles from './UploadFiles.less';

/**
 * 单文件上传组件
 */

@connect(({ ossUpload, loading }) => ({
  uploadImgUrl: ossUpload.uploadImgUrl,
  isDone: ossUpload.isDone,
}))
class AcUploadFile extends Component {
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
    console.log('uploadImgUrl', uploadImgUrl);
    console.log('this.state.uploadImgUrl', this.state.uploadImgUrl);
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
    //console.log("上传=》",e)
    const { dispatch, callBack, channelType, fileType } = this.props;
    dispatch({
      type: 'ossUpload/fetchUploadOss',
      payload: { idNum: 1 },
      oss: {
        file: e.file, //文件对象
        fileType: fileType, //上传文件类型 0 图像 1 视频 2 未知文件
        type: channelType, //上传渠道类型  0 未知 ，1 商家，2 商品，3 商品评价，4 用户，5 活动 9 系统
      },
      setUploadUrl: this.setUploadUrl,
    });
  };

  render() {
    const { name, beforeUpload, handleChange, cropWidth, cropHeight, url, list } = this.props;
    const { uploadImgUrl } = this.state;
    //console.log('list', list)
    let uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    ); // 上传图片
    return (
      <Upload
        //name={name}
        //listType="picture-card"
        //action={url}
        className={styles.avatarUploader}
        customRequest={this.toUploadFile}
        //showUploadList={true}
        multiple={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        <Button>
          <Icon type="upload" /> 点击上传
        </Button>
      </Upload>
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

export default AcUploadFile;
