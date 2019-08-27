import React, { Component } from 'react';
import { Modal, Form ,Input} from 'antd';
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
    const { onCancel, form: { getFieldDecorator },form,onOk,entity } = this.props;
    const modalProps = {
      title: '新增合作伙伴',
      visible: true,
      onCancel,
      onOk: () => {
        form.validateFields((error,values)=>{
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
              initialValue:entity.fid
            })(
              <UploadImg imgCropProps={{width:146,height:80,useRatio:true}}/>
            )}
          </Form.Item>
          <Form.Item label="名称">
            {getFieldDecorator('title', {
              initialValue:entity.title
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="链接">
            {getFieldDecorator('link', {
              initialValue:entity.link
            })(
              <Input />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Index;
