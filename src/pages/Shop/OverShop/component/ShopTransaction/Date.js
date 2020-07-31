import React, { PureComponent } from 'react';
import { Button, Input, DatePicker } from 'antd';
import styles from './Date.less';

const { Search } = Input;

/**
 * 模块：交易中心
 * 页面：交易中心
 * 组件：上半部分组件包含：时间、订单号、导出账单
 */
const { RangePicker } = DatePicker;
function onChange(date, dateString) {
  console.log(date, dateString);
}
export default class DateView extends PureComponent {
  render() {
    return (
      <div>
        <div className={styles.top}>
          {/* 时间 */}
          <div className={styles.date}>
            <RangePicker style={{ width: 330, marginTop: 10 }} onChange={onChange} />
          </div>
          {/* 搜索订单 */}
          <div className={styles.input}>
            {' '}
            {/* 搜索组件 */}
            <Search
              placeholder="订单号"
              onSearch={value => console.log(value)}
              className={styles.search}
              enterButton
            />
          </div>

          <div className={styles.button}>
            <Button>导出对账单</Button>
          </div>
        </div>
      </div>
    );
  }
}
