// import React from 'react';
import {matchType,matchClass } from '@/config/constants';
const searchFields=[{
  key:'class',
  name:'球类',
  type:'enum',
  enums:matchType
},{
  key:'class',
  name:'赛别',
  type:'enum',
  enums:matchClass
}
];
const tableFields = [
  {
    key: 'class',
    name: '球类'
  },
  {
    key: 'scope',
    name: '赛别',
  },
  {
    key: 'area',
    name: '区域'
  },
  {
    key: 'name',
    name: '球队名称'
  },
  {
    key: 'goal',
    name: '胜负平'
  },
  {
    key: 'gold',
    name: '积分/胜负差/场均分'
  }
];
export {
  searchFields,
  tableFields
};
