import {informationType} from '@/config/constants';
const searchFields=[{
  key:'title',
  name:'标题'
},{
  key:'classfly',
  name:'分类',
  type:'enum',
  enums:{'':'全部',...informationType}
},{
  key:'time',
  name:'创建时间',
  type:'dateRange'
}];
const tableFields = [
  {
    key: 'name',
    name: '标题'
  },
  {
    key: 'class',
    name: '分类'
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
