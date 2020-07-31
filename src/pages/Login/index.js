import React, { Component } from 'react';
import { Input, Button, Form, Statistic, message } from 'antd';
import { connect } from 'dva';
import logo from '@/assets/global/logo.png';
import styles from './index.less';

const { Countdown } = Statistic;
let exLoginDemo = null;

@connect(({ login, loading }) => ({
  login,
  code: login.code,
  data: login.data,
  deadline: login.deadline,
  loginEntering:
    loading.effects['login/loginEnter'] ||
    loading.effects['login/loginPhoneSubmit'] ||
    loading.effects['login/loginRegister'],
}))
class LoginDemo extends Component {
  state = {
    username: '', // 用户名
    password: '', // 密码
    status: 'username', // 切换注册、账号登录、手机验证码登录
    classStatus: 'username', // 切换样式
    text: '登录', // 登录和注册的文本
    placeholderName: '用户名', // 用户名和手机号的placehoder
  };

  // 当输入发生改变
  onInputChange(e) {
    const inputValue = e.target.value; // 获取input的值
    const inputName = e.target.name; // 获取input的name
    this.setState({
      [inputName]: inputValue,
    });
  }

  // 获取验证码
  onSendCode() {
    const { classStatus } = this.state;
    const { dispatch, form } = this.props;
    const type = classStatus === 'phoneSubmit' ? 'login/submitCode' : 'login/registerCode';
    form.validateFields(['phoneNumber'], (err, values) => {
      const data = values;
      if (!err) {
        const payload = data.phoneNumber;
        dispatch({
          type,
          payload,
        });
      } else {
        message.warning(`请输入手机号`);
      }
    });
  }

  // 登陆
  onSubmit() {
    const { classStatus } = this.state;
    const { dispatch, form } = this.props;
    const loginInfo = {
      username: this.state.username,
      password: this.state.password,
    };
    let type = 'login/loginEnter';
    let payload = loginInfo;
    let istrue = false;
    if (classStatus === 'username') {
      form.validateFields(['username', 'password'], (err, values) => {
        const data = values;
        if (!err) {
          type = 'login/loginEnter';
          payload = loginInfo;
          istrue = true;
        } else {
          message.warning('请填写用户名和密码');
        }
      });
    } else if (classStatus === 'phoneSubmit') {
      form.validateFields(['phoneNumber', 'phoneCode'], (err, values) => {
        const data = values;
        if (!err) {
          type = 'login/loginPhoneSubmit';
          payload = {
            telNumber: data.phoneNumber,
            telCode: data.phoneCode,
          };
          istrue = true;
        } else {
          message.warning('请填写手机号和验证码');
        }
      });
    } else {
      form.validateFields(['phoneNumber', 'phoneCode'], (err, values) => {
        const data = values;
        if (!err) {
          type = 'login/loginRegister';
          payload = {
            telNumber: data.phoneNumber,
            telCode: data.phoneCode,
          };
          istrue = true;
        } else {
          message.warning('请填写手机号和验证码');
        }
      });
    }
    if (istrue === true) {
      dispatch({
        type,
        payload,
      });
    }
  }

  // 切换注册、账号登录、验证码登录
  ontabStatus(st) {
    const { form } = this.props;
    if (st === 'userSubmit') {
      this.setState({
        status: 'username',
        classStatus: 'username',
        text: '登录',
        placeholderName: '用户名',
      });
    } else {
      this.setState({
        status: 'submit',
      });
      if (st === 'phoneSubmit') {
        this.setState({
          classStatus: 'phoneSubmit',
          text: '登录',
          placeholderName: '请输入登录手机号',
        });
        // 切换注册和手机号登录时候重置input
        form.resetFields(['phoneNumber', 'phoneCode', []]);
      } else {
        this.setState({
          classStatus: 'phoneRegister',
          text: '注册',
          placeholderName: '请输入注册手机号',
        });
        // 切换注册和手机号登录时候重置input
        form.resetFields(['phoneNumber', 'phoneCode', []]);
      }
    }
  }

