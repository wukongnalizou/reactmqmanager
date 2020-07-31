import React, { Component } from 'react';
import { Icon, Button, Input, Radio } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './index.less';
// 筛选-年龄组件
import AgeView from './component/Age';
// 表格
import TableView from './component/Table';
/**
 * 模块：用户中心
 * 页面：用户中心
 * @author:lisimeng
 */
const { Search } = Input;
const RadioGroup = Radio.Group;
@connect(({ userBack }) => ({
  userBack,
}))
export default class Custom extends Component {
  state = {
    value: 2,
    searchContent: '',
    createTime: new Date().getTime(),
  };

  // 选择搜索类型
  chooseType(e) {
    this.setState({
      value: e.target.value,
    });
  }

  // 内容搜索
  serachContent(e) {
    this.state.searchContent = e.target.value;
  }

  // 确认搜索
  confirm(e) {
    this.getUserList(1, this.state.value, this.state.searchContent);
  }

  // 查询用户列表
  getUserList(pageNum, queryType, queryValue) {
    const { dispatch } = this.props;
    dispatch({
      type: 'userBack/fetchSelUserAll',
      payload: {
        dateTime: this.state.createTime,
        pageNum,
        pageSize: 9,
        param: {
          queryType,
          queryValue,
        },
      },
    });
  }

  render() {
    return (
      <PageHeaderWrapper
        content={
          <div className={styles.content}>
            {/* 左侧内容 */}
            <div className={styles.left}>
              {/* 表格 */}
              <div className={styles.tableView}>
                <TableView />
              </div>
            </div>
            {/* 右侧筛选 */}
            <div className={styles.right}>
              {/* 标题筛选 */}
              <div className={styles.title}>
                <div className={styles.icon}>
                  <Icon type="form" />
                </div>
                <span>筛选</span>
              </div>
              {/* 选择 */}
              <div className={styles.input}>
                <span className={styles.title}>选择</span>
                <div className={styles.SexView}>
                  <RadioGroup
                    onChange={e => {
                      this.chooseType(e);
                    }}
                    value={this.state.value}
                  >
                    <Radio value={1}>姓名搜索</Radio>
                    <Radio value={2}>电话搜索(全部搜索)</Radio>
                  </RadioGroup>
                </div>
              </div>
              {/* 搜索插件 */}
              <div className={styles.searchView}>
                <Search
                  placeholder="请输入姓名或者电话号"
                  onSearch={value => console.log(value)}
                  enterButton
                  onChange={e => {
                    this.serachContent(e);
                  }}
                />
              </div>
              {/* 确认按钮 */}
              <div>
                <Button
                  className={styles.button}
                  type="primary"
                  onClick={e => {
                    this.confirm(e);
                  }}
                >
                  确认
                </Button>
              </div>
            </div>
          </div>
        }
      />
    );
  }
}
