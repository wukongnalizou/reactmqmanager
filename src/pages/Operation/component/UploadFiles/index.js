import React, { Component } from 'react';
import { connect } from 'dva';
import { Upload, message, Button, Icon } from 'antd';
import UploadFiles from '@/utils/UploadFiles';
/**
 * 模块：公用
 * 组件：上传文件
 */
@connect(({ avatar }) => ({
  movingUrl: avatar.movingUrl,
}))
class UploadFilesView extends Component {
  state = {
    fileUrl: '',
    // fileList:''
  };

  render() {
    return (
      <div>
        <UploadFiles
          name="file"
          value={this.state.fileUrl}
          action={this.state.fileUrl}
          channelType={4}
          fileType={0}
          //fileList={this.state.fileList}
          beforeUpload={file =>
            // console.log("文件上传前", file);
             true
          }
          handleChange={file => {
            console.log('文件上传状态', file.file.status);
            // this.setState({
            //   fileList:file.fileList
            // })
          }}
          callBack={(e, e2) => {
            console.log('回调');
            this.setState({
              fileUrl: e.uploadImgUrl,
            });
            const { dispatch } = this.props;
            dispatch({
              type: 'avatar/setMovingUrl',
              payload: {
                movingUrl: e.uploadImgUrl,
              },
            });
          }}
        ></UploadFiles>
      </div>
    );
  }
}
export default UploadFilesView;
