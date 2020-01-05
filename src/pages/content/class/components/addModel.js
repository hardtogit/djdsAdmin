import React, { Component } from 'react';
import { Modal, Form ,Input,Select} from 'antd';
import Editor from '@/components/Editor';
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

const Option=Select.Option;
@Form.create()
class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onCancel, form: { getFieldDecorator },entity ,onOk,type} = this.props;
    const modalProps = {
      title: type==='add'?'新增课程':'修改课程',
      visible: true,
      width:1000,
      onCancel,
      onOk: () => {
        this.props.form.validateFields((error,values)=>{
          if(!error){
            onOk({...values, subtype:'course'});
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
                  {required:true,message:'图片必须上传'}
                ]

              })(
                <UploadImg />
              )
            }
          </Form.Item>
          <Form.Item label="标题">
            {getFieldDecorator('name', {
              initialValue:entity.name
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="是否锁定">
            {getFieldDecorator('lock', {
              initialValue:entity.lock
            })(
              <Select>
                <Option value="true">锁定</Option>
                <Option value="false">不锁定</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="详细信息">
            {getFieldDecorator('detail', {
              initialValue:entity.detail||''
            })(
              <Editor/>
            )}
          </Form.Item>


        </Form>
      </Modal>
    );
  }
}

export default Index;
