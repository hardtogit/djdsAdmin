const searchFields = [{
  key: 'time',
  name: '选择时间',
  type: 'dateRange'
}];


const tableFields = [
  {
    key: 'realname',
    name: '姓名'
  }, {
    key: 'money',
    name: '可提现余额'
  },
  {
    key: 'bank_name',
    name: '银行名称'
  },
  {
    key: 'kaihu_bank',
    name: '开户行'
  },
  {
    key: 'number',
    name: '卡号'

  },
  {
    key: 'value',
    name: '变动金额'
  }, {
    key: 'trade_type',
    name: '类型'
  },
  {
    key: 'trade_remark',
    name: '备注'

  }, {
    key: 'time',
    name: '时间'
  }, {
    key: 'status',
    name: '状态'
  }

];
export {
  searchFields,
  tableFields
};
