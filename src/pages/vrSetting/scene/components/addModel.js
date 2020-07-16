import React, { Component } from 'react';
import UploadImg from '@/components/UploadImg';
import FileUpload from '@/components/FileUpload';
import Fetch from '@/utils/baseSever'
import { Modal, Form ,Input,Select,Radio,InputNumber} from 'antd';


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
      mediaList:[]
    }
    this.vrname=''
  }
  componentDidMount(){
    Fetch({
      obj: 'admin',
      act: 'vrmedialist',
      page_size:10000
    }).then((data)=>{
      this.setState({
        mediaList:data.info.records
      })
    })
  }
  handleSelect=(info)=>{
    this.vrname=info.name
  }
  render() {
    const {mediaList}=this.state
    const { onCancel, form: { getFieldDecorator },entity ,onOk,type} = this.props;
    const modalProps = {
      title: type==='add'?'新增VR场景配置':'修改VR场景配置',
      visible: true,
      width:680,
      onCancel,
      onOk: () => {
        this.props.form.validateFields((error,values)=>{
          values.vrname=this.vrname||entity.vrname
          console.log(values)
          if(!error){
            onOk(values);
          }
        });
      }
    };
    return (
      <Modal {...modalProps} >
        <Form {...formItemLayout}>
          <Form.Item
              label="主图"
          >
            {
              getFieldDecorator('picture',{
                initialValue:entity.picture,
                rules:[
                  {required:true,message:'请选择主图'}
                ]

              })(
                <UploadImg />
              )
            }
          </Form.Item>
          <Form.Item label="标题">
            {getFieldDecorator('name', {
              initialValue:entity.name,
              rules:[{required:true,message:'请填写标题'}]
            })(
              <Input/>
            )}
          </Form.Item>

          <Form.Item label="关键词">
            {getFieldDecorator('keyword', {
              initialValue:entity.keyword
            })(
              <Select>
                <Option value="RestaurantToilet">RestaurantToilet</Option>
                <Option value="SchoolToilet">SchoolToilet</Option>
                <Option value="OfficeToilet">OfficeToilet</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="VR训练">
            {getFieldDecorator('vrfid', {
              initialValue:entity.vrfid
            })(
              <FileUpload onSelect={this.handleSelect}/>
            )}
          </Form.Item>
          <Form.Item label="状态">
            {getFieldDecorator('lock', {
              initialValue:entity.lock
            })(
              <Select>
                <Option value="false">公开</Option>
                <Option value="true">锁定</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label="多媒体">
            {getFieldDecorator('vrmedia', {
              initialValue:entity.vrmedia
            })(
              <Select mode='multiple'>
                {mediaList.map((item)=>{
                  return <Option key={item._id} value={item._id} >
                    {item.name}
                  </Option>
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="位置">
            {getFieldDecorator('location', {
              initialValue:entity.location
            })(
              <InputNumber precision={0}/>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Index;
