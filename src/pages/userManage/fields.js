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
    key: 'display_name',
    name: '昵称'
  },
  {
    key: 'phone',
    name: '手机号'
  },
  {
    key: 'price',
    name: '注册时间'
  },
  {
    key: 'news',
    name: '是否允许发布资讯',
    render:(v)=>{
      if(v==='true'){
        return '允许';
      }
      return '不允许';
    }
  }
];
export {
  searchFields,
  tableFields
};
