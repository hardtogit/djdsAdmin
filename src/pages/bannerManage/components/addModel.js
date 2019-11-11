import React, { Component } from 'react';
import { Modal, Form ,Input,Select} from 'antd';
import {informationType} from '@/config/constants';
import Editor from '@/components/Editor';
import UploadImg from '@/components/UploadImg';

const Option=Select.Option;
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
      title:type==='add'?'新增Banner':'修改Banner',
      visible: true,
      width:900,
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
          <Form.Item label="图片">
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
        </Form>
      </Modal>
    );
  }
}

export default Index;
