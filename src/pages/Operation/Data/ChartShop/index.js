import React, { PureComponent } from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DataSet from '@antv/data-set';
import { Table, Divider, Tag } from 'antd';
import styles from './index.less';
/**
 * 模块：运营中心
 * 页面：数据统计-商家数量图表
 * @author:lisimeng
 */

// 曲线图数据
const data = [
  {
    day: '03/01',
    number: 38,
  },
  {
    day: '03/02',
    number: 52,
  },
  {
    day: '03/03',
    number: 61,
  },
  {
    day: '03/04',
    number: 145,
  },
  {
    day: '03/05',
    number: 48,
  },
  {
    day: '03/06',
    number: 38,
  },
  {
    day: '03/07',
    number: 38,
  },
  {
    day: '03/08',
    number: 38,
  },
  {
    day: '03/09',
    number: 38,
  },
  {
    day: '03/10',
    number: 38,
  },
];
const cols = {
  number: {
    tickInterval: 20,
  },
};
// 表格数据
const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '入驻商家数量',
    dataIndex: 'new',
    key: 'new',
  },
  {
    title: '入驻商家总数',
    dataIndex: 'all',
    key: 'all',
  },
];
const table = [
  {
    key: '1',
    date: '2019/03/18',
    new: 322435,
    all: 61236215,
  },
  {
    key: '2',
    date: '2019/03/18',
    new: 322435,
    all: 61236215,
  },
  {
    key: '3',
    date: '2019/03/18',
    new: 322435,
    all: 61236215,
  },
];
export default class ChartShop extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        content={
          <div>
            <div className={styles.chart}>
              <Chart height={400} data={data} scale={cols} forceFit>
                <Axis name="day" />
                <Axis name="number" />
                <Tooltip
                  crosshairs={{
                    type: 'y',
                  }}
                />
                <Geom type="interval" position="day*number" />
              </Chart>
            </div>
            <Table columns={columns} dataSource={table} className={styles.table} />
          </div>
        }
      />
    );
  }
}
