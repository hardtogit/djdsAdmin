import React, { Component } from 'react';
import AddModel from './addModel'
import { Modal, Form ,Input,Select,Table,Button,Divider} from 'antd';
import {model} from '@/utils/portal'
import ListPage from '@/components/Page/listPage'
import { searchFields, tableFields } from '@/pages/content/class/fields';
import Fetch from '@/utils/baseSever';
import { message } from 'antd/lib/index';
import TableUtils from '@/utils/table';

const createColumns=TableUtils.createColumns;
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
@model('classManage')
@Form.create()
class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      object:{}
    }
  }
  getInitalColumns(fields) {
    const extraFields = [{
      key: 'operator',
      name: '操作',
      width: 200,
      render: (text, record) => (
        <>
          <a
            disabled={record.cource==='false'}
            onClick={()=>{
              Fetch({
                obj:'admin',
                act:'courcetop',
                id:record['_id'],
                top:0
              }).then(()=>{
                this.props.fetchList({ obj: 'admin',
                  act: 'courcelist'});
              });

            }}
          >置顶</a>
          <Divider type="vertical" />
          <a
            disabled={record.cource==='false'}
            onClick={()=>{
              Fetch({
                obj:'admin',
                act:'courcetop',
                id:record['_id'],
                top:1
              }).then(()=>{
                this.props.fetchList({ obj: 'admin',
                  act: 'courcelist'});
              });
            }}
          >取消置顶</a>
          <br />
          <a
            disabled={record.cource==='true'}
            onClick={()=>{
              Fetch({
                obj:'admin',
                act:'courcelock',
                id:record['_id'],
                lock:'true'
              }).then(()=>{
                this.props.fetchList({ obj: 'admin',
                  act: 'courcelist'});
              });

            }}
          >设为锁定</a>
          <Divider type="vertical" />
          <a
            disabled={record.cource==='true'}
            onClick={()=>{
              Fetch({
                obj:'admin',
                act:'courcelock',
                id:record['_id'],
                lock:'false'
              }).then(()=>{
                this.props.fetchList({ obj: 'admin',
                  act: 'courcelist'});
              });

            }}
          >设为公开</a>
          <br />
          <a  onClick={()=>{
            this.setState({
              visible:true,
              object:record,
              type:'edit'
            });
          }}
          >修改</a>
          <Divider type="vertical" />
          <a  onClick={()=>{
            Modal.confirm({
              title:'系统提示',
              content:'确认删除该资讯',
              onOk:()=>{
                Fetch({
                  act:'admin',
                  obj:'courcedel',
                  id:record['_id']
                }).then(()=>{
                  message.success('删除成功');
                  this.props.fetchList({
                    ...this.searchParams,
                    act:'admin',
                    obj:'courcelist'
                  });
                });

              }
            });
          }}
          >删除</a>
        </>
      )
    }];
    return createColumns(fields).enhance(extraFields).values();
  }

  render() {
    const {visible,object}=this.state
    const { onCancel, form: { getFieldDecorator },entity ,onOk,type,subClass,loading,fetchSubList,goPage} = this.props;
    const modalProps = {
      title: '子课程管理',
      visible: true,
      width:1000,
      onCancel,
      footer:<> <Button type='primary' onClick={onCancel}>确定</Button> </>
    };
    const tableProps= {
      columns:this.getInitalColumns(tableFields),
      bordered:true,
      dataSource: subClass.list,
      loading: loading.subClass,
      pagination:subClass.pagination,
      onChange:({ current })=>{
        goPage({key:'subClass',current});
        fetchSubList({...this.searchParams,obj:'admin',act:'courcelist'});
      }
    };
    const addModalProps={
      onCancel:()=>this.setState({
        visible:false
      }),
      subtype:'subcource',
      entity:object,
      type,
      onOk:(params)=> {
        if (this.state.type === 'add') {
          Fetch({ obj: 'admin', act: 'courceadd', ...params ,cource_id:entity['_id']}).then(
            () => {
              message.success('操作成功');
              fetchSubList({cource_id:entity['_id'],obj:'admin',act:'courcelist'});
              this.setState({
                visible: false
              });
            }
          );
        }else{
          Fetch({ obj: 'admin', act: 'courcemodify', ...params,id:this.state.entity['_id'] }).then(
            () => {
              message.success('操作成功');
              fetchSubList({...this.searchParams,obj:'admin',act:'courcelist'});
              this.setState({
                visible: false
              });
            }
          );
        }
      }
    };
    return (
      <Modal {...modalProps} >
        <Button type={'primary'} onClick={()=>{this.setState({
          visible:true,
          object:{},
          type:'add'
        });}}
        >新增子课程</Button>
        <ListPage
          table={<Table {...tableProps}/>}
        >
          <a id="outFile" />
          {visible&&<AddModel {...addModalProps}/>}
        </ListPage>
      </Modal>
    );
  }
}

export default Index;
