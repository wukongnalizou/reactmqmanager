import React, { PureComponent } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DataSet from '@antv/data-set';
import { Table, Divider, Tag } from 'antd';
import styles from './index.less';
/**
 * 模块：运营中心
 * 页面：数据统计-活动信息图表
 * @author:lisimeng
 */

// 曲线图数据
const data = [
  {
    day: '03/01',
    发起活动数: 3433,
    活动成团数: 4503,
    活动解散数: 7736,
  },
  {
    day: '03/02',
    发起活动数: 4321,
    活动成团数: 4442,
    活动解散数: 7365,
  },
  {
    day: '03/03',
    发起活动数: 542,
    活动成团数: 1245,
    活动解散数: 2562,
  },
  {
    day: '03/04',
    发起活动数: 1424,
    活动成团数: 7896,
    活动解散数: 6783,
  },
  {
    day: '03/05',
    发起活动数: 2543,
    活动成团数: 3986,
    活动解散数: 7849,
  },
  {
    day: '03/06',
    发起活动数: 1242,
    活动成团数: 5432,
    活动解散数: 9425,
  },
  {
    day: '03/07',
    发起活动数: 4313,
    活动成团数: 3242,
    活动解散数: 9732,
  },
  {
    day: '03/08',
    发起活动数: 1242,
    活动成团数: 3451,
    活动解散数: 4366,
  },
  {
    day: '03/09',
    发起活动数: 1253,
    活动成团数: 7895,
    活动解散数: 5461,
  },
  {
    day: '03/10',
    发起活动数: 5421,
    活动成团数: 12433,
    活动解散数: 7736,
  },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['发起活动数', '活动成团数', '活动解散数'],
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
    title: '发起活动数',
    dataIndex: 'initiate',
    key: 'initiate',
  },
  {
    title: '活动成团数',
    dataIndex: 'success',
    key: 'success',
  },
  {
    title: '活动解散数',
    key: 'disband',
    dataIndex: 'disband',
  },
];
const table = [
  {
    key: '1',
    date: '2019/03/18',
    initiate: 322435,
    success: 345143,
    disband: 5626545,
  },
  {
    key: '2',
    date: '2019/03/18',
    initiate: 322435,
    success: 345143,
    disband: 5626545,
  },
  {
    key: '3',
    date: '2019/03/18',
    initiate: 322435,
    success: 345143,
    disband: 5626545,
  },
];
export default class ChartActive extends PureComponent {
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
