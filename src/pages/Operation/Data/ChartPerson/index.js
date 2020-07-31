import React, { PureComponent } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DataSet from '@antv/data-set';
import { Table, Divider, Tag } from 'antd';
import styles from './index.less';
/**
 * 模块：运营中心
 * 页面：数据统计-消费者总人数图表
 * @author:lisimeng
 */

// 曲线图数据
const data = [
  {
    day: '03/01',
    缴纳保证金人数: 3433,
    使用小费人数: 4503,
    付款人数: 7736,
  },
  {
    day: '03/02',
    缴纳保证金人数: 4321,
    使用小费人数: 4442,
    付款人数: 7365,
  },
  {
    day: '03/03',
    缴纳保证金人数: 542,
    使用小费人数: 1245,
    付款人数: 2562,
  },
  {
    day: '03/04',
    缴纳保证金人数: 1424,
    使用小费人数: 7896,
    付款人数: 6783,
  },
  {
    day: '03/05',
    缴纳保证金人数: 2543,
    使用小费人数: 3986,
    付款人数: 7849,
  },
  {
    day: '03/06',
    缴纳保证金人数: 1242,
    使用小费人数: 5432,
    付款人数: 9425,
  },
  {
    day: '03/07',
    缴纳保证金人数: 4313,
    使用小费人数: 3242,
    付款人数: 9732,
  },
  {
    day: '03/08',
    缴纳保证金人数: 1242,
    使用小费人数: 3451,
    付款人数: 4366,
  },
  {
    day: '03/09',
    缴纳保证金人数: 1253,
    使用小费人数: 7895,
    付款人数: 5461,
  },
  {
    day: '03/10',
    缴纳保证金人数: 5421,
    使用小费人数: 12433,
    付款人数: 7736,
  },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['缴纳保证金人数', '使用小费人数', '付款人数'],
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
    title: '缴纳保证金人数',
    dataIndex: 'deposit',
    key: 'deposit',
  },
  {
    title: '使用小费人数',
    dataIndex: 'tip',
    key: 'tip',
  },
  {
    title: '付款人数',
    key: 'pay',
    dataIndex: 'pay',
  },
];
const table = [
  {
    key: '1',
    date: '2019/03/18',
    deposit: 322435,
    tip: 345143,
    pay: 5626545,
  },
  {
    key: '2',
    date: '2019/03/18',
    deposit: 322435,
    tip: 345143,
    pay: 5626545,
  },
  {
    key: '3',
    date: '2019/03/18',
    deposit: 322435,
    tip: 345143,
    pay: 5626545,
  },
];
export default class ChartPerson extends PureComponent {
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
