import React, { Component } from 'react';
import {model} from '@/utils/portal';
import moment from 'moment';
import {Table,Divider,message,Modal,Button} from 'antd';
import ListPage from '@/components/Page/listPage';
import {tableFields} from './fields';
import TableUtils from '@/utils/table';
import Fetch from '@/utils/baseSever';
import AddModal from './components/addModel';


const createColumns=TableUtils.createColumns;
@model('taskManage')
class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      entity:{},
      type:'add'
    };
    this.searchParams={};
  }
  getInitalColumns(fields) {
    const extraFields = [{
      key: 'operator',
      name: '操作',
      width: 200,
      render: (text, record) => (
         <>
           <a
               onClick={()=>{
                 Modal.confirm({
                   title:'系统提示',
                   content:'确定删除该任务？',
                   onOk:()=>{
                     Fetch({
                       obj:'admin',
                       act:'taskdel',
                       id:record['_id']
                     }).then(()=>{
                       message.success('删除成功');
                       this.props.fetchList({obj:'admin',act:'tasklist'});
                     });
                   }
                 });
           }}
           >删除</a>
           <Divider type="vertical" />
          <a  onClick={()=>{
            this.setState({
              visible:true,
              type:'edit',
              entity:record
            });
          }}
          >修改</a>
      </>
      )
    }];
    return createColumns(fields).enhance(extraFields).values();
  }

  handleSearch=(values)=>{
    const {fetchList,goPage}=this.props;
    goPage({key:'person',current:1});
    if(values.time&&values.time.length){
      values.starttime=moment(values.time[0]).unix();
      values.endTime=moment(values.time[1]).unix();
      delete values.time;
    }
    this.searchParams=values;
    fetchList({...values,obj:'admin',act:'tasklist'});

  }
  render() {
    const {visible,entity}=this.state;
    const {person,loading,fetchList,goPage}=this.props;
    const tableProps= {
      columns:this.getInitalColumns(tableFields),
      bordered:true,
      dataSource: person.list,
      loading: loading.person,
      pagination:person.pagination,
      onChange:({ current })=>{
        goPage({key:'person',current});
        fetchList({...this.searchParams,obj:'admin',act:'tasklist'});
      }
    };
    const addModalProps={
      onCancel:()=>this.setState({
        visible:false
      }),
      type:this.state.type,
      entity,
      onOk:(params)=> {
        if (this.state.type === 'add') {
          Fetch({ obj: 'admin', act: 'taskadd', ...params}).then(
            () => {
              message.success('操作成功');
              fetchList({...this.searchParams,obj:'admin',act:'tasklist'});
              this.setState({
                visible: false
              });
            }
          );
        }else{
          Fetch({ obj: 'admin', act: 'taskmodify', ...params,id:this.state.entity['_id'] }).then(
            () => {
              message.success('操作成功');
              fetchList({...this.searchParams,obj:'admin',act:'tasklist'});
              this.setState({
                visible: false
              });
            }
          );
        }
      }
    };
    return (
      <>
        <Button type={'primary'} onClick={()=>{
          this.setState({
            visible:true,
            type:'add'
          });
        }}
        >新增</Button>
      <ListPage
          table={<Table {...tableProps}/>}
      >
        <a id="outFile" />
        {visible&&<AddModal {...addModalProps}/>}
      </ListPage>
      </>
    );
  }
}

export default Index;
