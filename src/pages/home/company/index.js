import React, { Component } from 'react';
import UploadImg from '@/components/UploadImg';
import {Form,Select,Row,Col,Button,message} from 'antd';
import Fetch from '@/utils/baseSever';

const Option=Select.Option;
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
    Fetch({obj:'admin',act:'homecompanyread'}).then((response)=>{
      this.setState({
        entity:response.info
      });
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Fetch({obj:'admin',act:'homecompanymodify',...values}).then(()=>{
          message.success('操作成功');
        });
      }
    });
  };
  render() {
    const {entity}=this.state;
    const { form:{getFieldDecorator} }=this.props;
    return (
        <Form
            {...formItemLayout}
            style={{marginTop:'100px'}}
        >
          <Row>
            <Col span={6}>
              <FormItem
                  label="公司概况"
              >
                {
                  getFieldDecorator('company1',{
                    initialValue:entity.company1,
                    rules:[
                      {required:true,message:'图片必须上传'}
                    ]

                  })(
                    <UploadImg imgCropProps={{width:100,height:100,useRatio:true}}/>
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                  label="公司荣誉"
              >
                {
                  getFieldDecorator('company2',{
                    initialValue:entity.company2,
                    rules:[
                      {required:true,message:'图片必须上传'}
                    ]

                  })(
                    <UploadImg imgCropProps={{width:100,height:100,useRatio:true}}/>
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                  label="发展历程"
              >
                {
                  getFieldDecorator('company3',{
                    initialValue:entity.company3,
                    rules:[
                      {required:true,message:'图片必须上传'}
                    ]

                  })(
                    <UploadImg imgCropProps={{width:100,height:100,useRatio:true}}/>
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                  label="愿景使命"
              >
                {
                  getFieldDecorator('company4',{
                    initialValue:entity.company4,
                    rules:[
                      {required:true,message:'图片必须上传'}
                    ]

                  })(
                    <UploadImg imgCropProps={{width:100,height:100,useRatio:true}}/>
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
