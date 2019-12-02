import {matchType} from '@/config/constants';
import moment from 'moment';
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
    name:'对阵',
    render:(v,row)=>{
      return `${row.match1}-${row.match2}`;
    }
  },
  {
    key: 'time',
    name: '比赛时间',
    render:(v,row)=>{
      return `${moment(row.starttime*1000).format('YYYY-MM-DD HH:mm:ss')}-${moment(row.endtime*1000).format('YYYY-MM-DD HH:mm:ss')}`;
    }
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
