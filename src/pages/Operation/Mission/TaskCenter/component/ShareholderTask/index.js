import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider, Select, Alert } from 'antd';
import isEqual from 'lodash/isEqual';
import { connect } from 'dva';
import styles from './index.less';

const { Option } = Select;
@connect(({ task }) => ({
  actionList: task.actionList,
  giftList: task.giftList,
}))
class ShareholderTask extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
      /* eslint-disable-next-line react/no-unused-state */
      value: props.value,
      tipsShow: '',
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    return {
      data: nextProps.value,
      value: nextProps.value,
    };
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  newMember = () => {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      // certType: '',
      name: '',
      // certId: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  remove(key) {
    const { data } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.key !== key);
    this.setState({ data: newData });
    onChange(newData);
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  selectFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e;
      this.setState({ data: newData });
    }
  }

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      const childArray = [
        'name',
        'assignmentGiftServerId',
        'standard',
        'serverCode',
        'giftNum',
        'content',
      ];
      const childTipShow = ['任务名', '礼品绑定', '行为出发次数', '行为绑定', '礼品个数', '任务描述'];
      for (let i = 0; i < childArray.length; i++) {
        if (!target[childArray[i]]) {
          // !target.certType ||
          // message.error('请填写完整成员信息。');
          this.setState({
            tipsShow: childTipShow[i],
          });
          e.target.focus();
          this.setState({
            loading: false,
          });
          return;
        }
      }
      delete target.isNew;
      this.toggleEditable(e, key);
      const { data } = this.state;
      const { onChange } = this.props;
      onChange(data);
      this.setState({
        loading: false,
      });
      const { dispatch } = this.props;
      dispatch({
        type: 'task/setChildTaskAdd',
        payload: {
          childTaskAdd: data,
        },
      });
    }, 500);
  }

  /**
   * 关闭必填提示
   */
  onCloseClick() {
    this.setState({
      tipsShow: '',
    });
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      delete this.cacheOriginData[key];
    }
    target.editable = false;
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  render() {
    const { giftList, actionList } = this.props;
    const columns = [
      {
        title: '任务名称',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'name', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="任务名称"
              />
            );
          }
          return text;
        },
      },
      {
        title: '任务描述',
        dataIndex: 'content',
        key: 'content',
        width: '15%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'content', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="任务名称"
              />
            );
          }
          return text;
        },
      },
      {
        title: '行为绑定',
        dataIndex: 'serverCode',
        key: 'serverCode',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select
                // labelInValue
                style={{ width: 200 }}
                defaultValue="请选择行为"
                onChange={e => this.selectFieldChange(e, 'serverCode', record.key)}
              >
                {actionList.map((item, index) => (
                    <Option value={item.serverCode} key={item.id}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            );
          }
          // return text;
          return text;
        },
      },
      {
        title: '行为触发次数',
        dataIndex: 'standard',
        key: 'standard',
        width: '10%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'standard', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="1次"
              />
            );
          }
          return text;
        },
      },
      {
        title: '礼品绑定',
        dataIndex: 'assignmentGiftServerId',
        key: 'assignmentGiftServerId',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select
                // labelInValue
                style={{ width: 200 }}
                defaultValue="请选择礼品"
                onChange={e => this.selectFieldChange(e, 'assignmentGiftServerId', record.key)}
              >
                {giftList.map((item, index) => (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            );
          }
          // return text;
          return text;
        },
      },
      {
        title: '礼品个数',
        dataIndex: 'giftNum',
        key: 'giftNum',
        width: '10%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'giftNum', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="1个"
              />
            );
          }
          return text;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const { loading, data } = this.state;
    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          // rowClassName={record => (record.editable ? styles.editable : '')}
          rowClassName={record => ''}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          添加子任务
        </Button>
        {this.state.tipsShow !== '' ? (
          <Alert
            message="提示"
            description={`${this.state.tipsShow}为必填项`}
            type="error"
            closeText="x"
            showIcon
            style={{ width: 600, position: 'absolute', top: 300, left: 600 }}
            onClose={e => {
              this.onCloseClick(e);
            }}
          />
        ) : (
          ''
        )}
      </Fragment>
    );
  }
}

export default ShareholderTask;
