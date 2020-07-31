import React, { Component } from 'react';
import { Table, Button, Radio, Modal, Input, Tabs } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// 创建组件
import AatarCreatView from './component/AvatarCreate';
import UploadView from '@/components/MqComponent/UploadView';
import UploadFilesView from '@/components/MqComponent/UploadFiles';
// import leader from '@/assets/global/leader.png';
/**
 * 模块：基础配置
 * 页面：头像框管理
 * author：lisimeng
 * modifyDate:2019-06-23
 * author:Cin
 */
// 表格列
const { TabPane } = Tabs;
const RadioGroup = Radio.Group;
@connect(({ avatar }) => ({
  avatarList: avatar.avatarList,
  total: avatar.total,
  staticUrl: avatar.staticUrl,
  movingUrl: avatar.movingUrl,
}))
class AvatarBox extends Component {
  state = {
    createTime: new Date().getTime(),
    pageNum: 0,
    // 修改头像款显示隐藏
    updateShow: false,
    // 头像框id
    avatarId: '',
    // 头像名称
    avatarName: '',
    // 头像框描述
    avatarCondition: '',
    // 选择类型
    getType: 0,
  };

  componentDidMount() {
    this.getAvatarList(1);
  }

  /**
   * 获取头像框列表
   */
  getAvatarList(pageNum) {
    const { dispatch, avatarList } = this.props;
    this.state.createTime = avatarList[avatarList.length - 1]
      ? avatarList[avatarList.length - 1].createtIme
      : this.state.createTime;
    dispatch({
      type: 'avatar/fetchFindAllPhotoFrame',
      payload: {
        dateTime: this.state.createTime,
        pageNum,
        pageSize: 5,
        param: {},
      },
    });
  }

  /**
   * 下一页
   */
  nextPageClick = e => {
    this.getAvatarList(e);
  };

  /**
   * 修改头像框
   */
  updateClick = (e, e1) => {
    // console.log('update', e1.id, e1.staticUrl, e1.ossUrl);
    this.state.avatarId = e1.id;
    const { dispatch } = this.props;
    dispatch({
      type: 'avatar/setStaticUrl',
      payload: {
        staticUrl: e1.staticUrl,
      },
    });
    dispatch({
      type: 'avatar/setMovingUrl',
      payload: {
        movingUrl: e1.ossUrl,
      },
    });
    this.setState({
      updateShow: true,
    });
  };

  /**
   * 确认
   */
  handleOk() {
    const { dispatch, movingUrl, staticUrl } = this.props;
    dispatch({
      type: 'avatar/fetchUpdatePhotoFrame',
      payload: {
        conditions: this.state.avatarCondition,
        createTime: new Date().getTime(),
        id: this.state.avatarId,
        ossUrl: movingUrl,
        pfName: this.state.avatarName,
        staticUrl,
        type: this.state.getType,
        updateTime: new Date().getTime(),
      },
    });
    this.setState({
      updateShow: false,
    });
  }

  /**
   * 取消
   */
  handleCancel() {
    this.setState({
      updateShow: false,
    });
  }

  /**
   * 头像框名称输入
   */
  inputData(e) {
    this.state.avatarName = e.target.value;
  }

  /**
   * 头像框描述输入
   */
  inputDataCondition(e) {
    this.state.avatarCondition = e.target.value;
  }

  /**
   * 选择获取类型
   */
  typeChange(e) {
    this.state.getType = e.target.value;
  }

  render() {
    const columns = [
      {
        title: '头像框图片',
        dataIndex: 'staticUrl',
        key: 'staticUrl',
        render: e => {
          return <img src={e} style={{ width: '100px', height: '100px' }} />;
        },
      },
      {
        title: '头像框名称',
        dataIndex: 'pfName',
        key: 'pfName',
      },
      {
        //     title: '属性',
        //     dataIndex: 'value',
        //     key: 'value',
        // }, {
        title: '修改',
        // dataIndex: 'id',
        key: 'id',
        render: (e, oss) => {
          return (
            <Button type="primary" onClick={e => this.updateClick(e, oss)}>
              修改
            </Button>
          );
        },
        // }, {
        //     title: '删除',
        //     dataIndex: 'lowershelf',
        //     key: 'lowershelf',
        //     render: () => <Button type="primary">删除</Button>
      },
    ];
    const { avatarList, total, staticUrl } = this.props;
    return (
      <PageHeaderWrapper
        content={
          <div>
            <div>
              {/* 创建头像框 */}
              <AatarCreatView />
            </div>
            {/* 表格 */}
            <div>
              <Table
                columns={columns}
                dataSource={avatarList}
                pagination={{
                  defaultPageSize: 5,
                  disabled: false,
                  total,
                  onChange: e => {
                    this.nextPageClick(e);
                  },
                }}
              />
            </div>
            {/* 修改头像框 */}
            <Modal
              title="创建头像框"
              visible={this.state.updateShow}
              destroyOnClose
              onOk={() => this.handleOk()}
              onCancel={() => this.handleCancel()}
            >
              <Tabs defaultActiveKey="1">
                <TabPane tab="静态头框" key="1">
                  <p style={{ marginTop: 4 }}>头像框名称</p>
                  <Input
                    style={{ marginBottom: 20 }}
                    size="large"
                    placeholder="输入名称"
                    onChange={e => {
                      this.inputData(e);
                    }}
                  />
                  <p style={{ marginTop: 4 }}>头像框描述</p>
                  <Input
                    style={{ marginBottom: 20 }}
                    size="large"
                    placeholder="描述内容"
                    onChange={e => {
                      this.inputDataCondition(e);
                    }}
                  />
                  <p style={{ marginTop: 4 }}>头像框获取方式</p>
                  <RadioGroup
                    name="radiogroup"
                    defaultValue={0}
                    onChange={(e, name) => {
                      this.typeChange(e, 'type');
                    }}
                    style={{ marginBottom: 20 }}
                  >
                    <Radio value={0}>默认</Radio>
                  </RadioGroup>
                  {/* 上传图片  */}
                  <UploadView imageUrl={staticUrl} />
                </TabPane>
                <TabPane tab="动态头框" key="2">
                  {/* <p style={{ marginTop: 4 }}>头像框名称</p>
                        <Input style={{ marginBottom: 20 }} size="large" placeholder="输入名称" /> */}
                  {/* 上传文件  */}
                  <UploadFilesView />
                </TabPane>
              </Tabs>
            </Modal>
          </div>
        }
      />
    );
  }
}
export default AvatarBox;
