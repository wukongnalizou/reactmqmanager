import React, { PureComponent } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Divider, Tag } from 'antd';
import styles from './index.less';
/**
 * 模块：运营中心
 * 页面：数据统计-平台用户总量曲线图
 * @author:lisimeng
 */

// 曲线图数据
const data = [
  {
    day: '03/01',
    新增用户: 3433,
    活跃用户: 4503,
  },
  {
    day: '03/02',
    新增用户: 4321,
    活跃用户: 4442,
  },
  {
    day: '03/03',
    新增用户: 542,
    活跃用户: 1245,
  },
  {
    day: '03/04',
    新增用户: 1424,
    活跃用户: 7896,
  },
  {
    day: '03/05',
    新增用户: 2543,
    活跃用户: 3986,
  },
  {
    day: '03/06',
    新增用户: 1242,
    活跃用户: 5432,
  },
  {
    day: '03/07',
    新增用户: 4313,
    活跃用户: 3242,
  },
  {
    day: '03/08',
    新增用户: 1242,
    活跃用户: 3451,
  },
  {
    day: '03/09',
    新增用户: 1253,
    活跃用户: 7895,
  },
  {
    day: '03/10',
    新增用户: 5421,
    活跃用户: 12433,
  },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['新增用户', '活跃用户'],
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
    title: '新增用户',
    dataIndex: 'new',
    key: 'new',
  },
  {
    title: '活跃用户',
    dataIndex: 'active',
    key: 'active',
  },
  {
    title: '今日累计',
    key: 'today',
    dataIndex: 'today',
  },
  {
    title: '总用户数（新增）',
    key: 'all',
    dataIndex: 'all',
  },
];
const table = [
  {
    key: '1',
    date: '2019/03/18',
    new: 322435,
    active: 345143,
    today: 5626545,
    all: 61236215,
  },
  {
    key: '2',
    date: '2019/03/18',
    new: 322435,
    active: 345143,
    today: 5626545,
    all: 61236215,
  },
  {
    key: '3',
    date: '2019/03/18',
    new: 322435,
    active: 345143,
    today: 5626545,
    all: 61236215,
  },
];
export default class ChartCustom extends PureComponent {
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
