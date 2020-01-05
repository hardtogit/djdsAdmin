const searchFields=[{
  key:'time',
  name:'交易时间',
  type:'dateRange'
},{
  key:'phone',
  name:'交易渠道',
  type:'enum',
  enums:{
    '':'全部',
    '微信':'微信',
    '支付宝':'支付宝',
    '银行卡':'银行卡'
  }
}
];
const tableFields = [
  {
    key: 'display_name',
    name: '用户名'
  },
  {
    key: 'phone',
    name: '联系电话'
  },
  {
    key: 'time',
    name: '交易时间'
  },
  {
    key: 'pay',
    name: '交易金额'
  },{
    key:'pay_way',
    name:'交易渠道'
  }
];
export {
  searchFields,
  tableFields
};
