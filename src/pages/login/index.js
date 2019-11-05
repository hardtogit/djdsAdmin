import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import {model} from '@/utils/portal';
import styles from './index.less';

@model('login')
@Form.create()
class Index extends React.Component{

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          this.props.login({...values,xtype:'admin',level:'admin'});
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className={styles.bg} />
      <div className={styles.container}>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('login_name', {
            rules: [{ required: true, message: '请输入用户名!' }]
          })(
            <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('login_passwd', {
            rules: [{ required: true, message: '请输入密码!' }]
          })(
            <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button  type="primary" htmlType="submit" className={styles.loginBtn}>
            登陆
          </Button>
        </Form.Item>
      </Form>
      </div>
      </div>
    );
  }

}
export default Index;
