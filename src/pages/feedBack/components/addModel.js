import React, { Component } from 'react';
import { Modal, Form ,Input,Select} from 'antd';
import Fetch from '@/utils/baseSever';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
};
const TextArea=Input.TextArea;
@Form.create()
class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataSource:[]
    };
  }
  render() {
    const { onCancel, form: { getFieldDecorator },entity ,onOk} = this.props;
    const modalProps = {
      title: '评论回复',
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
          <Form.Item label="回复内容">
            {getFieldDecorator('feedbackresponse_txt', {
              initialValue:entity.feedbackresponse_txt
            })(
              <TextArea precision={0} rows={4} style={{width:'100%'}}/>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Index;
