import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import MqTable from '@/components/MqTable';
import { Button, Modal, Input } from 'antd';
import styles from './index.less';
const { TextArea } = Input;

@connect(({ businessExamine }) => ({
  businessExamine,
}))
export default class BusinessExamine extends PureComponent {
  state = {
    visible: false,
    searchCon: '', //搜索内容
    pagination: {
      pageNum: '1',
      pageSize: '10',
    },
    reason: '', //驳回原因
    nowItem: {}, //当前行数据
  };
  componentDidMount() {
    this.fetchList();
  }
  fetchList = () => {
    const { pagination, searchCon } = this.state;
    this.props.dispatch({
      type: 'businessExamine/fetchlist',
      payload: {
        ...pagination,
        param: {
          keywords: searchCon,
        },
      },
    });
  };
  handleEdit = (record) => {
    this.props.dispatch({
      type: 'businessExamine/exmaine',
      payload: {
        sellerEnterId: record.sellerEnterId,
        cmd: 0,
      },
      callback: res => {
        if (res.success) {
          this.fetchList();
        } else {
          message.error(res.subMsg);
        }
      },
    });
  };

  handleRemove = (record) => {
    this.setState({
      visible: true,
      nowItem: record
    });
  };

  handleSearch = text => {
    this.setState(
      {
        searchCon: text,
      },
      () => {
        this.fetchList();
      },
    );
  };

  onLoad = params => {
    const { pagination } = params;
    this.setState(
      {
        pagination: pagination,
      },
      () => {
        this.fetchList();
      },
    );
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  reasonChange = e => {
    this.setState({
      reason: e.target.value,
    });
  };

  handleOk = () => {
    const { nowItem, reason } = this.state;
    this.props.dispatch({
      type: 'businessExamine/exmaine',
      payload: {
        sellerEnterId: nowItem.sellerEnterId,
        cmd: 1,
        refuseReason: reason
      },
      callback: res => {
        if (res.success) {
          this.fetchList();
        } else {
          message.error(res.subMsg);
        }
        this.handleCancel();
      },
    });
  };

  render() {
    const { visible, reason } = this.state;
    const { examineList } = this.props.businessExamine;
    const columns = [
      { title: '商家名称', dataIndex: 'sellerName' },
      { title: '手机号', dataIndex: 'phone' },
      { title: '待审核平台分成比例', dataIndex: 'scale' },
      { title: '提交审核时间', dataIndex: 'applyTime' },
    ];
    const top = {
      search: {
        placeholder: '请输入',
        onClick: text => {
          this.handleSearch(text);
        },
      },
    };
    const rowButtons = [
      {
        name: 'edit',
        content: <Button type="primary">审核通过</Button>,
        confirm: '是否审核通过',
        onClick: record => {
          this.handleEdit(record);
        },
      },
      {
        name: 'delete',
        content: <Button type="danger">审核驳回</Button>,
        onClick: record => {
          this.handleRemove(record);
        },
      },
    ];
    return (
      <div>
        <PageHeaderWrapper
          content={
            <MqTable
              columns={columns}
              rowButtons={rowButtons}
              list={examineList}
              onLoad={this.onLoad}
              top={top}
            />
          }
        />
        <Modal
          title="请输入驳回原因"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <TextArea
            value={reason}
            rows={4}
            onChange={e => {
              this.reasonChange(e);
            }}
          />
        </Modal>
      </div>
    );
  }
}