  // 验证码倒计时结束后触发
  onCountdown() {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/subReCode',
      payload: {
        code: true,
        deadline: 0,
      },
    });
  }

  // 点击回车登陆
  onInputKeyUp(e) {
    if (e.keyCode === 13) {
      this.onSubmit();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { status, classStatus, text, placeholderName } = this.state;
    const { code, deadline, loginEntering } = this.props;
    return (
      <div className={styles.loginBg}>
        <div className={styles.login}>
          <img className={styles.logo} src={logo} />
          <span className={styles.name}>魔咕</span>
          {status === 'username' ? (
            <React.Fragment>
              {/* 账号登录 */}
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: '请输入用户名',
                    },
                  ],
                })(
                  <Input
                    placeholder={placeholderName}
                    className={styles.username}
                    autoComplete="off"
                    name="username"
                    type="text"
                    onChange={e => {
                      this.onInputChange(e);
                    }}
                    onKeyUp={e => {
                      this.onInputKeyUp(e);
                    }}
                  />,
                )}
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码',
                    },
                  ],
                })(
                  <Input
                    placeholder="密码"
                    className={styles.password}
                    autoComplete="off"
                    name="password"
                    type="password"
                    onChange={e => {
                      this.onInputChange(e);
                    }}
                    onKeyUp={e => {
                      this.onInputKeyUp(e);
                    }}
                  />,
                )}
              </Form.Item>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* 注册和手机登录 */}
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator('phoneNumber', {
                  rules: [
                    {
                      required: true,
                      pattern: /^((13[0-9])|(14[0-9])|(15([0-9]))|(17([0-9]))|(18[0-9]))\d{8}$/,
                      message: '请输入正确的手机格式',
                    },
                  ],
                })(
                  <Input
                    placeholder={placeholderName}
                    className={styles.username}
                    autoComplete="off"
                    name="username"
                    type="text"
                    onChange={e => {
                      this.onInputChange(e);
                    }}
                    onKeyUp={e => {
                      this.onInputKeyUp(e);
                    }}
                  />,
                )}
              </Form.Item>
              <div className={styles.telCode}>
                <Form.Item>
                  {getFieldDecorator('phoneCode', {
                    rules: [
                      {
                        required: true,
                        pattern: /^\d{4}$/,
                        message: '请输入四位验证码',
                      },
                    ],
                  })(<Input placeholder="验证码" autoComplete="off" className={styles.codeInp} />)}
                </Form.Item>
                {code === true ? (
                  <Button
                    className={styles.codeBtn}
                    onClick={() => {
                      this.onSendCode();
                    }}
                  >
                    获取验证码
                  </Button>
                ) : (
                  <Countdown
                    className={styles.countDownd}
                    title={null}
                    value={deadline}
                    format="s秒"
                    onFinish={() => {
                      this.onCountdown();
                    }}
                  />
                )}
              </div>
            </React.Fragment>
          )}
          <Button
            className={styles.loginBtn}
            onClick={() => {
              this.onSubmit();
            }}
            loading={loginEntering}
          >
            {text}
          </Button>
          <div className={styles.tabDiv}>
            <span
              className={classStatus === 'username' ? styles.tabLoginBtnPitch : styles.tabLoginBtn}
              onClick={() => {
                this.ontabStatus('userSubmit');
              }}
            >
              账号密码登录
            </span>
            <span className={styles.tabLoginIcon}>/</span>
            <span
              className={
                classStatus === 'phoneSubmit' ? styles.tabLoginBtnPitch : styles.tabLoginBtn
              }
              onClick={() => {
                this.ontabStatus('phoneSubmit');
              }}
            >
              手机号登录
            </span>
          </div>
          {/* <span className = {styles.register} onClick={() => { this.ontabStatus('phoneRegister')}}>注册账号</span>  */}
          <span className={styles.bgsystem}>后台管理系统</span>
          <span className={styles.bms}>Background management system</span>
        </div>
      </div>
    );
  }
}

exLoginDemo = Form.create()(LoginDemo);

export default exLoginDemo;
