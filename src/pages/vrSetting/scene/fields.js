import { staticPath } from '@/config/default';
import React from 'react';

const searchFields=[{
  key:'display_name',
  name:'昵称'
},{
  key:'phone',
  name:'手机号'
},{
  key:'time',
  name:'注册时间',
  type:'dateRange'
}];
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
    key: 'lock',
    name: '状态',
    render:(v)=>{
      if(v==='false'){
        return '公开'
      }
      return '锁定'
    }
  },{
    key:'location',
    name:'位置'
  }
];
export {
  searchFields,
  tableFields
};
