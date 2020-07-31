import React, { Component } from 'react';
import { Table, Button } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
/**
 * 模块：运营中心
 * 页面：魔咕计划
 * 组件：表格
 * modifyDate: 2019-07-12
 * author:Cin
 */
@connect(({ mogu }) => ({
  productList: mogu.productList, // 活动商品列表
  productListTotal: mogu.productListTotal, // total
}))
class MogutableView extends Component {
  state = {
    dateTime: new Date().getTime(),
    // 表格列
    columns : [
      {
        title: '商品图片',
        dataIndex: 'listImgUrl',
        key: 'listImgUrl',
        render: (value) => {
          return (<img src={value} style={{ width: 86.4, height: 96 }} />)
        }
      }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '库存',
        dataIndex: 'inventory',
        key: 'inventory',
      }, {
        title: '商品价值',
        dataIndex: 'cost',
        key: 'cost',
      }, {
        title: '所需兑换券',
        dataIndex: 'exchangeCertificatePrice',
        key: 'exchangeCertificatePrice',
      }, {
        title: '每期出奖率',
        dataIndex: 'probability',
        key: 'probability',
      }, {
        title: '每期出奖量',
        dataIndex: 'eachExtractNum',
        key: 'eachExtractNum',
      }, {
        title: '商品描述',
        dataIndex: 'describe',
        key: 'describe',
      }, {
        title: '详情',
        dataIndex: 'record',
        key: 'record',
        render: (e, e2) => {
          return (
            <Link to={`/operation/activeCenter/mogu/detail?id=${e2.id}`}><Button type="primary">详情</Button></Link>
          )
        }
      }, {
        title: '修改',
        dataIndex: 'modify',
        key: 'modify',
        render: (e, e2) => {
          return (
            <Link to={`/operation/activeCenter/mogu/detail?id=${e2.id}&isReset=true`}><Button type="primary">修改</Button></Link>
            // <Button type="primary" onClick={(e) => {this.resetGoodsClick(e, e2.id)}}>修改</Button>
          )
        }
      }, {
        title: '下架',
        dataIndex: 'lowershelf',
        key: 'lowershelf',
        render: (e, e2) => {
          return (
            <Button type={e2.isEnabled ? "primary" : ''} onClick={(e) => {this.gooutClick(e, e2.id, e2.isEnabled)}}>{e2.isEnabled ? '下架' : '已下架'}</Button>
          )
        }
      }, {
        title: '删除',
        dataIndex: 'delete',
        key: 'delete',
        render: (e, e2) => {
          return (
            <Button type="primary" onClick={(e) => {this.deleteGoodsClick(e, e2.id)}}>删除</Button>
          )
        }
      },
    ]
  }

  /**
   * 获取商品列表
   */
  getProductList(pageNum, id, name) {
    const { dispatch, productList } = this.props;
    this.state.dateTime = productList[productList.length - 1] ? productList[productList.length - 1].createTime : this.state.createTime;
    dispatch({
      type: 'mogu/fetchFindActivitiesProductList',
      payload: {
        dateTime: new Date().getTime(),
        pageNum: pageNum,
        pageSize: 4,
        param: {
          grade: this.props.grade
        }
      }
    })
  }

  /**
   * 获取下一页信息
   */
  nextPageClick(e) {
    this.getProductList(e);
  }

  /**
   * 修改信息
   */
  resetGoodsClick(e, id) {
    // console.log('修改', id);
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'mogu/setResetGoodsId',
    //   payload: {
    //     resetGoodsId: id
    //   }
    // })
    // dispatch({
    //   type: 'mogu/fetchUpdateExchangeProductOrderForBack',
    //   payload: {
    //     id: id,
    //     isDelete: 1
    //   }
    // })
  }

  /**
   * 商品下架
   */
  gooutClick(e, id, isEnabled) {
    if(isEnabled) {
      const { dispatch } = this.props;
      dispatch({
        type: 'mogu/fetchUpdateOrDeleteActivitiesProduct',
        payload: {
          id: id,
          isEnabled: 0
        }
      }).then(() => {
        setTimeout(() => {
          dispatch({
            type: 'mogu/fetchFindActivitiesProductList',
            payload: {
                dateTime: new Date().getTime(),
                pageNum: '1',
                pageSize: 10,
                param: {
                    grade: this.props.grade
                }
            }
          })
        }, 500)
      })
    }
  }

  /**
   * 删除信息
   */
  deleteGoodsClick(e, id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'mogu/fetchUpdateOrDeleteActivitiesProduct',
      payload: {
        id: id,
        isDelete: 1
      }
    }).then(() => {
      setTimeout(() => {
        dispatch({
          type: 'mogu/fetchFindActivitiesProductList',
          payload: {
              dateTime: new Date().getTime(),
              pageNum: '1',
              pageSize: 10,
              param: {
                  grade: this.props.grade
              }
          }
        })
      }, 500)
    })
  }

  render() {
    const { productList, productListTotal } = this.props;
    return (
      <div>
        <Table
          columns={this.state.columns}
          dataSource={productList}
          pagination={{
            defaultPageSize: 4,
            disabled: false,
            total: productListTotal,
            onChange: (e) => { this.nextPageClick(e) }
          }}
        />
      </div>
    )
  }
}
export default MogutableView;