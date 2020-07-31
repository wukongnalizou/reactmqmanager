import React, { PureComponent } from 'react';
import TransactionView from './component/Transaction';
/**
 * 页面：交易中心
 * @author：zhaoyijn
 */
export default class Transaction extends PureComponent {
  render() {
    return (
      <div>
        {/* 交易中心 */}
        <TransactionView />
      </div>
    );
  }
}
