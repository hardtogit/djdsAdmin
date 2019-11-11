import {matchType} from '@/config/constants';
const searchFields=[{
  key:'class',
  name:'类别',
  type:'enum',
  enums:{'':'全部',...matchType}
}];
const tableFields = [
  {
    key: 'class',
    name: '类别'
  },
  {
    key: 'scope',
    name: '赛事'
  },
  {
    key:'match',
    name:'对阵'
  },
  {
    key: 'time',
    name: '比赛时间'
  },
  {
    key: 'link',
    name: '直播间地址'
  }
];
export {
  searchFields,
  tableFields
};
