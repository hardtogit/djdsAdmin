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
      title: '新增商品',
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
          <Form.Item label="礼物">
            {getFieldDecorator('giftid', {
              initialValue:entity.giftid
            })(
              <Select>
                {this.state.dataSource.map((item)=>(<Option key={item['_id']}
                    value={item['_id']}
                                                    >{item.name}</Option>))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="数量">
            {getFieldDecorator('number', {
              initialValue:entity.number
            })(
              <Input/>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Index;
