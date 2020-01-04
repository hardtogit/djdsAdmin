import React, { Component } from 'react';
import UploadImg from '@/components/UploadImg';
import {model} from '@/utils/portal';
import {Form,Select,Input,Button,InputNumber,DatePicker,message} from 'antd';
import Fetch from '@/utils/baseSever';

const Option=Select.Option;
const RangePicker =DatePicker.RangePicker;
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
      loading:false
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(values.time){
          values.starttime=values.time[0].unix();
          values.endtime=values.time[1].unix();
          delete values.time;
        }
        Fetch({...values,obj:'admin',act:'banneradd'}).then(()=>{
          message.success('新增成功');
          this.props.pop();
        });
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { form:{getFieldDecorator},pop }=this.props;
    return (
        <Form
            {...formItemLayout}
            style={{maxWidth:'600px'}}
        >
          <FormItem
              label="主图"
          >
            {
              getFieldDecorator('picture',{
                rules:[
                  {required:true,message:'图片必须上传'}
                ]

              })(
                <UploadImg imgCropProps={{width:1920,height:847,modalWidth:800,useRatio:true}}/>
              )
            }
          </FormItem>
          <FormItem label="标题">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: '请输入标题' }
              ]
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem label="有效期">
            {getFieldDecorator('time', {
              rules: [
                { required: true, message: '请选择有效期' }
              ]
            })(
              <RangePicker showTime/>
            )}
          </FormItem>
          <FormItem label="位置">
            {getFieldDecorator('location', {
              rules: [
                { required: true, message: '请输入位置' }
              ]
            })(
              <InputNumber precision={0} min={1}/>
            )}
          </FormItem>
          <FormItem label="链接类型">
            {getFieldDecorator('linktype', {
            })(
              <Select >
                <Option value="internal">内部</Option>
                <Option value="external">外部</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem label="链接">
            {getFieldDecorator('link', {
            })(
              <Input/>
            )}
          </FormItem>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" onClick={this.handleSubmit} style={{marginRight:'15px'}}>
              保存
            </Button>
            <Button onClick={()=>pop()}>
              返回
            </Button>
          </Form.Item>
        </Form>
    );
  }
}
export default Index;
