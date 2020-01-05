import React, { Component } from 'react';
import {model} from '@/utils/portal';
import {Table,Divider,Modal,Button} from 'antd';
import ListPage from '@/components/Page/listPage';
import {tableFields,searchFields} from './fields';
import  {SearchFormHook} from '@/components/SearchFormPro/search';
import TableUtils from '@/utils/table';
import Fetch from '@/utils/baseSever';


const createColumns=TableUtils.createColumns;
@model('homeBanner')
class Index extends Component {
  constructor(props) {
    super(props);
    this.searchParams={};
  }
  getInitalColumns(fields) {
    const extraFields = [{
      key: 'operator',
      name: '操作',
      width: 200,
      render: (v, row) => (
        <>
          <a onClick={() => {
            Modal.confirm({
              title: '系统提示',
              content: '确定删除？',
              onOk: () => Fetch({ obj: 'admin', act: 'bannerdel', id: row['_id'] }).then(() => {
                this.props.fetchList({
                  ...this.searchParams, obj: 'admin',
                  act: 'bannerlist'
                });
              })
            });
          }}
          >删除</a>
          <Divider type="vertical"/>
          <a onClick={() => {
            this.props.push(`/banner/edit/${row['_id']}`);
          }}
          >修改</a>
        </>
      )
    }];
    return createColumns(fields).enhance(extraFields).values();
  }
  handleSearch=(values)=>{
    const {fetchList,goPage}=this.props;
    goPage('banners',1);
    this.searchParams=values;
    fetchList({...values, obj: 'admin',
      act: 'bannerlist',
      type:'home'});

  }
  render() {
    const {push,banners,loading,fetchList,goPage}=this.props;
    const searchProps={
      fields:searchFields,
      onSearch:this.handleSearch,
      btns:[{source:'add',title:'新增'}],
      handler:(source)=>{
        if(source==='add'){
          push('/banner/create');
        }
    }
    };
    const tableProps= {
      columns:this.getInitalColumns(tableFields),
      bordered:true,
      dataSource: banners.list,
      loading: loading.banners,
      pagination:push.pagination,
      onChange:({ current })=>{
        goPage('banners',current);
        fetchList({...this.searchParams, obj: 'admin',
          act: 'bannerlist',
          type:'home'});
      }
    };

    return (
      <>
        <Button type={'primary'} onClick={()=>this.props.push('/banner/create')}>新增</Button>
      <ListPage
          table={<Table {...tableProps}/>}
      />
      </>
    );
  }
}

export default Index;
