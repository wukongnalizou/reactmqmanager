import React, { Component } from 'react';
import { Card } from 'antd';
import Link from 'umi/link';
import styles from './index.less';
import iconToday from '@/assets/global/iconToday.png';
import todayGroup from '@/assets/global/todayGroup.png';
import todayOrder from '@/assets/global/todayOrder.png';
/**
 * 模块：首页
 * 组件：左侧卡片
 */
export default class ScheduleView extends Component {
  render() {
    return (
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <div className={styles.today}>
            <div className={styles.title}>
              <img className={styles.icon} src={iconToday} alt="" />
              <span>今日情况</span>
            </div>
            <Card
              title="今日成团活动"
              extra={
                <a href="#">
                  <Link to="/activity">查看</Link>
                </a>
              }
              style={{ width: 300 }}
              className={styles.card}
            >
              <div className={styles.group}>
                <img src={todayGroup} alt="" />
                <p className={styles.information}>今日成团：2213场</p>
              </div>
            </Card>
            <Card
              title="今日完成订单"
              extra={
                <a href="#">
                  <Link to="/order">查看</Link>
                </a>
              }
              style={{ width: 300 }}
              className={styles.card}
            >
              <div className={styles.group}>
                <img src={todayOrder} alt="" />
                <p className={styles.information}>今日成单：1571笔</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
