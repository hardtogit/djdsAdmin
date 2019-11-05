import React, { Component } from 'react';
import moment from 'moment';
import {model} from '@/utils/portal';
import {Table,message,Modal} from 'antd';
import ListPage from '@/components/Page/listPage';
import {tableFields,searchFields,fieldsMapping} from './fields';
import  {SearchFormHook} from '@/components/SearchFormPro/search';
import TableUtils from '@/utils/table';
import Fetch from '@/utils/baseSever';
import {downloadFile} from '@/utils/exportExcel';
import AddModal from './components/addModel';


const createColumns=TableUtils.createColumns;
@model('orderManage')
class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      goods:[]
    };
    this.searchParams={};
  }
  componentDidMount() {

  }
  downExcel=()=>{
    Fetch({
      ...this.searchParams,
      obj:'admin',act:'orderexport'
    }).then((response)=>{
      if(response.info.length===0){
        Modal.warning({
          title:'系统提示',
          content:'没有数据...'
        });
        return;
      }
      const arr=[];
      response.info.forEach((good)=>{
        const obj={};
        Object.keys(good).forEach((key)=>{
          if(fieldsMapping[key]){
            if(key==='products'){
              const arr= good[key].reduce((total,item)=>{return [...total,`商品名称：${item.goodsname}，购买数量：${item.num}，商品编号：${item.serialnum}`];},[]);
              obj[fieldsMapping[key]]=arr.join('；');
            }else{
              obj[fieldsMapping[key]]=good[key];
            }

          }
        });
        arr.push(obj);
      });
      downloadFile(arr,'订单数据',document.getElementById('outFile'));
    });
  }
  getInitalColumns=(fields)=> {
    const extraFields = [{
      key: 'operator',
      name: '操作',
      width: 100,
      render: (text, record) => (
         <>
          <a  onClick={()=>{
            this.setState({
              visible:true,
              goods:record.products
            });
          }}
          >查看</a>
      </>
      )
    }];
    return createColumns(fields).enhance(extraFields).values();
  }



  handleSearch=(values)=>{
    if(values.time){
      values.time=moment(values.time).unix();
    }
    const {fetchList,goPage}=this.props;
    goPage({key:'orders',current:1});
    this.searchParams=values;
    fetchList({...values,obj:'admin',act:'orderlist'});

  }
  render() {
    const {visible,goods}=this.state;
    const {orders,loading,fetchList,goPage}=this.props;
    const searchProps={
      fields:searchFields,
      onSearch:this.handleSearch,
      btns:[{source:'exp',title:'导出'}],
      handler:(source)=>{
        if(source==='add'){
          this.setState({
            visible:true,
            entity:{},
            type:'add'
          });
        }
        if(source==='exp'){
          this.downExcel();
        }
    }
    };
    const tableProps= {
      columns:this.getInitalColumns(tableFields),
      bordered:true,
      rowKey:'_id',
      dataSource: orders.list,
      loading: loading.goods,
      pagination:orders.pagination,
      onChange:({ current })=>{
        goPage({key:'orders',current});
        fetchList({...this.searchParams,obj:'admin',act:'orderlist'});
      }
    };
    const addModalProps={
      onCancel:()=>this.setState({
        visible:false
      }),
      goods,
      onOk:(params)=> {
        if (this.state.type === 'add') {
          Fetch({ obj: 'admin', act: 'goodsadd', ...params }).then(
            () => {
              message.success('操作成功');
              fetchList({...this.searchParams,obj:'admin',act:'orderlist'});
              this.setState({
                visible: false
              });
            }
          );
        }else{
          Fetch({ obj: 'admin', act: 'goodsmodify', ...params,id:this.state.entity['_id'] }).then(
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
      >
        <a id="outFile" />
        {visible&&<AddModal {...addModalProps}/>}
      </ListPage>
    );
  }
}

export default Index;
