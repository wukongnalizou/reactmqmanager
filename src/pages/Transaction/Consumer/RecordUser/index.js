import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import { Input, Table, Button, DatePicker, Radio } from 'antd';
import styles from './index.less';
/**
 * 模块：交易中心
 * 页面：用户兑换记录
 * @author：lisimeng
 * modifyDate:2019-06-10
 * author:Cin
 */
// 日期
const { RangePicker } = DatePicker;
function onChange(date, dateString) {
  console.log(date, dateString);
}
// 表格
const columns = [
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '银行名',
    dataIndex: 'bank',
    key: 'bank',
  },
  {
    title: '银行账号',
    dataIndex: 'card',
    key: 'card',
  },
  {
    title: '提现金额',
    dataIndex: 'money',
    key: 'money',
  },
  {
    title: '提现时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '提现状态',
    dataIndex: 'status',
    key: 'status',
  },
];
// 提现状态
const orderStatus = {
  0: '待审核',
  1: '审核通过',
  2: '驳回',
  3: '提现失败',
  4: '平台三方转账成功',
  5: '到账成功',
};
@connect(({ changeApply, shop }) => ({
  //   userId: shop.userId,
  userId: '',
  doingRecordList: changeApply.doingRecordList,
  doneRecordList: changeApply.doneRecordList,
}))
class RecordUser extends Component {
  state = {
    recordList: [], // 待审核订单记录
    allRecordList: [], // 所有订单记录
    allOrDoing: 0, // 待审核&全部
    current: 1, // 当前页
    dateTime: new Date().getTime(), // 时间戳
    searchTime: [], // 搜索时间
    searchName: '', // 搜索姓名
  };

  componentDidMount() {
    this.getChangeList();
  }

  /**
   * 获取审核列表
   */
  getChangeList(searchName, startTime, endTime) {
    const { dispatch, userId } = this.props;
    // dispatch({
    //     type: 'changeApply/setDoingRecordList',
    //     payload: {
    //         doingRecordList: []
    //     }
    // })
    // 待审核兑换记录
    dispatch({
      type: 'changeApply/fetchFindWithdrawDepositOrderList',
      payload: {
        dateTime: this.state.dateTime,
        pageNum: this.state.current,
        pageSize: 10,
        param: {
          orderStatuses: [0, 1, 2],
          userId: '',
          endTime: endTime,
          realName: searchName,
          startTime: startTime,
        },
      },
    }).then(() => {
      this.setChangeData();
    });
  }

  /**
   * 审核列表数据处理
   */
  setChangeData() {
    this.state.recordList = [];
    this.state.allRecordList = [];
    const { doingRecordList } = this.props;
    for (const index in doingRecordList) {
      const temp = {};
      temp.rowKey = index;
      temp.bank = doingRecordList[index].bankName;
      temp.name = doingRecordList[index].realName;
      temp.card = doingRecordList[index].bankCardNo; // 银行账号
      temp.money = doingRecordList[index].convertibleMoney / 100;
      temp.time = moment(doingRecordList[index].updateTime).format('YYYY-MM-DD hh:mm');
      temp.status = orderStatus[doingRecordList[index].orderStatus];
      temp.id = doingRecordList[index].id;
      if (doingRecordList[index].orderStatus === 0) {
        // 待审核记录
        this.state.recordList.push(temp);
        this.state.allRecordList.push(temp);
      } else {
        this.state.allRecordList.push(temp);
      }
    }
    this.setState({
      recordList: this.state.recordList,
      allRecordList: this.state.allRecordList,
    });
    this.state.dateTime =
      doingRecordList.length !== 0
        ? doingRecordList[doingRecordList.length - 1].createTime
        : this.state.dateTime;
  }

  /**
   * 待审核/全部
   */
  chooseClick(e) {
    if (e.target.value === 'a') {
      // 待审核记录
      this.state.allOrDoing = 0;
    } else {
      // 全部记录
      this.state.allOrDoing = 1;
    }
    this.setState({
      allOrDoing: this.state.allOrDoing,
    });
  }

  /**
   * 分页获取下一页
   */
  getNextPage(e) {
    this.state.current = this.state.current + 1;
    this.getChangeList();
  }

  /**
   * 时间选择
   */
  onChange(e) {
    this.setState({
      searchTime: e,
    });
  }

  /**
   * 姓名搜索兑换记录
   */
  searchNameInput(e) {
    this.state.searchName = e.target.value;
  }

  /**
   * 查找记录
   */
  searchClcik() {
    const startTime =
      this.state.searchTime[0] !== undefined ? moment(this.state.searchTime[0]).valueOf() : '';
    const endTime =
      this.state.searchTime[1] !== undefined ? moment(this.state.searchTime[1]).valueOf() : '';
    console.log(startTime, endTime, this.state.searchName);
    this.getChangeList(this.state.searchName, startTime, endTime);
  }

  render() {
    return (
      <PageHeaderWrapper
        content={
          <div>
            <div className={styles.top}>
              <div className={styles.dateView}>
                <RangePicker
                  style={{ width: 330 }}
                  value={this.state.searchTime}
                  onChange={e => {
                    this.onChange(e);
                  }}
                />
              </div>
              <div className={styles.input}>
                <Input
                  placeholder="用户名"
                  onChange={e => {
                    this.searchNameInput(e);
                  }}
                />
              </div>
              <div className={styles.status}>
                <Radio.Group
                  defaultValue="a"
                  buttonStyle="solid"
                  onChange={e => {
                    this.chooseClick(e);
                  }}
                >
                  <Radio.Button value="a">待审核</Radio.Button>
                  <Radio.Button value="b">全部</Radio.Button>
                </Radio.Group>
              </div>
              <div className={styles.button}>
                <Button
                  onClick={e => {
                    this.searchClcik(e);
                  }}
                >
                  查找
                </Button>
              </div>
            </div>
            <div className={styles.content}>
              {/* 表格插件 */}
              <div className={styles.tableView}>
                <Table
                  columns={columns}
                  dataSource={
                    this.state.allOrDoing === 0 ? this.state.recordList : this.state.allRecordList
                  }
                  rowKey={value => value.id}
                  pagination={{
                    current: this.state.current,
                    pageSize: 10,
                    onChange: e => {
                      this.getNextPage(e);
                    },
                  }}
                  onRow={record => ({
                    onClick: event => {
                      router.push(`/transaction/exchangeUser?id=${record.id}`);
                    },
                  })}
                />
              </div>
            </div>
          </div>
        }
      />
    );
  }
}
export default RecordUser;
