import React, { Component } from 'react';
import { Drawer, Button, Divider, Col, Row, Avatar } from 'antd';
import styles from './Drawer.less';
/**
 * 模块：活动
 * 页面：活动
 * 组件：抽屉组件（在表格中引入）
 */
const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);
export default class DrawerView extends Component {
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
