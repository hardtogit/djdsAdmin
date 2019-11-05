import React, { Component } from 'react';
import TableUtils from '@/utils/table';
import {tableFields} from './fields';
import { Modal ,Table,Button} from 'antd';

const {createColumns}=TableUtils;
class Index extends Component {
  render() {
    const { goods,onCancel} = this.props;
    const modalProps = {
      title: '订单详情',
      visible: true,
      width:680,
      onCancel:onCancel,
      footer:<Button onClick={onCancel} type="primary">确定</Button>
    };
    const tableProps={
      columns:createColumns(tableFields).values(),
      bordered:true,
      dataSource: goods,
      pagination:false
    };
    return (
      <Modal {...modalProps} >
        <Table {...tableProps}/>
      </Modal>
    );
  }
}

export default Index;
