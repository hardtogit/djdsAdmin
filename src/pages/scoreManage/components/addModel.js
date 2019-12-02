import React, { Component } from 'react';
import { Modal, Form ,Input,Select} from 'antd';
import { matchClass, matchType,area} from '@/config/constants';

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
    const { onCancel, form: { getFieldDecorator },entity ,onOk, type} = this.props;
    console.log(entity);
    const modalProps = {
      title:type==='add'?'新增':'修改',
      visible: true,
      width:600,
      onCancel,
      onOk: () => {
        this.props.form.validateFields((error,values)=>{
          if(!error){
            onOk(values);
          }
        });
      }
    };
    return (
      <Modal {...modalProps} >
        <Form {...formItemLayout}>
          <Form.Item label="排名">
            {getFieldDecorator('order', {
              initialValue:entity.order
            })(
              <Input/>
            )}
          </Form.Item>
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
          <Form.Item label="球队">
            {getFieldDecorator('name', {
              initialValue:entity.name
            })(
              <Input/>
            )}
          </Form.Item>

          <Form.Item label="赛别">
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
          <Form.Item label="赛区">
            {getFieldDecorator('area', {
              initialValue:entity.area
            })(
              <Select>
                {Object.keys(area).map((key)=>{
                  return <Option key={key}>{key}</Option>;
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="胜/平/负">
            {getFieldDecorator('goal', {
              initialValue:entity.goal||''
            })(
              <Input style={{width:'100%'}}/>
            )}
          </Form.Item>
          <Form.Item label="积分/胜负差/场均分">
            {getFieldDecorator('gold', {
              initialValue:entity.gold||''
            })(
              <Input style={{width:'100%'}}/>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Index;
