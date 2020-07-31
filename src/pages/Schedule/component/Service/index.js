import React, { Component } from 'react';
import { List, Avatar, Form, Button, Input, Comment } from 'antd';
import moment from 'moment';
import styles from './index.less';
/**
 * 模块：首页
 * 组件：回复
 */
const TextArea = Input.TextArea;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        style={{ width: 150 }}
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        回复
      </Button>
    </Form.Item>
  </div>
);
// 人物名
const complaintdata = [
  {
    title: '藏爱家族',
  },
];
export default class SerivceView extends Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
  };
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
    this.setState({
      submitting: true,
    });
    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };
  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    const { comments, submitting, value } = this.state;
    return (
      <div>
        <div className={styles.contentCenter}>
          <List
            className={styles.list}
            itemLayout="horizontal"
            dataSource={complaintdata}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      className={styles.icon}
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                  }
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="约的人根本没来！！！差评！！"
                />
              </List.Item>
            )}
          />
          <div className={styles.answer}>
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              }
              content={
                <Editor
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  submitting={submitting}
                  value={value}
                />
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
