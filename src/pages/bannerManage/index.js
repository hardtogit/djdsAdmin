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
@model('bannersManage')
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
                Fetch({obj:'admin',act:'bannerdel',id:record['_id']}).then(()=>{
                  this.props.fetchList({...this.searchParams,obj:'admin',act:'bannerlist'});
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
    goPage({key:'banner',current:1});
    if(values.time&&values.time.length){
      values.starttime=moment(values.time[0]).unix();
      values.endTime=moment(values.time[1]).unix();
      delete values.time;
    }
    this.searchParams=values;
    fetchList({...values,obj:'admin',act:'bannerlist'});

  }
  render() {
    const {visible,entity,type}=this.state;
    const {banner,loading,fetchList,goPage}=this.props;
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
      dataSource: banner.list,
      loading: loading.banner,
      pagination:banner.pagination,
      onChange:({ current })=>{
        goPage({key:'banner',current});
        fetchList({...this.searchParams,obj:'admin',act:'bannerlist'});
      }
    };
    const addModalProps={
      onCancel:()=>this.setState({
        visible:false
      }),
      type,
      entity,
      onOk:(params)=> {
        if (this.state.type === 'add') {
          Fetch({ obj: 'admin', act: 'banneradd', ...params }).then(
            () => {
              message.success('操作成功');
              fetchList({...this.searchParams,obj:'admin',act:'bannerlist'});
              this.setState({
                visible: false
              });
            }
          );
        }else{
          Fetch({ obj: 'admin', act: 'bannermodify', ...params,id:this.state.entity['_id'] }).then(
            () => {
              message.success('操作成功');
              fetchList({...this.searchParams,obj:'admin',act:'bannerlist'});
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
        <a id="outFile" />
        {visible&&<AddModal {...addModalProps}/>}
      </ListPage>
    );
  }
}

export default Index;
