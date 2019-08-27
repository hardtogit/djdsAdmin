import React, { Component } from 'react';
import UploadImg from '@/components/UploadImg';
import {Form,Col,Button,Row,message} from 'antd';
import Fetch from '@/utils/baseSever';

const FormItem=Form.Item;
const formItemLayout = {
  labelCol: { span: 8 },
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
      offset:2
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
    Fetch({obj:'admin',act:'homejoinread'}).then((response)=>{
      this.setState({
        entity:response.info
      });
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Fetch({obj:'admin',act:'homejoinmodify',...values}).then(()=>{
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
          style={{marginTop:'100px'}}
      >
        <Row>
          <Col span={6}>
            <FormItem
                label="加入我们"
            >
              {
                getFieldDecorator('join1',{
                  initialValue:entity.join1,
                  rules:[
                    {required:true,message:'图片必须上传'}
                  ]

                })(
                  <UploadImg imgCropProps={{width:1024,height:395,modalWidth:800,useRatio:true}}/>
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
                label="洽谈合作"
            >
              {
                getFieldDecorator('join2',{
                  initialValue:entity.join2,
                  rules:[
                    {required:true,message:'图片必须上传'}
                  ]

                })(
                  <UploadImg imgCropProps={{width:878,height:210,modalWidth:800,useRatio:true}}/>
                )
              }
            </FormItem>
          </Col>
        </Row>
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
