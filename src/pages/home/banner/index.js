import React, { Component } from 'react';
import {model} from '@/utils/portal';
import {Table,Divider,Modal} from 'antd';
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
                content: '确定生效？',
                onOk: () => Fetch({ obj: 'admin', act: 'bannerset', status: '生效', id: row['_id'] }).then(() => {
                  this.props.fetchList({
                    ...this.searchParams, obj: 'admin',
                    act: 'bannerlist',
                    type: 'home'
                  });
                })
              }
            );
          }}
          >生效</a>
          <Divider type="vertical"/>
          <a onClick={() => {
            Modal.confirm({
              title: '系统提示',
              content: '确定失效？',
              onOk: () => Fetch({ obj: 'admin', act: 'bannerset', status: '失效', id: row['_id'] }).then(() => {
                this.props.fetchList({
                  ...this.searchParams, obj: 'admin',
                  act: 'bannerlist',
                  type: 'home'
                });
              })
            });
          }}
          >失效</a>
          <Divider type="vertical"/>
          <a onClick={() => {
            this.props.push(`/home/banner/edit/${row['_id']}`);
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
          push('/home/banner/create');
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
      <ListPage
          searchBar={<SearchFormHook {...searchProps}/>}
          table={<Table {...tableProps}/>}
      />
    );
  }
}

export default Index;
