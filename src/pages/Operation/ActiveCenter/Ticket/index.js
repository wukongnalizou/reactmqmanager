import React, { Component } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import AddTicketView from './component/AddTicket';

/**
 * 模块：运营中心
 * 页面：活动中心-兑换券充值
 * @author:lisimeng
 * modifyDate: 2019-08-02
 * author:Cin
 */

@connect(({ ticket }) => ({
  productList: ticket.productList, // 活动商品订单列表
  listTotal: ticket.listTotal, // 列表总量
}))
export default class Ticket extends Component {
  state = {
    dateTime: new Date().getTime(),
    columns: [
      {
        title: '商品名称',
        dataIndex: 'productName',
        key: 'productName',
      },
      {
        title: '商品个数',
        dataIndex: 'productNumber',
        key: 'productNumber',
      },
      {
        title: '商品价格(蘑菇)',
        dataIndex: 'currencyPrice',
        key: 'currencyPrice',
      },
      {
        title: '修改',
        dataIndex: 'reset',
        key: 'reset',
        render: (e, reset) => {
          // return <Button type="primary" onClick={(e) => {this.updateClick(e, reset.id)}}>修改</Button>
          return (
            <AddTicketView
              addSuccess={() => {
                this.addSuccess();
              }}
              type="reset"
              name="修改"
              id={reset.id}
              onClick={e => {
                this.updateClick(e, reset.id);
              }}
            />
          );
        },
      },
      {
        title: '删除',
        dataIndex: 'delete',
        key: 'delete',
        render: (e, dele) => {
          return (
            <Popconfirm
              title="确定执行此操作吗?"
              onConfirm={e => {
                this.deleteClick(e, dele.id);
              }}
              okText="是"
              cancelText="否"
            >
              <Button type="primary">
                删除
              </Button>
            </Popconfirm>
          );
        },
      },
    ],
  };

  componentDidMount() {
    this.getProductList(1);
  }

  // 获取下一页
  nextPageClick(e) {
    this.getProductList(e);
  }

  // 获取商品列表
  getProductList(pageNum) {
    const { dispatch } = this.props;
    dispatch({
      type: 'ticket/fetchfindProductListForBack',
      payload: {
        dateTime: this.state.dateTime,
        pageNum,
        pageSize: 10,
        param: {
          isEnabled: true,
          productCode: 'MOOMKINGPLAN_CERTIFICATE',
          productName: '',
          productType: 0,
        },
      },
    });
  }

  // 修改商品
  updateClick(e, id) {
    // console.log('修改',e, id);
    // this.setState({
    //     id: id
    // })
    const { dispatch } = this.props;
    dispatch({
      type: 'ticket/setResetId',
      payload: {
        resetId: id,
      },
    });
  }

  // 删除商品
  deleteClick(e, id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'ticket/fetchDeleteProduct',
      payload: {
        id: id,
      },
    }).then(() => {
      this.getProductList(1);
    });
  }

  // 添加商品成功
  addSuccess() {
    this.getProductList(1);
  }

  render() {
    const { productList, listTotal } = this.props;
    return (
      <PageHeaderWrapper
        content={
          <div>
            <div>
              <AddTicketView
                addSuccess={() => {
                  this.addSuccess();
                }}
                type="add"
                name="增加"
              />
            </div>
            {/* 表格 */}
            <div>
              <Table
                dataSource={productList}
                columns={this.state.columns}
                pagination={{
                  defaultPageSize: 10,
                  disabled: false,
                  total: listTotal,
                  onChange: e => {
                    this.nextPageClick(e);
                  },
                }}
              />
            </div>
          </div>
        }
      />
    );
  }
}
