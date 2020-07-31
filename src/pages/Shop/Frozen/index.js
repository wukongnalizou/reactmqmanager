import React, { Component } from 'react';
import { Button, Input, Icon, Form } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './index.less';
// 下拉地址组件
// import AreaView from '../../components/shop/OverShop/area/Area';
// 页码组件
// import PaginationView from '@/utils/pagination';
import { Pagination } from 'antd';
// 筛选-评分多选组件
// import CheckboxNumberView from '../../components/shop/OverShop/checkboxNumber/CheckboxNumber';
// // 筛选-历史单量
// import InputHistoryView from '../../components/shop/OverShop/inputHistory/InputHistory';
// // 筛选-今日单量
// import InputTodayView from '../../components/shop/OverShop/inputToday/InputToday';
// // 筛选-人均消费
// import InputConsumptionView from '../../components/shop/OverShop/inputConsumption/InputConsumption';
// // 筛选-是否营业单选
// import RadioOpenView from '../../components/shop/OverShop/radioOpen/RadioOpen';
// // 筛选-入住时间
// import DateView from '../../components/shop/OverShop/date/Date';
// 左侧卡片
import FrozencardView from './component/FrozenCard';
// 左侧排序
// import SortfrozenView from '../../components/shop/OverShop/sortFrozen/SortFrozen';
/**
 * 模块：商户中心-冻结中用户
 * 页面：冻结中商户
 * @author：zhaoyijn songshuyu
 */
const { Search } = Input;
@connect(({ frozen }) => ({
  frozen,
  total: frozen.total
}))
@Form.create()
export default class Frozen extends Component {
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
      if (!err) {
        dispatch({
          type: 'frozen/getApplied',
          payload: {
            pageNum: 1,
            pageSize: 4,
            param: {
              status: '6',
              name: data.name,
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
      type: 'frozen/getApplied',
      payload: {
        pageNum: pageNum,
        pageSize: 4,
        param: {
          status: '6',
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
    return (
      <PageHeaderWrapper
        content={
          <div className={styles.content}>
            {/* 左侧内容 */}
            <div className={styles.left}>
              {/* 地区选框插件 */}
              {/* <div className={styles.areaView}>
                        <AreaView />
                    </div> */}
              {/* 排序插件 */}
              {/* <div className={styles.SortView}>
                        <SortfrozenView />
                    </div> */}
              {/* 商家卡片 */}
              <div className={styles.shopCardView}>
                <FrozencardView />
              </div>
              {/* 页码 */}
              <div className={styles.paginationView}>
                {/* <PaginationView PaginationView pageSize={4} status={6} type="frozen/getApplied" /> */}
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
              <Form onSubmit={this.handleSubmit}>
                {/* 标题筛选 */}
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
                {/* 多选框插件 */}
                {/* <div className={styles.checkboxView}>
                        <CheckboxNumberView />
                    </div> */}
                {/* 历史单量 */}
                {/* <div className={styles.input}>
                        <span className={styles.title}>历史单量</span>
                        <div>
                            <InputHistoryView />
                        </div>
                    </div> */}
                {/* 今日单量 */}
                {/* <div className={styles.input}>
                        <span className={styles.title}>今日单量</span>
                        <div>
                            <InputTodayView />
                        </div>
                    </div> */}
                {/* 人均消费 */}
                {/* <div className={styles.input}>
                        <span className={styles.title}>人均消费</span>
                        <div>
                            <InputConsumptionView />
                        </div>
                    </div> */}
                {/* 是否营业 */}
                {/* <div className={styles.input}>
                        <span className={styles.title}>是否营业</span>
                        <div className={styles.checkboxOpen}>
                            <RadioOpenView />
                        </div>
                    </div> */}
                {/* 入驻时间 */}
                {/* <div className={styles.date}>
                        <span className={styles.title}>入驻时间</span>
                        <div>
                            <DateView />
                        </div>
                    </div> */}
                {/* 确认按钮 */}
                <div>
                  <Button className={styles.button} type="primary" htmlType="submit">
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
