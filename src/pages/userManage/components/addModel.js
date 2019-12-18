import React, { Component } from 'react';
import { Modal, Form ,InputNumber,Select} from 'antd';
import Fetch from '@/utils/baseSever';

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
    this.state={
      dataSource:[]
    };
  }
  componentDidMount(){
    Fetch({
      obj: 'admin',
      act: 'giftlist',
      page_num: 0,
      page_size: 1000
    }).then((data)=>{
      this.setState({
        dataSource:data.info.records
      });
    });
  }

  render() {
    const { onCancel, form: { getFieldDecorator },entity ,onOk} = this.props;
    const modalProps = {
      title: '设置试用期',
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
          <Form.Item label="试用天数">
            {getFieldDecorator('usetime', {
              initialValue:entity.usetime
            })(
              <InputNumber precision={0} style={{width:'100%'}}/>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Index;
