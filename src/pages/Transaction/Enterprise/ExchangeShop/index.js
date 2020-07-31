import React, { PureComponent } from 'react';
import { Divider, Radio, Input, Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';
/**
 * 模块：交易中心
 * 页面：商家提现审核
 * @author:lisimeng
 */

// 备注输入框
const { TextArea } = Input;
export default class ExchangeShop extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        content={
          <div className={styles.content}>
            <div className={styles.activityDetails}>
              <div className={styles.title}>提现信息</div>
              <div className={styles.text}>
                <div className={styles.line}>
                  <p>
                    提现单号：
                    <span>28554185562</span>
                  </p>
                  <p>
                    提现金额：
                    <span className={styles.money}>￥85.00</span>
                  </p>
                  <p>
                    提交时间：
                    <span>2019/05/20 11:51</span>
                  </p>
                </div>
                <div className={styles.line}>
                  <p>
                    商家名：
                    <span>陈火锅（沈阳天地店）</span>
                  </p>
                  <p>
                    商户银行账户:
                    <span>中国建设银行</span>
                  </p>
                </div>
                <div className={styles.line}>
                  <p>
                    负责人手机号：
                    <span>15600005555</span>
                  </p>
                  <p>
                    银行卡号：
                    <span>63130707002330258</span>
                  </p>
                </div>
              </div>
            </div>
            <Divider />
            <div className={styles.activityDetails}>
              <div className={styles.title}>商户资产</div>
              <div className={styles.text}>
                <div className={styles.line}>
                  <p>
                    商户账户总额（提现前）：
                    <span>13400</span>
                    <Button className={styles.ice}>冻结</Button>
                  </p>
                  <p>
                    总完成提现金额：
                    <span className={styles.money}>￥300</span>
                  </p>
                </div>
                <div className={styles.line}>
                  <p>
                    商户账户总额（提现后）：
                    <span>3400</span>
                  </p>
                </div>
              </div>
            </div>
            <Divider />
            <div className={styles.activityDetails}>
              <div className={styles.title}>审核</div>
              <div className={styles.text}>
                <div className={styles.line}>
                  <p>
                    是否通过：
                    <Radio.Group defaultValue="a" buttonStyle="solid" className={styles.radio}>
                      <Radio.Button value="a">通过</Radio.Button>
                      <Radio.Button value="b">不通过</Radio.Button>
                    </Radio.Group>
                  </p>
                  <p className={styles.note}>
                    备注：
                    <TextArea
                      placeholder="请输入备注"
                      autosize={{ minRows: 2, maxRows: 6 }}
                      className={styles.textarea}
                    />
                  </p>
                </div>
              </div>
            </div>
            <Divider />
            <Button className={styles.button} type="primary">
              确认
            </Button>
          </div>
        }
      />
    );
  }
}
