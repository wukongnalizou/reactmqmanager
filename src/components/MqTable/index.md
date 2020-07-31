#### MqTable

| 参数       | 说明          | 类型                 | 默认值 |
| ---------- | ------------- | -------------------- | ------ |
| columns    | 列的配置      | ColumnProps[]        | -      |
| rowButtons | 行操作        | []                   | -      |
| list       | 数据          | []                   | -      |
| top        | 搜索栏和新建  | Object               | -      |
| loading    | 是否加载中    | boolean              | false  |
| otherProps | antd 表格属性 | any                  | -      |
| onLoad     | 表格事件      | function(pagination) | -      |

案例:

```
import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import MqTable from '@/components/MqTable';
import styles from './index.less';

export default class Demo extends PureComponent {
  handleEdit = () => {
    console.log('edit')
  }

  handleRemove = () => {
    console.log('Remove')
  }

  handleCreate = () => {
    console.log('create')
  }

  handleSearch = (text) => {
    console.log(text)
  }

  onLoad = params => {
    console.log(params)
  }

  render() {
    const list = [
      {
        a: '多途径',
        b: '数函数',
        c: '呜啦啦',
        d: '133154615511',
      },
    ];
    const columns = [
      { title: '入院途径', dataIndex: 'a' },
      { title: '多选框', dataIndex: 'b' },
      { title: 'xingming', dataIndex: 'c' },
      { title: '手机号', dataIndex: 'd' },
    ];
    const top = {
      search: {
        // content: <div>111</div>,
        placeholder: '请输入',
        onClick: (text) => {
          this.handleSearch(text);
        },
      },
      create: {
        text: '新建1',
        name: 'create',
        onClick: () => {
          this.handleCreate();
        },
      },
    }
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
      <div>
        <PageHeaderWrapper
          content={<MqTable columns={columns} rowButtons={rowButtons} list={list} onLoad={this.onLoad} top={top} />}
        />
      </div>
    );
  }
}
```
