import React, { Component } from 'react';
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
      title: type==='add'?'新增任务':'修改任务',
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
              label="标题"
          >
            {
              getFieldDecorator('name',{
                initialValue:entity.name,
                rules:[
                  {required:true,message:'标题必须填写'}
                ]

              })(
                <Input />
              )
            }
          </Form.Item>
          <Form.Item label="任务内容">
            {getFieldDecorator('content', {
              initialValue:entity.content
            })(
              <Input.TextArea/>
            )}
          </Form.Item>

          <Form.Item label="循环频率">
            {getFieldDecorator('frequence', {
              initialValue:entity.frequence
            })(
              <Select>
                <Option value={1}>每日</Option>
                <Option value={2}>每2日</Option>
                <Option value={3}>每3日</Option>
                <Option value={7}>每7日</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="链接">
            {getFieldDecorator('link', {
              initialValue:entity.link
            })(
              <Radio.Group>
                <Radio value="none">无跳转</Radio>
                <Radio value="course">课程学习</Radio>
                <Radio value="vr">VR练习</Radio>
                <Radio value="breath">呼吸练习</Radio>
              </Radio.Group>
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
