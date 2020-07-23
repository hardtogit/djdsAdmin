import React, { Component } from 'react';
import {model} from '@/utils/portal';
import {Form,Input,Button,message,Icon} from 'antd';
import Fetch from '@/utils/baseSever';
import  styles from './index.less';


@model('homeBanner')
@Form.create()
class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading:false,
      count:60
    };
  }
  componentDidMount(){
    // this.getCode()
  }
  countDown=()=>{
    let timr=setInterval(()=>{
      const {count}=this.state;
      if(count===0){
        clearInterval(timr);
        this.setState({
          count:60
        });
        return;
      }
      this.setState({
        count:count-1
      });
    },1000);
  }
  getCode=()=>{
    Fetch({obj:'user',act:'getcode',login_name:15810777675}).then(()=>{
      message.success('验证码已发送');
      this.countDown();
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // if(values.login_passwd_new!==values.login_passwd_new_confirm){
        //   message.error('确认密码不一致')
        //   return
        // }
        Fetch({...values,obj:'admin',act:'setnewpassword'}).then(()=>{
          message.success('修改成功');
          this.props.pop();
        });
      }
    });
  };
  render() {
    const {count}=this.state;
    const { form:{getFieldDecorator}}=this.props;
    return (
      <div>
        <div className={styles.bg} />
        <div className={styles.container}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('login_passwd_new', {
                rules: [{ required: true, message: '请输入新密码!' }]
              })(
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="新密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入手机号!' }],
                initialValue:'15810777675'
              })(
                <Input
                    type="number"
                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="手机号"
                    disabled
                />,
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入验证码!' }]
              })(
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="验证码"
                    addonAfter={count==60?<div onClick={this.getCode}>获取验证码</div>:<div>{count}s</div>}
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button  type="primary" htmlType="submit" className={styles.loginBtn}>
                修改密码
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default Index;
