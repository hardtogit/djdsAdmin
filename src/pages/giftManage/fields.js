import React from 'react';
const searchFields=[{
  key:'name',
  name:'标题'
}];
const tableFields = [
  {
    key: 'picture',
    name: '缩略图',
    render:(v)=>{
      return <img style={{height:'40px'}} src={`http://47.52.252.181/cgi-bin/download.pl?fid=${v}&proj=qsw`} alt=""/>;
    }
  },
  {
    key: 'name',
    name: '标题'
  },
  {
    key: 'money',
    name: '金额'
  }
];
export {
  searchFields,
  tableFields
};
