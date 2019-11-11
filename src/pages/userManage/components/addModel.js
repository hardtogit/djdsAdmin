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
    const { onCancel, form: { getFieldDecorator },entity ,onOk} = this.props;
    const modalProps = {
      title: '新增商品',
      visible: true,
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
          <Form.Item label="商品图片">
            {getFieldDecorator('picture', {
              initialValue:entity.picture
            })(
              <UploadImg crop={false}/>
            )}
          </Form.Item>
          <Form.Item label="商家名称">
            {getFieldDecorator('seller', {
              initialValue:entity.seller
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="商品名称">
            {getFieldDecorator('goodsname', {
              initialValue:entity.goodsname
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="商品编号">
            {getFieldDecorator('serialnum', {
              initialValue:entity.serialnum
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="商品价格">
            {getFieldDecorator('price', {
              initialValue:entity.price
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
