import React, { Component } from 'react';
import {model} from '@/utils/portal';
import moment from 'moment';
import {Table,Divider,message,Button,Modal} from 'antd';
import ListPage from '@/components/Page/listPage';
import {tableFields,searchFields} from './fields';
import TableUtils from '@/utils/table';
import Fetch from '@/utils/baseSever';
import AddModal from './components/addModel';


const createColumns=TableUtils.createColumns;
@model('newsManage')
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
              disabled={record.news==='false'}
              onClick={()=>{
                  Fetch({
                    obj:'admin',
                    act:'newstop',
                    id:record['_id'],
                    top:0
                  }).then(()=>{
                    this.props.fetchList({ obj: 'admin',
                      act: 'newslist'});
                  });

                }}
          >置顶</a>
           <Divider type="vertical" />
           <a
               disabled={record.news==='false'}
               onClick={()=>{
               Fetch({
                 obj:'admin',
                 act:'newstop',
                 id:record['_id'],
                 top:1
               }).then(()=>{
                 this.props.fetchList({ obj: 'admin',
                   act: 'newslist'});
               });

             }}
           >取消置顶</a>
           <br />
           <a
               disabled={record.news==='true'}
               onClick={()=>{
                Fetch({
                  obj:'admin',
                  act:'newslock',
                  id:record['_id'],
                  lock:'true'
                }).then(()=>{
                  this.props.fetchList({ obj: 'admin',
                    act: 'newslist'});
                });

           }}
           >设为锁定</a>
           <Divider type="vertical" />
           <a
               disabled={record.news==='true'}
               onClick={()=>{
               Fetch({
                 obj:'admin',
                 act:'newslock',
                 id:record['_id'],
                 lock:'false'
               }).then(()=>{
                 this.props.fetchList({ obj: 'admin',
                   act: 'newslist'});
               });

             }}
           >设为公开</a>
           <br />
          <a  onClick={()=>{
            this.setState({
              visible:true,
              entity:record,
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
                   obj:'newsdel',
                   id:record['_id']
                 }).then(()=>{
                   message.success('删除成功');
                   this.props.fetchList({
                     ...this.searchParams,
                     act:'admin',
                     obj:'newslist'
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

  handleSearch=(values)=>{
    const {fetchList,goPage}=this.props;
    goPage({key:'person',current:1});
    if(values.time&&values.time.length){
      values.starttime=moment(values.time[0]).unix();
      values.endTime=moment(values.time[1]).unix();
      delete values.time;
    }
    this.searchParams=values;
    fetchList({...values,obj:'admin',act:'newslist'});

  }
  render() {
    const {visible,entity,type}=this.state;
    const {person,loading,fetchList,goPage}=this.props;
    const searchProps={
      fields:searchFields,
      onSearch:this.handleSearch
    };
    const tableProps= {
      columns:this.getInitalColumns(tableFields),
      bordered:true,
      dataSource: person.list,
      loading: loading.person,
      pagination:person.pagination,
      onChange:({ current })=>{
        goPage({key:'person',current});
        fetchList({...this.searchParams,obj:'admin',act:'newslist'});
      }
    };
    const addModalProps={
      onCancel:()=>this.setState({
        visible:false
      }),
      entity,
      type,
      onOk:(params)=> {
        if (this.state.type === 'add') {
          Fetch({ obj: 'admin', act: 'newsadd', ...params }).then(
            () => {
              message.success('操作成功');
              fetchList({...this.searchParams,obj:'admin',act:'newslist'});
              this.setState({
                visible: false
              });
            }
          );
        }else{
          Fetch({ obj: 'admin', act: 'newsmodify', ...params,id:this.state.entity['_id'] }).then(
            () => {
              message.success('操作成功');
              fetchList({...this.searchParams,obj:'admin',act:'newslist'});
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
        <Button type={'primary'} onClick={()=>{this.setState({
          visible:true,
          type:'add'
        });}}
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