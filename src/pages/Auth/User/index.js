import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Input, Tag, Icon, Button, Modal, Form, Select, message, Switch } from 'antd';
import { connect } from 'dva';
import MqTable from '@/components/MqTable';
import styles from './index.less';
const { Option } = Select;
const FormItem = Form.Item;
const UserBasicInfoForm = Form.create({})(props => {
  const { form, userBasicInfo, loading, roleList = [] } = props;
  const { getFieldDecorator } = form;
  return (
    <Form>
      <div>
        {getFieldDecorator('userId', {
          initialValue: userBasicInfo.userId,
        })(<Input type="hidden" />)}
      </div>
      <FormItem label="用户名">
        {getFieldDecorator('name', {
          initialValue: userBasicInfo.name,
          rules: [
            {
              required: true,
              message: '用户名不能为空',
            },
          ],
        })(<Input placeholder="请输入用户名" />)}
      </FormItem>
      <FormItem label="电话">
        {getFieldDecorator('phone', {
          initialValue: userBasicInfo.phone,
          rules: [
            {
              required: true,
              message: '手机号不能为空',
            },
          ],
        })(<Input type="number" addonBefore="+86" placeholder="请输入手机号" />)}
      </FormItem>
      <FormItem label="密码">
        {getFieldDecorator('password', {
          initialValue: userBasicInfo.password,
          rules: [
            {
              required: true,
              message: '密码不能为空',
            },
          ],
        })(<Input.Password placeholder="请输入密码" />)}
      </FormItem>
      <FormItem label="角色">
        {getFieldDecorator('roleIds', {
          initialValue: userBasicInfo.roleIds,
        })(
          <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择角色">
            {roleList.map(item => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>
    </Form>
  );
});
@connect(({ authUser }) => ({
  authUser,
}))
export default class User extends PureComponent {
  state = {
    visible: false,
    create: true,
    searchCon: '', //搜索内容
    pagination: {
      pageNum: '1',
      pageSize: '10',
    },
    name: '', //记录姓名
    phone: '', //记录电话
    searchName: '', //搜索姓名
    searchPhone: '', //搜索电话
    userBasicInfo: {},
  };
  componentDidMount() {
    this.fetchUserAll();
    this.fetchRoleAll();
  }
  fetchUserAll = () => {
    const { pagination, searchName, searchPhone } = this.state;
    this.props.dispatch({
      type: 'authUser/fetchUserAll',
      payload: {
        ...pagination,
        param: {
          phone: searchPhone,
          name: searchName,
        },
      },
    });
  };
  fetchRoleAll = () => {
    this.props.dispatch({
      type: 'authUser/fetchRoleAll',
      payload: {},
    });
  };
  handleEdit = record => {
    const { roleList = [] } = record;
    const checked = roleList.map(item => {
      return item.roleId;
    });
    record.roleIds = checked;
    this.setState({
      create: false,
      visible: true,
      userBasicInfo: record,
    });
  };

  handleCreate = () => {
    this.setState({
      create: true,
      visible: true,
      userBasicInfo: {},
    });
  };

  onLoad = params => {
    const { pagination } = params;
    this.setState(
      {
        pagination: pagination,
      },
      () => {
        this.fetchUserAll();
      },
    );
  };
  handleOk = () => {
    const { create } = this.state;
    this.userForm.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: `authUser/${create ? 'addUser' : 'updateUser'}`,
          payload: {
            ...values,
          },
          callback: res => {
            if (res.success) {
              this.fetchUserAll();
            } else {
              message.error(res.subMsg);
            }
            this.setState({
              visible: false,
            });
          },
        });
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  searchClick = () => {
    const { name, phone } = this.state;
    this.setState(
      {
        searchName: name,
        searchPhone: phone,
      },
      () => {
        this.fetchUserAll();
      },
    );
  };
  setSearch = (name, e) => {
    this.setState({
      [name]: e.target.value,
    });
  };
  enableChange = (checked, record) => {
    if (checked) {
      record.isEnabled = 1;
    } else {
      record.isEnabled = 0;
    }
    this.props.dispatch({
      type: 'authUser/enableUser',
      payload: record,
      callback: res => {
        if (res.success) {
          this.fetchUserAll();
        } else {
          message.error(res.subMsg);
        }
      },
    });
  };
  handleRemove = record => {
    this.props.dispatch({
      type: 'authUser/deleteUser',
      payload: {
        userId: record.userId,
      },
      callback: res => {
        if (res.success) {
          this.fetchUserAll();
        } else {
          message.error(res.subMsg);
        }
      },
    });
  };
  render() {
    const { create, visible, name, phone, userBasicInfo } = this.state;
    const { roleList, userList } = this.props.authUser;
    const columns = [
      { title: '用户名', dataIndex: 'name' },
      { title: '电话号', dataIndex: 'phone' },
      {
        title: '拥有角色',
        dataIndex: 'roleList',
        render: record => (
          <span>
            {record.map(item => (
              <Tag color="blue" key={item.roleId}>
                {item.name}
              </Tag>
            ))}
          </span>
        ),
      },
      {
        title: '启/停用',
        dataIndex: 'isEnabled',
        render: (text, record) => (
          <Switch
            checkedChildren="启"
            unCheckedChildren="停"
            checked={text == 1 ? true : false}
            onChange={checked => {
              this.enableChange(checked, record);
            }}
          />
        ),
      },
    ];
    const SearchCon = () => {
      return (
        <div className={styles.searchBox}>
          <div className={styles.inputBox}>
            <Input
              placeholder="用户名"
              value={name}
              onChange={e => {
                this.setSearch('name', e);
              }}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </div>
          <div className={styles.inputBox}>
            <Input
              placeholder="手机号"
              value={phone}
              onChange={e => {
                this.setSearch('phone', e);
              }}
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </div>
          <div className={styles.searchBtn}>
            <Button
              type="primary"
              onClick={() => {
                this.searchClick();
              }}
            >
              查询
            </Button>
          </div>
        </div>
      );
    };
    const top = {
      search: {
        content: <SearchCon />,
      },
      create: {
        text: '新建',
        name: 'create',
        onClick: () => {
          this.handleCreate();
        },
      },
    };
    const rowButtons = [
      {
        text: '编辑',
        name: 'edit',
        onClick: record => {
          this.handleEdit(record);
        },
      },
      {
        text: '删除',
        name: 'delete',
        confirm: '是否要删除此条信息',
        onClick: record => {
          this.handleRemove(record);
        },
      },
    ];
    return (
      <div className={styles.userBox}>
        <PageHeaderWrapper
          content={
            <MqTable
              columns={columns}
              rowButtons={rowButtons}
              list={userList}
              onLoad={this.onLoad}
              top={top}
            />
          }
        />
        <Modal
          title={create ? '创建用户' : '修改用户'}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <UserBasicInfoForm
            userBasicInfo={userBasicInfo}
            roleList={roleList}
            ref={el => {
              this.userForm = el;
            }}
          />
        </Modal>
      </div>
    );
  }
}
