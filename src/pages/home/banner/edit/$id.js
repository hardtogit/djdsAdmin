import React, { Component } from 'react';
import UploadImg from '@/components/UploadImg';
import {screenType} from '@/config/constants';
import {model} from '@/utils/portal';
import {Form,Select,Input,Button,message} from 'antd';
import Fetch from '@/utils/baseSever';

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
class Id extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading:false,
      banner:{}
    };
  }
  componentDidMount(){
    const {match:{params:{id}}}=this.props;
    Fetch({obj:'admin',act:'bannerread',id}).then((response)=>{
      this.setState({
        banner:response.info
      });
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Fetch({...values,type:'home',obj:'admin',act:'bannermodify',id:this.props.match.params.id}).then(()=>{
          message.success('修改成功');
          this.props.pop();
        });
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const {banner}=this.state;
    const { form:{getFieldDecorator},pop }=this.props;
    return (
        <Form
            {...formItemLayout}
            style={{maxWidth:'600px'}}
        >
          <FormItem
              label="图片"
          >
            {
              getFieldDecorator('picture',{
                initialValue:banner.fid,
                rules:[
                  {required:true,message:'图片必须上传'}
                ]

              })(
                <UploadImg imgCropProps={{width:1920,height:847,modalWidth:800,useRatio:true}}/>
              )
            }
          </FormItem>
          <FormItem label="设备类型">
            {getFieldDecorator('location', {
              initialValue:banner.location,
              rules: [
                { required: true, message: '设备类型必须选择' }
              ]
            })(
              <Select >
                {Object.keys(screenType).map((key)=>(
                  <Option value={key} key={key}>{screenType[key]}</Option>))
                }
              </Select>,
            )}
          </FormItem>
          <FormItem label="描述">
            {getFieldDecorator('description', {
              initialValue:banner.description,
              rules: [
                { required: true, message: 'banner描述必须填写' }
              ]
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem label="链接">
            {getFieldDecorator('link', {
              initialValue:banner.link,
              rules: []
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
export default Id;
