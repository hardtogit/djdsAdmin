import React, { Component } from 'react';
import { model } from '@/utils/portal';
import moment from 'moment';
import { Table } from 'antd';
import ListPage from '@/components/Page/listPage';
import { tableFields } from './fields';
import TableUtils from '@/utils/table';

const createColumns = TableUtils.createColumns;

@model('withdrawManage')
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      entity: {},
      type: 'add'
    };
    this.searchParams = {};
  }

  getInitalColumns(fields) {
    const extraFields = [];
    return createColumns(fields).enhance(extraFields).values();
  }
  render() {

    const { withdraw, loading, fetchList, goPage } = this.props;
    console.log(withdraw, 'aaaaaaccccc');

    const tableProps = {
      columns: this.getInitalColumns(tableFields),
      rowKey: 'id',
      bordered: true,
      dataSource: withdraw.list,
      loading: loading.withdraw,
      pagination: withdraw.pagination,
      onChange: ({ current }) => {
        goPage({ key: 'withdraw', current });
        fetchList({ ...this.searchParams, obj: 'admin', act: 'withdrawlist' });
      }
    };
    return (
      <ListPage
        table={<Table {...tableProps}/>}
      >
        <a id="outFile"/>
      </ListPage>
    );
  }
}

export default Index;
