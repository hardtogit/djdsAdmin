import React, { Component } from 'react';
import UploadImg from '@/components/UploadImg';
import { Modal, Form ,Input,Select,Radio,InputNumber} from 'antd';


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

const Option=Select.Option;
@Form.create()
class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onCancel, form: { getFieldDecorator },entity ,onOk,type} = this.props;
    const modalProps = {
      title: type==='add'?'新增VR场景配置':'修改VR场景配置',
      visible: true,
      width:680,
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
          <Form.Item
              label="主图"
          >
            {
              getFieldDecorator('picture',{
                initialValue:entity.picture,
                rules:[
                  {required:true,message:'请选择主图'}
                ]

              })(
                <UploadImg />
              )
            }
          </Form.Item>
          <Form.Item label="标题">
            {getFieldDecorator('name', {
              initialValue:entity.name,
              rules:[{required:true,message:'请填写标题'}]
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="VR训练">
            {getFieldDecorator('vrfid', {
              initialValue:entity.vrfid
            })(
              <UploadImg/>
            )}
          </Form.Item>

          <Form.Item label="状态">
            {getFieldDecorator('lock', {
              initialValue:entity.lock
            })(
              <Select>
                <Option value="false">公开</Option>
                <Option value="true">锁定</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="位置">
            {getFieldDecorator('location', {
              initialValue:entity.location
            })(
              <InputNumber precision={0}/>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Index;
