import React, { Component } from 'react';
import UploadImg from '@/components/UploadImg';
import {screenType} from '@/config/constants';
import {model} from '@/utils/portal';
import {Form,Select,Input,Button} from 'antd';
import Fetch from '@/utils/baseSever';
import { message } from 'antd/lib/index';

const Option=Select.Option;
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
@model('homeBanner')
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
    Fetch({obj:'admin',act:'homeqrread'}).then((response)=>{
      this.setState({
        entity:response.info
      });
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Fetch({obj:'admin',act:'homeqrmodify',...values}).then(()=>{
          message.success('操作成功');
        });
      }
    });
  };
  render() {
    const {entity}=this.state;
    const { form:{getFieldDecorator}}=this.props;
    return (
      <Form
          {...formItemLayout}
          style={{marginTop:'100px',maxWidth:'600px'}}
      >
        <FormItem
            label="视频"
        >
          {
            getFieldDecorator('qr1',{
              initialValue:entity.qr1,
              rules:[
                {required:true,message:'图片必须上传'}
              ]

            })(
              <UploadImg imgCropProps={{width:320,height:320,modalWidth:800,useRatio:true}}/>
            )
          }
        </FormItem>
        <FormItem
            label="状态"
        >
          {
            getFieldDecorator('status',{
              initialValue:entity.status,
              rules:[
                {required:true,message:'状态'}
              ]

            })(
              <Select>
                <Option >生效</Option>
                <Option>失效</Option>
              </Select>
            )
          }
        </FormItem>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" onClick={this.handleSubmit} style={{marginRight:'15px'}}>
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default Index;
