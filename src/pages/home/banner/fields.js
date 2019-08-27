import React from 'react';
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
    key: 'fid',
    name: '缩略图',
    render:(v)=>{
      return (<img height={40} src={`http://www.freshfood.cn/cgi-bin/download.pl?fid=${v}&proj=yh_ga`} alt=""/>);
    }
  },
  {
    key: 'link',
    name: '链接'
  },
  {
    key: 'location',
    name: '设备类型'
  },
  {
    key: 'description',
    name: '描述'
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
