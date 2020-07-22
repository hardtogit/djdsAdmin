import React, { Component } from 'react';
import {model} from '@/utils/portal';
import moment from 'moment';
import {Table,Divider,message} from 'antd';
import ListPage from '@/components/Page/listPage';
import {tableFields,searchFields} from './fields';
import  {SearchFormHook} from '@/components/SearchFormPro/search';
import TableUtils from '@/utils/table';
import Fetch from '@/utils/baseSever';


const createColumns=TableUtils.createColumns;
@model('orderManage')
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
    const extraFields = [];
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
    fetchList({...values,obj:'admin',act:'orderlist'});

  }
  render() {
    const {visible,entity}=this.state;
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
        fetchList({...this.searchParams,obj:'admin',act:'orderlist'});
      }
    };
    const addModalProps={
      onCancel:()=>this.setState({
        visible:false
      }),
      entity,
      onOk:(params)=> {
        if (this.state.type === 'add') {
          Fetch({ obj: 'admin', act: 'setgift', ...params,id: entity['_id'] }).then(
            () => {
              message.success('操作成功');
              fetchList({...this.searchParams,obj:'admin',act:'orderlist'});
              this.setState({
                visible: false
              });
            }
          );
        }else{
          Fetch({ obj: 'admin', act: 'personmodify', ...params,id:this.state.entity['_id'] }).then(
            () => {
              message.success('操作成功');
              fetchList({...this.searchParams,obj:'admin',act:'orderlist'});
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
          table={<Table {...tableProps}/>}
      />
    );
  }
}

export default Index;