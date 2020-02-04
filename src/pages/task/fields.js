import {TASK_TYPE} from '@/config/constants'
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
    key: 'name',
    name: '标题'
  },
  {
    key: 'content',
    name: '任务内容'
  },
  {
    key: 'frequence',
    name: '循环频率'
  },
  {
    key: 'link',
    name: '链接',
    render:(v)=>{
      return TASK_TYPE[v]
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
