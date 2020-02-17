import React, { Component } from 'react';
import FileUpload from '@/components/FileUpload';
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
      title: type==='add'?'新增VR多媒体配置':'修改VR多媒体配置',
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
              label="资源"
          >
            {
              getFieldDecorator('vrfid',{
                initialValue:entity.vrfid,
                rules:[
                  {required:true,message:'请选择资源'}
                ]

              })(
                <FileUpload />
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
          <Form.Item label="类型">
            {getFieldDecorator('subtype', {
              initialValue:entity.subtype
            })(
              <Select>
                <Option value="video">视频</Option>
                <Option value="picture">图片</Option>
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
