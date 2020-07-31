import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Input } from 'antd';
import SortView from './component/Sort';
import TableView from './component/Table';
import styles from './index.less';
/**
 * 页面：商家订单
 * @author：zhaoyijn
 */
const { Search } = Input;

export default class ShopOrder extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        content={
          <div className={styles.content}>
            <div className={styles.top}>
              {/* 搜索插件 */}
              {/* <div className={styles.searchView}>
                        <Search
                            placeholder="请输入搜索内容"
                            onSearch={value => console.log(value)}
                            enterButton
                        />
                    </div> */}
              {/* 排序插件 */}
              <div className={styles.sortView}>
                <SortView SellerId={this.props.location.query.sellerId} />
              </div>
            </div>
            {/* 表格插件 */}
            <div className={styles.tableView}>
              <TableView SellerId={this.props.location.query.sellerId} />
            </div>
          </div>
        }
      />
    );
  }
}
