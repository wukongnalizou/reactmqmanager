import React, { Component } from 'react';
import { Upload, Icon, message, Checkbox } from 'antd';
import styles from './index.less';
/**
 * 模块：分类服务
 * 页面：分类管理
 * 组件：上传图片、选择标签
 */

// 上传图片组件
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}
// 多选标签组件
const CheckboxGroup = Checkbox.Group;
function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}
const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];
export default class UploadView extends Component {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div>
        {/* 上传照片组件 */}
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="//jsonplaceholder.typicode.com/posts/"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
        {/* 选择标签组件 */}
        <div className={styles.checkbox}>
          <CheckboxGroup options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
          <CheckboxGroup options={options} defaultValue={['Pear']} onChange={onChange} />
        </div>
      </div>
    );
  }
}
