import React, { PureComponent } from 'react';
import { Select } from 'antd';
/**
 * 模块：商户中心
 * 页面：审核-开户方式-商家开户
 * 组件：开户银行 select选择器
 */
const { Option, OptGroup } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default class Bank extends PureComponent {
  render() {
    return (
      <div>
        <Select
          defaultValue="开户银行"
          style={{ width: '3rem', marginLeft: '0.1rem' }}
          onChange={handleChange}
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
        </Select>
      </div>
    );
  }
}
