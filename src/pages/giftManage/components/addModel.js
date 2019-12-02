import React, { Component } from 'react';
import { Modal, Form ,Input,InputNumber} from 'antd';

import UploadImg from '@/components/UploadImg';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
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
      title:type==='add'?'新增资讯':'修改资讯',
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
          <Form.Item label="礼物图片">
            {getFieldDecorator('picture', {
              initialValue:entity.picture
            })(
              <UploadImg crop={false}/>
            )}
          </Form.Item>
          <Form.Item label="标题">
            {getFieldDecorator('name', {
              initialValue:entity.name
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="金额">
            {getFieldDecorator('money', {
              initialValue:entity.money||''
            })(
              <InputNumber style={{width:'100%'}}/>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Index;
