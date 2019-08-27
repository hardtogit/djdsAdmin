import React, { Component } from 'react';
import {model} from '@/utils/portal';
import {Table,Divider,message,Modal} from 'antd';
import ListPage from '@/components/Page/listPage';
import {tableFields,searchFields} from './fields';
import  {SearchFormHook} from '@/components/SearchFormPro/search';
import TableUtils from '@/utils/table';
import Fetch from '@/utils/baseSever';
import AddModal from './components/addModel';


const createColumns=TableUtils.createColumns;
@model('homePartner')
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
          <a  onClick={()=>{
            this.setState({
              visible:true,
              entity:record,
              type:'edit'
            });
          }}
          >修改</a>
           <Divider type="vertical" />
          <a  onClick={()=>
            Modal.confirm({
              title:'系统提示',
              content:'确认删除？',
              onOk:()=>{
                Fetch({obj:'admin',act:'homepartnerdel',id:record['_id']}).then(()=>{
                  this.props.fetchList({...this.searchParams,obj:'admin',act:'homepartnerlist'});
                });
              }
            })
          }
          >删除</a>
      </>
      )
    }];
    return createColumns(fields).enhance(extraFields).values();
  }
  handleSearch=(values)=>{
    const {fetchList,goPage}=this.props;
    goPage('partners',1);
    this.searchParams=values;
    fetchList({...values,obj:'admin',act:'homepartnerlist'});

  }
  render() {
    const {visible,entity}=this.state;
    const {partners,loading,fetchList,goPage}=this.props;
    const searchProps={
      fields:searchFields,
      onSearch:this.handleSearch,
      btns:[{source:'add',title:'新增'}],
      handler:(source)=>{
        if(source==='add'){
          this.setState({
            visible:true,
            entity:{},
            type:'add'
          });
        }
    }
    };
    const tableProps= {
      columns:this.getInitalColumns(tableFields),
      bordered:true,
      dataSource: partners.list,
      loading: loading.partners,
      pagination:partners.pagination,
      onChange:({ current })=>{
        goPage('partners',current);
        fetchList({...this.searchParams,obj:'admin',act:'homepartnerlist'});
      }
    };
    const addModalProps={
      onCancel:()=>this.setState({
        visible:false
      }),
      entity,
      onOk:(params)=> {
        if (this.state.type === 'add') {
          Fetch({ obj: 'admin', act: 'homepartneradd', ...params }).then(
            () => {
              message.success('操作成功');
              fetchList({...this.searchParams,obj:'admin',act:'homepartnerlist'});
              this.setState({
                visible: false
              });
            }
          );
        }else{
          Fetch({ obj: 'admin', act: 'homepartnermodify', ...params,id:this.state.entity['_id'] }).then(
            () => {
              message.success('操作成功');
              fetchList({...this.searchParams,obj:'admin',act:'homepartnerlist'});
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
      >
        {visible&&<AddModal {...addModalProps}/>}
      </ListPage>
    );
  }
}

export default Index;
