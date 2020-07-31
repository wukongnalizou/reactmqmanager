import React, { PureComponent } from 'react';
import {
  DatePicker,
  Button,
  Pagination,
  LocaleProvider,
  Statistic,
  Card,
  Col,
  Row,
  Icon,
} from 'antd';
import Link from 'umi/link';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// 中文转换
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import styles from './index.less';
/**
 * 模块：运营中心
 * 页面：数据统计
 * @author:lisimeng
 */

// 时间设置
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
// 中文转换
const App = () => (
  <div>
    <Pagination defaultCurrent={1} total={50} showSizeChanger />
  </div>
);
export default class Data extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        content={
          <div>
            <LocaleProvider locale={zhCN}>
              <div>
                {/* 顶部日期 */}
                <div className={styles.top}>
                  <span className={styles.font}>按日统计：</span>
                  <DatePicker
                    defaultValue={moment('2015/01/01', dateFormat)}
                    format={dateFormat}
                    className={styles.date}
                  />
                  <br />
                  <span className={styles.font}>按月统计：</span>
                  <MonthPicker
                    defaultValue={moment('2015/01', monthFormat)}
                    format={monthFormat}
                    className={styles.date}
                  />
                  <Button type="primary" className={styles.button}>
                    确认
                  </Button>
                </div>
                {/* 卡片内容 */}
                <div className={styles.card}>
                  <Row gutter={16} className={styles.row}>
                    <Col span={8}>
                      <Link to="/operation/data/chartCustom">
                        <Card title="平台用户总量" bordered={false}>
                          <Statistic value={5532453543} />
                        </Card>
                      </Link>
                    </Col>
                    <Col span={8}>
                      <Link to="/operation/data/chartShop">
                        <Card title="入驻商家数量" bordered={false}>
                          <Statistic value={2425424} />
                        </Card>
                      </Link>
                    </Col>
                    <Col span={8}>
                      <Link to="/operation/data/chartPerson">
                        <Card title="总人数" bordered={false}>
                          <Statistic value={265421456351} />
                        </Card>
                      </Link>
                    </Col>
                  </Row>
                  <Row gutter={16} className={styles.row}>
                    <Col span={8}>
                      <Link to="/operation/data/chartActive">
                        <Card title="活动发起数量" bordered={false}>
                          <Statistic value={24654526} />
                        </Card>
                      </Link>
                    </Col>
                    <Col span={8}>
                      <Link to="/operation/data/chartIncome">
                        <Card title="收益总金额" bordered={false}>
                          <Statistic value={26456556224} />
                        </Card>
                      </Link>
                    </Col>
                    <Col span={8}>
                      <Link to="/operation/data/chartIncome">
                        <Card title="支出总金额" bordered={false}>
                          <Statistic value={256264262} />
                        </Card>
                      </Link>
                    </Col>
                  </Row>
                  <Row gutter={16} className={styles.row}>
                    <Col span={8}>
                      <Link to="/operation/data/chartIncome">
                        <Card title="净利润" bordered={false}>
                          <Statistic value={112893} />
                        </Card>
                      </Link>
                    </Col>
                    <Col span={8}>
                      <Card title="同比增长率" bordered={false}>
                        <Statistic
                          value={11.28}
                          precision={2}
                          valueStyle={{ color: '#3f8600' }}
                          prefix={<Icon type="arrow-up" />}
                          suffix="%"
                        />
                      </Card>
                    </Col>
                  </Row>
                </div>
              </div>
            </LocaleProvider>
          </div>
        }
      />
    );
  }
}
