import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Input, Tag, Icon, Button, Modal, Form, Select, Tree, message, Switch } from 'antd';
import MqTable from '@/components/MqTable';
import styles from './index.less';
const { Option } = Select;
const { TreeNode } = Tree;
const FormItem = Form.Item;
const RoleBasicInfoForm = Form.create({})(props => {
  const { form, roleBasicInfo, loading } = props;
  const { getFieldDecorator } = form;
  return (
    <Form>
      <div>
        {getFieldDecorator('roleId', {
          initialValue: roleBasicInfo.roleId,
        })(<Input type="hidden" />)}
      </div>
      <FormItem label="角色名">
        {getFieldDecorator('name', {
          initialValue: roleBasicInfo.name,
          rules: [
            {
              required: true,
              message: '角色名不能为空',
            },
          ],
        })(<Input placeholder="请输入角色名" />)}
      </FormItem>
    </Form>
  );
});
const renderTreeNodes = data =>
  data.map(item => {
    if (item.resBackAuthorityVos) {
      return (
        <TreeNode title={item.name} key={item.authorityId} dataRef={item}>
          {renderTreeNodes(item.resBackAuthorityVos)}
        </TreeNode>
      );
    }
    return <TreeNode title={item.name} key={item.authorityId} dataRef={item} />;
  });
const TreeBox = props => {
  const { authList, authCheck, checkedKeys } = props;
  return (
    <Tree showLine checkable defaultExpandAll checkedKeys={checkedKeys} onCheck={authCheck}>
      {renderTreeNodes(authList)}
    </Tree>
  );
};

@connect(({ authRole }) => ({
  authRole,
}))
export default class Role extends PureComponent {
  state = {
    visible: false,
    create: true,
    pagination: {
      pageNum: '1',
      pageSize: '10',
    },
    searchCon: '', //搜索内容
    isEnabled: '1', // 0禁用，1启用,
    checkedKeys: [], //选中权限
    roleBasicInfo: {},
  };
  componentDidMount() {
    this.fetchRoleAll();
    this.fetchAuthAll();
  }
  fetchRoleAll = () => {
    const { pagination, searchCon } = this.state;
    this.props.dispatch({
      type: 'authRole/fetchRoleAll',
      payload: {
        ...pagination,
        param: {
          name: searchCon,
        },
      },
    });
  };
  fetchAuthAll = () => {
    this.props.dispatch({
      type: 'authRole/fetchAuthAll',
      payload: {},
    });
  };
  handleEdit = record => {
    const { resBackRoleAuthorityVoSet = [] } = record;
    const checked = resBackRoleAuthorityVoSet.map(item => {
      return item.authorityId;
    });
    this.setState({
      create: false,
      visible: true,
      roleBasicInfo: record,
      checkedKeys: checked,
    });
  };

  handleRemove = record => {
    this.props.dispatch({
      type: 'authRole/deleteRole',
      payload: {
        roleId: record.roleId,
      },
      callback: res => {
        if (res.success) {
          this.fetchRoleAll();
        } else {
          message.error(res.subMsg);
        }
      },
    });
  };

  handleCreate = () => {
    this.setState({
      create: true,
      visible: true,
      roleBasicInfo: {},
      checkedKeys: [],
    });
  };

  handleSearch = text => {
    this.setState(
      {
        searchCon: text,
      },
      () => {
        this.fetchRoleAll();
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
        this.fetchRoleAll();
      },
    );
  };
  handleOk = () => {
    const { checkedKeys, create } = this.state;
    this.roleForm.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: `authRole/${create ? 'addRole' : 'updateRole'}`,
          payload: {
            ...values,
            authorityIds: checkedKeys,
          },
          callback: res => {
            if (res.success) {
              this.fetchRoleAll();
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
  authCheck = (checkedKeys, info) => {
    this.setState({
      checkedKeys: checkedKeys,
    });
  };
  enableChange = (checked, record) => {
    if (checked) {
      record.isEnabled = 1;
    } else {
      record.isEnabled = 0;
    }
    record.authorityIds = record.resBackRoleAuthorityVoSet.map(item => {
      return item.authorityId;
    });
    delete record.resBackRoleAuthorityVoSet;
    delete record.enabled;
    this.props.dispatch({
      type: 'authRole/enabledRole',
      payload: record,
      callback: res => {
        if (res.success) {
          this.fetchRoleAll();
        } else {
          message.error(res.subMsg);
        }
      },
    });
  };
  render() {
    const { create, roleBasicInfo, checkedKeys } = this.state;
    const { roleList, authList } = this.props.authRole;
    const columns = [
      { title: '角色名', dataIndex: 'name' },
      {
        title: '拥有权限',
        dataIndex: 'resBackRoleAuthorityVoSet',
        render: record => (
          <span>
            {record.map(item => (
              <Tag color="blue" key={item.authorityId}>
                {item.name}
              </Tag>
            ))}
          </span>
        ),
      },
      {
        title: '启/停用',
        dataIndex: 'enabled',
        render: (text, record) => (
          <Switch
            checkedChildren="启"
            unCheckedChildren="停"
            checked={text}
            onChange={checked => {
              this.enableChange(checked, record);
            }}
          />
        ),
      },
    ];
    const top = {
      search: {
        // content: <SearchCon />,
        placeholder: '角色名',
        onClick: text => {
          this.handleSearch(text);
        },
      },
      create: {
        text: '添加角色',
        name: 'create',
        onClick: () => {
          this.handleCreate();
        },
      },
    };
    const rowButtons = [
      {
        text: '编辑权限',
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
      <div className={styles.roleBox}>
        <PageHeaderWrapper
          content={
            <MqTable
              columns={columns}
              rowButtons={rowButtons}
              list={roleList}
              onLoad={this.onLoad}
              top={top}
            />
          }
        />
        <Modal
          title={create ? '创建角色' : '修改角色'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <div>
            <RoleBasicInfoForm
              roleBasicInfo={roleBasicInfo}
              ref={el => {
                this.roleForm = el;
              }}
            />
            <TreeBox authList={authList} authCheck={this.authCheck} checkedKeys={checkedKeys} />
          </div>
        </Modal>
      </div>
    );
  }
}
