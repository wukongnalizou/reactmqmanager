import React, { PureComponent, Fragment } from 'react';
import { Table, Divider, Popconfirm, Input, Button } from 'antd';
import styles from './index.less';

export default class MqTable extends PureComponent {
  state = {
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      pageSizeOptions: ['10', '20', '50', '100'],
      showQuickJumper: true,
      showSizeChanger: true,
    },
    searchValue: '',
  };

  createRowButtons = (columns, rowButtons) => {
    const cols = [...columns];
    if (rowButtons.length) {
      cols.push({
        title: '操作',
        render: (text, record) => {
          const actions = [];
          const renderButtons = item => {
            actions.push(
              <Fragment key={item.name}>
                {item.confirm ? (
                  <Popconfirm title={item.confirm} onConfirm={() => item.onClick(record)}>
                    {item.content ? item.content : <a>{item.text}</a>}
                  </Popconfirm>
                ) : (
                  <span>
                    {item.content ? (
                      <span onClick={() => item.onClick(record)}>{item.content}</span>
                    ) : (
                      <a onClick={() => item.onClick(record)}>{item.text}</a>
                    )}
                  </span>
                )}
              </Fragment>,
            );
            actions.push(<Divider key={`divider-${item.name}`} type="vertical" />);
          };
          rowButtons.forEach(item => {
            renderButtons(item);
          });
          actions.pop();
          return actions;
        },
      });
    }
    return cols;
  };

  createTopButtons = item => {
    let btn;
    if (item) {
      btn = (
        <div className={styles.create}>
          <Button
            type="primary"
            onClick={() => {
              item.onClick();
            }}
          >
            {item.text}
          </Button>
        </div>
      );
    } else {
      btn = null;
    }
    return btn;
  };

  createSearch = item => {
    const { searchValue } = this.state;
    let search;
    if (item) {
      if (item.content) {
        search = <div className={styles.searchBox}>{item.content}</div>;
      } else {
        search = (
          <div className={styles.searchBox}>
            <div className={styles.searchCon}>
              <Input
                placeholder={item.placeholder}
                value={searchValue}
                onChange={this.searchChange}
              />
            </div>
            <div className={styles.button}>
              <Button
                type="primary"
                onClick={() => {
                  item.onClick(searchValue);
                }}
              >
                查询
              </Button>
            </div>
          </div>
        );
      }
    } else {
      search = <div className={styles.searchBox} />;
    }
    return search;
  };

  searchChange = e => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  onChange = pagination => {
    const { onLoad } = this.props;
    // if (!pagination.current) {
    //   pagination.current = pagination.pageNo;
    // }
    this.setState(
      {
        pagination,
      },
      () => {
        onLoad({
          pagination: {
            pageNum: pagination.current || pagination.pageNum,
            pageSize: pagination.pageSize,
          },
        });
      },
    );
  };

  render() {
    const { list, columns = [], loading, rowButtons = [], top, ...otherProps } = this.props;
    const { pagination } = this.state;
    const cols = this.createRowButtons(columns, rowButtons);
    const { search, create } = top;
    const createBtn = this.createTopButtons(create);
    const searchBox = this.createSearch(search);
    return (
      <div className={styles.MqTable}>
        <div className={styles.top}>
          {searchBox}
          {createBtn}
        </div>
        <Table
          className={styles.table}
          dataSource={list}
          columns={cols}
          loading={loading}
          pagination={{
            ...pagination,
          }}
          onChange={this.onChange}
          {...otherProps}
        />
      </div>
    );
  }
}
