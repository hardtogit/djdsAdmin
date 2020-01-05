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
},{
  key:'a',
  name:'害羞年限',
  type:'enum',
  enums:{
    '1':'一年以内',
    '1-3':'1-3年',
    '3-5':'3-5年',
    '5-10':'5-10年',
    '10-15':'10年以上',
    '15-20':'15年以上',
    '20-30':'20年以上',
    '30-40':'30年以上',
    '40-120':'40年以上'
  }
},{
  key:'occupation',
  name:'职业'
},{
  key:'age',
  name:'年龄',
  type:'enum',
  enums:{
    '12-16':'12-16岁',
    '17-20':'17-20岁',
    '21-25':'21-25岁',
    '26-30':'26-30岁',
    '31-35':'31至35岁',
    '36-40':'36至40岁',
    '41-50':'40岁以上',
    '51-120':'50岁以上'
  }
}];
const tableFields = [
  {
    key: 'display_name',
    name: '昵称'
  },
  {
    key: 'phone',
    name: '联系电话'
  },
  {
    key: 'time',
    name: '注册时间'
  },
  {
    key: 'news',
    name: '所在区域'
  },{
    key:'shytime',
    name:'害羞年限'
  },{
    key:'age',
    name:'年龄'
  },{
    key:'occupation',
    name:'职业'
  },{
    key:'vip',
    name:'VIP'
  }
];
export {
  searchFields,
  tableFields
};
