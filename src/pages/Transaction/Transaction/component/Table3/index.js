import React, { PureComponent } from 'react';
import { Table, Drawer, Button, Divider, Col, Row, Avatar } from 'antd';
import styles from './index.less';
/**
 * 模块：交易中心
 * 组件：表格 用户支付订单
 */
const columns = [
  {
    title: '交易时间',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '订单号 ',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '交易状态',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: '订单金额（元）',
    dataIndex: 'money',
    key: 'money',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => <App />,
  },
];
const DescriptionItem = ({ title, content }) => (
  <div>
    <p className={styles.font}>{title}:</p>
    {content}
  </div>
);
class App extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          查看详情
        </Button>
        <Drawer
          className={styles.drawer}
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p className={styles.title}>这是一个商家名称</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="订单号" content="24589754624" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="订单时间" content="¥2019-02-01 10:30" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="订单金额" content="¥500" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="订单状态" content="已打款" />
            </Col>
          </Row>

          <Divider />

          <p className={styles.font}>商家详情</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="商家名称" content="呦呦饭" />{' '}
            </Col>
            <Col span={12}>
              <DescriptionItem title="负责人" content="李某某" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="城市" content="沈阳市" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="电话" content="024-8224-4484" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="地址" content="辽宁省沈阳市皇姑区沈阳天地4楼" />
            </Col>
          </Row>

          <Divider />

          <p className={styles.font}>用户详情</p>
          <Row className={styles.row}>
            <Col span={12}>
              <DescriptionItem title="发起人" />
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                className={styles.avatar}
              />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={24}>
              <DescriptionItem title="参与人" />
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                className={styles.avatar}
              />
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                className={styles.avatar}
              />
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                className={styles.avatar}
              />
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                className={styles.avatar}
              />
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                className={styles.avatar}
              />
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                className={styles.avatar}
              />
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                className={styles.avatar}
              />
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                className={styles.avatar}
              />
            </Col>
          </Row>
          <div className={styles.button}>
            <Button>导出excel表格</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}
const data = [
  {
    key: '1',
    date: '2019-02-14 12:30',
    money: '￥120',
    number: '4548612248865',
    state: '已支付',
  },
  {
    key: '2',
    date: '2019-02-14 12:30',
    money: '￥160',
    number: '9548612288865',
    state: '已支付',
  },
  {
    key: '3',
    date: '2019-02-14 12:30',
    money: '￥160',
    number: '9548612288865',
    state: '已退款',
  },
  {
    key: '4',
    date: '2019-02-14 12:30',
    money: '￥120',
    number: '4548612248865',
    state: '已退款',
  },
  {
    key: '5',
    date: '2019-02-14 12:30',
    money: '￥120',
    number: '4548612248865',
    state: '已退款',
  },
  {
    key: '6',
    date: '2019-02-14 12:30',
    money: '￥120',
    number: '4548612248865',
    state: '已退款',
  },
  {
    key: '7',
    date: '2019-02-14 12:30',
    money: '￥120',
    number: '4548612248865',
    state: '已退款',
  },
  {
    key: '8',
    date: '2019-02-14 12:30',
    money: '￥120',
    number: '4548612248865',
    state: '未支付',
  },
];
export default class Table3View extends PureComponent {
  render() {
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}
