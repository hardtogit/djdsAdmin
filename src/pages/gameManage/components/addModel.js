import React, { Component } from 'react';
import {matchClass,matchType} from '@/config/constants';
import moment from 'moment';
import { Modal, Form ,Input,Select,DatePicker} from 'antd';

const Option=Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};
@Form.create()
class Index extends Component {
  render() {
    const { onCancel, form: { getFieldDecorator },entity ,onOk,type} = this.props;
    const modalProps = {
      title:type==='add'? '新增赛事':'修改赛事',
      visible: true,
      onCancel,
      onOk: () => {
        this.props.form.validateFields((error,values)=>{
          values.time=values.time.unix();
          if(!error){
            onOk(values);
          }
        });
      }
    };
    return (
      <Modal {...modalProps} >
        <Form {...formItemLayout}>
          <Form.Item label="类别">
            {getFieldDecorator('class', {
              initialValue:entity.class
            })(
                <Select>
                  {Object.keys(matchType).map((key)=>{
                    return <Option key={key}>{key}</Option>;
                  })}
                </Select>
            )}
          </Form.Item>
          <Form.Item label="赛事">
            {getFieldDecorator('scope', {
              initialValue:entity.scope
            })(
              <Select>
                {Object.keys(matchClass).map((key)=>{
                    return <Option key={key}>{key}</Option>;
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="对局">
            {getFieldDecorator('match', {
              initialValue:entity.match
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="比赛时间">
            {getFieldDecorator('time', {
              initialValue:entity.time&&moment(entity.time)
            })(
              <DatePicker showTime style={{width:'100%'}}/>
            )}
          </Form.Item>
          <Form.Item label="直播地址">
            {getFieldDecorator('link', {
              initialValue:entity.link
            })(
              <Input/>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Index;
