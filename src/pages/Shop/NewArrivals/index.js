import React, { Component } from 'react';
import { Icon, Button, Input, DatePicker, Form, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
// 左侧卡片
import NewCardView from './component/NewCard';
// 页码组件
// import PaginationView from '@/utils/pagination';
import { Pagination } from 'antd';
import styles from './index.less';

/**
 * 模块：商户中心
 * 页面：新申请入驻
 * @author：zhaoyijn songshuyu
 */
const { RangePicker } = DatePicker;
@connect(({ newArrivals }) => ({
  newArrivals,
  total: newArrivals.total
  // userId: newArrivals.userId, // 用户id
}))
@Form.create()
class NewArrivals extends Component {
  state = {
    pageNum: 1,
  };
  componentDidMount() {
    this.getApplying();
  }
  /**
   *  筛选提交
   */
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      const data = values;
      let beginTime = '';
      let endTime = '';
      let { name } = data;
      if (data.time) {
        (beginTime = data.time[0]), (endTime = data.time[1]);
      }
      if (!data.name) {
        name = '';
      }
      if (!err) {
        dispatch({
          type: 'newArrivals/getApplying',
          payload: {
            pageNum: 1,
            pageSize: 4,
            param: {
              status: '',
              name,
              beginTime,
              endTime,
            },
          },
        });
      } else {
        message.warning('请输入相关信息');
      }
    });
  };
  // 请求数据
  getApplying = () => {
    const { dispatch, pageSize, type, status } = this.props;
    const { pageNum } = this.state;
    dispatch({
      type: 'newArrivals/getApplying',
      payload: {
        pageNum: pageNum,
        pageSize: 4,
        param: {
          status,
          name: '',
        },
      },
    });
  };

  onChange = pageNumber => {
    this.setState(
      {
        pageNum: pageNumber,
      },
      res => {
        this.getApplying();
      },
    );
  };

  render() {
    const {
      form: { getFieldDecorator },
      total,
    } = this.props;
    const { pageSize, status } = this.state;
    return (
      <PageHeaderWrapper
        content={
          <div className={styles.content}> 
            {/* 左侧内容 */}
            <div className={styles.left}>
              <div className={styles.nav}>
                {/* 地区选框插件 */}
                {/* <div className={styles.areaView}>
                            <AreaView />
                        </div> */}
                {/* 排序插件 */}
                {/* <div className={styles.sorttimeView}>
                                <SorttimeView />
                            </div> */}
              </div>
              {/* 商家卡片 */}
              <div className={styles.shopCardView}>
                <NewCardView />
              </div>
              {/* 页码 */}
              <div className={styles.paginationView}>
                <Pagination
                  showQuickJumper
                  defaultPageSize={4}
                  total={total}
                  onChange={this.onChange}
                />
              </div>
            </div>
            {/* 右侧筛选 */}
            <div className={styles.right}>
              {/* 标题筛选 */}
              <Form onSubmit={this.handleSubmit}>
                <div className={styles.title}>
                  <div className={styles.icon}>
                    <Icon type="form" />
                  </div>
                  <span>筛选</span>
                </div>
                {/* 搜索插件 */}
                <div className={styles.searchView}>
                  <Form.Item>
                    {getFieldDecorator('name', {
                      rules: [{ required: false }],
                    })(<Input autoComplete="off" placeholder="请输入店铺名称" />)}
                  </Form.Item>
                </div>
                {/* 申请时间 */}
                <div className={styles.date}>
                  <span className={styles.title}>申请时间</span>
                  <div>
                    {/* <DateView /> */}
                    <Form.Item>
                      {getFieldDecorator('time', {
                        rules: [{ required: false }],
                      })(<RangePicker style={{ width: 330 }} onChange={this.onChange} />)}
                    </Form.Item>
                  </div>
                </div>
                {/* 申请时间 */}
                {/* <div className={styles.date}>
                            <span className={styles.title}>状态</span>
                            <div>
                                <RadioView />
                            </div>
                        </div> */}
                {/* 确认按钮 */}
                <div>
                  <Button htmlType="submit" className={styles.button} type="primary">
                    确认
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        }
      />
    );
  }
}
export default NewArrivals;
