import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import iconToday from '@/assets/global/iconToday.png';
import accounting from '@/assets/global/accounting.png';
import iconMoney from '@/assets/global/iconMoney.png';
import iconComplaint from '@/assets/global/iconComplaint.png';
import iconAdvisory from '@/assets/global/iconAdvisory.png';
// 今日活动卡片组件
import ScheduleView from './component/Schedule';
// 投诉用户组件
import ComplaintView from './component/Complaint';
// 投诉组件
import ServiceView from './component/Service';
// 服务咨询组件
import ApplytView from './component/Apply';
import styles from './index.less';
/**
 * 页面：首页
 * 组件：今日活动卡片、投诉用户、回复评价
 * @author：zhaoyijn
 */
const servicedate = [
  {
    title: '藏爱家族',
  },
];
@connect(({ login }) => ({}))
export default class Schedule extends Component {
  // componentDidMount() {
  //     const { dispatch } = this.props;
  //     dispatch({
  //         type: 'login/fetchSellerInfo',
  //         payload: {}
  //     })
  // }
  render() {
    return (
      <PageHeaderWrapper
        content={
          <div className={styles.content}>
            <div className={styles.contentleft}>
              {/* 今日活动卡片 */}
              <ScheduleView />
              {/* 投诉用户 */}
              <ComplaintView />
            </div>
            <div className={styles.service}>
              <div className={styles.name}>
                <img className={styles.icon} src={iconAdvisory} alt="" />
                <span>待处理客服咨询</span>
                <Link to="/customerService/online">
                  <a href="#" className={styles.more}>
                    查看全部
                  </a>
                </Link>
              </div>
              {/* 投诉用户 */}
              <ServiceView />
              <ServiceView />
              <ServiceView />
            </div>
            <div className={styles.today}>
              <div className={styles.title}>
                <img className={styles.icon} src={iconToday} alt="" />
                <span>待处理账务</span>
              </div>
              <div className={styles.accounting}>
                <img className={styles.accounting_bg} src={accounting} alt="" />
                <div className={styles.test}>
                  <img className={styles.iconMoney} src={iconMoney} alt="" />
                  <h4>今日待处理账务总额：</h4>
                </div>
                <div className={styles.test_money}>
                  <p>200034元</p>
                  <Link to="/transaction">
                    <a href="#" className={styles.handle}>
                      去处理
                    </a>
                  </Link>
                </div>
              </div>
              <div className={styles.apply}>
                <img className={styles.iconComplaint} src={iconComplaint} alt="" />
                <span>待审核商家注册申请</span>
                <Link to="/shop/newArrivals">
                  <a href="#" className={styles.more}>
                    查看全部
                  </a>
                </Link>
              </div>
              {/* 服务咨询 */}
              <div className={styles.business}>
                <div>
                  <ApplytView />
                </div>
              </div>
              <div className={styles.gift}>
                <img className={styles.iconComplaint} src={iconComplaint} alt="" />
                <span>活动商品待发货</span>
                <Link to="/operation/activeCenter/moguRecording">
                  <a href="#" className={styles.search}>
                    查看全部
                  </a>
                </Link>
              </div>
              <div className={styles.activity_gift}>
                <div className={styles.activity}>
                  <div className={styles.activity_name}>
                    <h4>iPhoneXR Max 256G 1部</h4>
                    {/* <span><a href="#" >去发货</a></span> */}
                  </div>
                  <div className={styles.activity_way}>
                    <h4>获取方式：集配件活动兑换</h4>
                  </div>
                </div>
                <div className={styles.activity}>
                  <div className={styles.activity_name}>
                    <h4>iPhoneXR Max 256G 1部</h4>
                    {/* <span><a href="#" >去发货</a></span> */}
                  </div>
                  <div className={styles.activity_way}>
                    <h4>获取方式：集配件活动兑换</h4>
                  </div>
                </div>
                <div className={styles.activity}>
                  <div className={styles.activity_name}>
                    <h4>iPhoneXR Max 256G 1部</h4>
                    {/* <span><a href="#" >去发货</a></span> */}
                  </div>
                  <div className={styles.activity_way}>
                    <h4>获取方式：集配件活动兑换</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    );
  }
}
