import React, { PureComponent } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Divider, Tag } from 'antd';
import styles from './index.less';
/**
 * 模块：运营中心
 * 页面：数据统计-收益图表
 * @author:lisimeng
 */

// 曲线图数据
const data = [
  {
    day: '03/01',
    保证金: 3433,
    小费: 4503,
    实际消费: 7736,
    支出: 7562,
    利润: 3235,
  },
  {
    day: '03/02',
    保证金: 4321,
    小费: 4442,
    实际消费: 7365,
    支出: 4366,
    利润: 3254,
  },
  {
    day: '03/03',
    保证金: 542,
    小费: 1245,
    实际消费: 2562,
    支出: 6543,
    利润: 2544,
  },
  {
    day: '03/04',
    保证金: 1424,
    小费: 7896,
    实际消费: 6783,
    支出: 5657,
    利润: 3535,
  },
  {
    day: '03/05',
    保证金: 2543,
    小费: 3986,
    实际消费: 7849,
    支出: 5677,
    利润: 6766,
  },
  {
    day: '03/06',
    保证金: 1242,
    小费: 5432,
    实际消费: 9425,
    支出: 6768,
    利润: 6768,
  },
  {
    day: '03/07',
    保证金: 4313,
    小费: 3242,
    实际消费: 9732,
    支出: 2344,
    利润: 3453,
  },
  {
    day: '03/08',
    保证金: 1242,
    小费: 3451,
    实际消费: 4366,
    支出: 3243,
    利润: 3465,
  },
  {
    day: '03/09',
    保证金: 1253,
    小费: 7895,
    实际消费: 5461,
    支出: 2656,
    利润: 5626,
  },
  {
    day: '03/10',
    保证金: 5421,
    小费: 12433,
    实际消费: 7736,
    支出: 7663,
    利润: 2356,
  },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['保证金', '小费', '实际消费', '支出', '利润'],
  // 展开字段集
  key: 'custom',
  // key字段
  value: 'number', // value字段
});
console.log(dv);
const cols = {
  day: {
    range: [0, 1],
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
    title: '保证金',
    dataIndex: 'initiate',
    key: 'initiate',
  },
  {
    title: '小费',
    dataIndex: 'tip',
    key: 'tip',
  },
  {
    title: '实际消费',
    key: 'actual',
    dataIndex: 'actual',
  },
  {
    title: '支出',
    key: 'expenditure',
    dataIndex: 'expenditure',
  },
  {
    title: '利润',
    key: 'income',
    dataIndex: 'income',
  },
];
const table = [
  {
    key: '1',
    date: '2019/03/18',
    initiate: 322435,
    tip: 345143,
    actual: 342546,
    expenditure: 24621166,
    income: 5626545,
  },
  {
    key: '2',
    date: '2019/03/18',
    initiate: 322435,
    tip: 345143,
    actual: 5626545,
    expenditure: 5624265,
    income: 1436245,
  },
  {
    key: '3',
    date: '2019/03/18',
    initiate: 322435,
    tip: 345143,
    actual: 5626545,
    expenditure: 432645,
    income: 1456557,
  },
];
export default class ChartIncome extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        content={
          <div>
            <div className={styles.chart}>
              <Chart height={400} data={dv} scale={cols} forceFit>
                <Legend />
                <Axis name="day" />
                <Axis
                  name="number"
                  label={{
                    formatter: val => `${val}`,
                  }}
                />
                <Tooltip
                  crosshairs={{
                    type: 'y',
                  }}
                />
                <Geom type="line" position="day*number" size={2} color="custom" />
                <Geom
                  type="point"
                  position="day*number"
                  size={4}
                  shape="circle"
                  color="custom"
                  style={{
                    stroke: '#fff',
                    lineWidth: 1,
                  }}
                />
              </Chart>
            </div>
            <Table columns={columns} dataSource={table} className={styles.table} />
          </div>
        }
      />
    );
  }
}
