import React, { Component } from 'react';
import {matchClass,matchType} from '@/config/constants';
import Upload from '@/components/UploadImg';
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
          if(!error){
            values.starttime=values.starttime.unix();
            values.endtime=values.endtime.unix();
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
          <Form.Item label="队伍一图标">
            {getFieldDecorator('match1pic', {
              initialValue:entity.match1pic
            })(
              <Upload/>
            )}
          </Form.Item>
          <Form.Item label="队伍一">
            {getFieldDecorator('match1', {
              initialValue:entity.match1
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="队伍二图标">
            {getFieldDecorator('match2pic', {
              initialValue:entity.match2pic
            })(
              <Upload/>
            )}
          </Form.Item>
          <Form.Item label="队伍二">
            {getFieldDecorator('match2', {
              initialValue:entity.match2
            })(
              <Input/>
            )}
          </Form.Item>

          <Form.Item label="比赛开始时间">
            {getFieldDecorator('starttime', {
              initialValue:entity.starttime&&moment(entity.starttime*1000)
            })(
              <DatePicker showTime style={{width:'100%'}}/>
            )}
          </Form.Item>
          <Form.Item label="比赛结束时间">
            {getFieldDecorator('endtime', {
              initialValue:entity.endtime&&moment(entity.endtime*1000)
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
