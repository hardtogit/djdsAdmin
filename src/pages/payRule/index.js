import React from 'react';
import moment from 'moment';
import {Card,Form,Radio,Row,Col,InputNumber,DatePicker,Button,message} from 'antd';
import Checkbox from '@/components/Checkbox'
import Fetch from '@/utils/baseSever';
const FormItem =Form.Item;
 const RangePicker=DatePicker.RangePicker;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const timeLayout={
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
@Form.create()
class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      entity:{},
      payType:'',
      discountType:'none'
    };
  }
  componentDidMount() {
    Fetch({
      obj:'admin',
      act:'payread'
    }).then((data)=>{
     this.setState({
       entity:data.info,
       discountType:data.info.subtype
     });
    });
  }

  handleDiscountChange=(discountType)=>{
    console.log(discountType);
    this.setState({
      discountType:discountType.target.value
    });
  }
  handleSubmit=()=>{
    this.props.form.validateFields((error,values)=>{
      if(!error){
        let params;
        if(this.state.discountType==='none'){
           params={
            subtype:'none',
            dollar:values.dollar,
            rmb:values.rmb,
            euro:values.euro
          };
        }else{
          if(values.time){
            values.starttime=values.time[0].unix();
            values.endtime=values.time[1].unix();
            delete values.time;
          }else{
            values.starttime=0;
            values.endtime=0;
          }
          params={
            subtype: 'fix',
            ...values
          };
        }
        console.log('params',params)
        Fetch({
          obj:'admin',
          act:'payset',
          ...params
        }).then(()=>{
          message.success('操作成功');
          this.setState({
            payType:''
          });
        });

      }
    });
  }
  render(){
    const {form:{getFieldDecorator}} =this.props;
    const {payType,discountType,entity}=this.state;
    return(
      <Form layout="horizontal">
        <Card title={
          <FormItem
              label="折扣方式"
          >
                <Radio.Group value={discountType} onChange={this.handleDiscountChange}>
                  <Radio value="none">无折扣</Radio>
                  <Radio value="fix">一口价折扣</Radio>
                  <Radio value="discount">百分比折扣</Radio>
                </Radio.Group>

          </FormItem>
        }
        >
          <Row>
            <Col span={3}>
              <FormItem
                {...formItemLayout}
              >
                {
                  getFieldDecorator('dollar_flag', {
                    initialValue: entity.dollar_flag
                  })(
                    <Checkbox>美元</Checkbox>
                  )
                }
              </FormItem>

            </Col>
            <Col span={8}>
              <Col span={12}>
                <FormItem
                    {...formItemLayout}
                    label="课程原价"
                >
                  {
                    getFieldDecorator('dollar', {
                      initialValue:entity.dollar
                    })(
                      <InputNumber disabled={this.props.form.getFieldValue('dollar_flag')==='false'||this.props.form.getFieldValue('dollar_flag')===false} precision={2} style={{width:'100%'}}/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span={12}>
                {discountType==='fix'&&
                <FormItem
                    {...formItemLayout}
                    label="折扣价"
                >
                  {
                    getFieldDecorator('dollar_d', {
                      initialValue: entity.dollar_d
                    })(
                      <InputNumber disabled={this.props.form.getFieldValue('dollar_flag')==='false'||this.props.form.getFieldValue('dollar_flag')===false} precision={2} style={{width:'100%'}}/>
                    )
                  }
                </FormItem>
                }
                {discountType==='discount'&&
                <FormItem
                    {...formItemLayout}
                    label="折扣比例"
                >
                  {
                    getFieldDecorator('dollar_d', {
                      initialValue: entity.dollar_d
                    })(
                      <InputNumber disabled={this.props.form.getFieldValue('dollar_flag')==='false'||this.props.form.getFieldValue('dollar_flag')===false} precision={2} style={{width:'100%'}}/>
                    )
                  }
                </FormItem>
                }
              </Col>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <FormItem
                {...formItemLayout}
              >
                {
                  getFieldDecorator('rmb_flag', {
                    initialValue: entity.rmb_flag
                  })(
                    <Checkbox >人民币</Checkbox>
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <Col span={12}>
                <FormItem
                    {...formItemLayout}
                    label="课程原价"
                >
                  {
                    getFieldDecorator('rmb', {
                      initialValue: entity.rmb
                    })(
                      <InputNumber disabled={this.props.form.getFieldValue('rmb_flag')==='false'||this.props.form.getFieldValue('rmb_flag')===false} precision={2} style={{width:'100%'}}/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span={12}>
                {discountType==='fix'&&
                <FormItem
                    {...formItemLayout}
                    label="折扣价"
                >
                  {
                    getFieldDecorator('rmb_d', {
                      initialValue: entity.rmb_d
                    })(
                      <InputNumber disabled={this.props.form.getFieldValue('rmb_flag')==='false'||this.props.form.getFieldValue('rmb_flag')===false} precision={2} style={{width:'100%'}}/>
                    )
                  }
                </FormItem>
                }
                {discountType==='discount'&&
                <FormItem
                    {...formItemLayout}
                    label="折扣比例"
                >
                  {
                    getFieldDecorator('rmb_d', {
                      initialValue: entity.rmb_d
                    })(
                      <InputNumber disabled={this.props.form.getFieldValue('rmb_flag')==='false'||this.props.form.getFieldValue('rmb_flag')===false} precision={2} style={{width:'100%'}}/>
                    )
                  }
                </FormItem>
                }
              </Col>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <FormItem
                {...formItemLayout}
              >
                {
                  getFieldDecorator('euro_flag', {
                    initialValue: entity.euro_flag
                  })(
                    <Checkbox>欧元</Checkbox>
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <Col span={12}>
                <FormItem
                    {...formItemLayout}
                    label="课程原价"
                >
                  {
                    getFieldDecorator('euro', {
                      initialValue: entity.euro
                    })(
                      <InputNumber disabled={this.props.form.getFieldValue('euro_flag')==='false'||this.props.form.getFieldValue('euro_flag')===false} precision={2} style={{width:'100%'}}/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span={12}>
                {discountType==='fix'&&
                <FormItem
                    {...formItemLayout}
                    label="折扣价"
                >
                  {
                    getFieldDecorator('euro_d', {
                      initialValue: entity.euro_d
                    })(
                      <InputNumber disabled={this.props.form.getFieldValue('euro_flag')==='false'||this.props.form.getFieldValue('euro_flag')===false} precision={2} style={{width:'100%'}}/>
                    )
                  }
                </FormItem>
                }
                {discountType==='discount'&&
                <FormItem
                    {...formItemLayout}
                    label="折扣比例"
                >
                  {
                    getFieldDecorator('euro_d', {
                      initialValue: entity.euro_d
                    })(
                      <InputNumber disabled={this.props.form.getFieldValue('euro_flag')==='false'||this.props.form.getFieldValue('euro_flag')===false} precision={2} style={{width:'100%'}}/>
                    )
                  }
                </FormItem>
                }
              </Col>
            </Col>
          </Row>

          {discountType!=='none'&&
          <Row>
            <Col offset={2} span={8}>
              <FormItem
                  {...timeLayout}
                  label="折扣时间"
              >
                {
                  getFieldDecorator('time', {
                    initialValue:entity.starttime&&[moment(entity.starttime*1000),moment(entity.endtime*1000)]
                  })(
                    <RangePicker showTime/>
                  )
                }
              </FormItem>
            </Col>

          </Row>
          }
          <Button type={'primary'} onClick={this.handleSubmit}>保存</Button>
        </Card>
      </Form>
    );
  }
}
export default Index;
