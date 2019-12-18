import React, { Component } from 'react';
import {model} from '@/utils/portal';
import moment from 'moment';
import {Table,Divider,message,Modal} from 'antd';
import ListPage from '@/components/Page/listPage';
import {tableFields,searchFields} from './fields';
import  {SearchFormHook} from '@/components/SearchFormPro/search';
import TableUtils from '@/utils/table';
import Fetch from '@/utils/baseSever';
import AddModal from './components/addModel';


const createColumns=TableUtils.createColumns;
@model('personManage')
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
              disabled={record.buy==='是'}
              onClick={()=>{
            this.setState({
              visible:true,
              entity:record
            });
          }}
          >设置试用期</a>
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
    fetchList({...values,obj:'admin',act:'personlist'});

  }
  render() {
    const {visible,entity}=this.state;
    const {person,loading,fetchList,goPage,listResponse}=this.props;
    const searchProps={
      fields:searchFields,
      onSearch:this.handleSearch
    };
    const tableProps= {
      columns:this.getInitalColumns(tableFields),
      rowKey:'id',
      bordered:true,
      dataSource: person.list,
      loading: loading.person,
      pagination:person.pagination,
      onChange:({ current })=>{
        goPage({key:'person',current});
        fetchList({...this.searchParams,obj:'admin',act:'personlist'});
      }
    };
    const addModalProps={
      onCancel:()=>this.setState({
        visible:false
      }),
      entity,
      onOk:(params)=> {
        if (this.state.type === 'add') {
          Fetch({ obj: 'admin', act: 'setpersonusetime', ...params,id: entity.id }).then(
            () => {
              message.success('操作成功');
              fetchList({...this.searchParams,obj:'admin',act:'personlist'});
              this.setState({
                visible: false
              });
            }
          );
        }
      }
    };
    return (
      <ListPage
          searchBar={<SearchFormHook {...searchProps}/>}
          bar={
            <div style={{marginTop:'20px'}}>
              <span style={{marginRight:'20px'}}>注册人数：{listResponse.register}人</span>
              <span style={{marginRight:'20px'}}>缴费人数：{listResponse.buy}人</span>
              <span style={{marginRight:'20px'}}>注册总数：{listResponse.allregister}人</span>
              <span style={{marginRight:'20px'}}>缴费总数：{listResponse.allbuy}人</span>
            </div>
          }
          table={<Table {...tableProps}/>}
      >
        <a id="outFile" />
        {visible&&<AddModal {...addModalProps}/>}
      </ListPage>
    );
  }
}

export default Index;
