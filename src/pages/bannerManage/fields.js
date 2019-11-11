import React from 'react';
const searchFields=[{
  key:'name',
  name:'标题'
},{
  key:'time',
  name:'创建时间',
  type:'dateRange'
}];
const tableFields = [
  {
    key: 'picture',
    name: '缩略图',
    render:(v)=>{
      return <img src={`http://47.52.252.181/cgi-bin/download.pl?fid=${v}&proj=qsw`} alt=""/>;
    }
  },
  {
    key: 'name',
    name: '标题'
  },
  {
    key: 'time',
    name: '创建时间'
  }
];
export {
  searchFields,
  tableFields
};
