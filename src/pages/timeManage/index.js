import React, { Component } from 'react';
import {Form,InputNumber,Button,message} from 'antd';
import Fetch from '@/utils/baseSever';

const FormItem=Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset:6
    }
  }
};
@Form.create()
class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading:false,
      entity:{}
    };
  }
  componentDidMount(){
    Fetch({
      obj:'admin',
      act:'readusetime'
    }).then((data)=>{
      this.setState({
        entity:data.info
      });
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Fetch({
          obj:'admin',
          act:'setusetime',
          ...values
        }).then(()=>{
          message.success('设置成功');
        });

      }
    });
  };
  render() {
    const { form:{getFieldDecorator} }=this.props;
    const {entity}=this.state;
    return (
        <Form
            {...formItemLayout}
            style={{maxWidth:'600px'}}
        >
          <FormItem label="试用天数">
            {getFieldDecorator('usetime', {
              initialValue:entity,
              rules: [{required:true,message:'请填写试用天数'}]
            })(
              <InputNumber precision={0}/>
            )}
          </FormItem>
          <Form.Item {...tailFormItemLayout}>
            <Button onClick={this.handleSubmit} style={{marginRight:'15px'}}>
              保存
            </Button>
          </Form.Item>
        </Form>
    );
  }
}
export default Index;
