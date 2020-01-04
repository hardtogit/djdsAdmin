import React from 'react';
import {staticPath} from '@/config/default';
const searchFields=[
  {
    key: 'location',
    name: '设备类型',
    type:'enum',
    enums:{
      pc:'pc',
      wap:'wap'
    }
  },
  {
    key: 'status',
    name: '状态',
    type:'enum',
    enums:{
      生效:'生效',
      失效:'失效'
    }
  }
];
const tableFields = [
  {
    key: 'picture',
    name: '主图',
    render:(v)=>{
      return (<img height={40} src={staticPath+v} alt=""/>);
    }
  },
  {
    key: 'name',
    name: '标题'
  },
  {
    key: 'end_time',
    name: '到期时间'
  },
  {
    key: 'status',
    name: '状态'
  }
];
export {
  tableFields,
  searchFields
};
