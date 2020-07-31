import React, { PureComponent } from 'react';
import { Drawer, Button, Divider, Col, Row, Avatar, Table, Tag } from 'antd';
import styles from './index.less';
/**
 * 模块：商户中心
 * 页面：已入驻商户--商户活动
 * 组件：表格
 */
const columns = [
  {
    title: '成单时间',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '预付款金额',
    dataIndex: 'money',
    key: 'money',
  },
  {
    title: '参与人数',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </span>
    ),
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
          <p className={styles.title}>活动详情</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="活动时间" content="2019-02-01 12:30" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="成单时间" content="¥2019-02-01 10:30" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="预付款金额" content="¥500" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="付款方式" content="大随机" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className={styles.flex}>
                <DescriptionItem title="标签" />
                <Tag color="blue">失恋联盟</Tag>
                <Tag color="blue">漫威粉</Tag>
              </div>
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
    number: '4人',
    tags: ['loser'],
  },
  {
    key: '2',
    date: '2019-02-15 14:00',
    money: '￥3000',
    number: '4人',
    tags: ['葬爱家族', '杀马特'],
  },
  {
    key: '3',
    date: '2019-02-15 14:00',
    money: '￥3000',
    number: '4人',
    tags: ['葬爱家族', '杀马特'],
  },
  {
    key: '2',
    date: '2019-02-15 14:00',
    money: '￥3000',
    number: '4人',
    tags: ['葬爱家族', '杀马特'],
  },
  {
    key: '4',
    date: '2019-02-15 14:00',
    money: '￥3000',
    number: '4人',
    tags: ['葬爱家族', '杀马特'],
  },
  {
    key: '5',
    date: '2019-02-15 14:00',
    money: '￥3000',
    number: '4人',
    tags: ['葬爱家族', '杀马特'],
  },
  {
    key: '6',
    date: '2019-02-15 14:00',
    money: '￥3000',
    number: '4人',
    tags: ['葬爱家族', '杀马特'],
  },
  {
    key: '7',
    date: '2019-02-15 14:00',
    money: '￥3000',
    number: '4人',
    tags: ['葬爱家族', '杀马特'],
  },
];
export default class TableView extends PureComponent {
  render() {
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}
