const searchFields=[{
  key:'name',
  name:'姓名'
},{
  key:'phone',
  name:'电话'
},{
  key:'seller',
  name:'商家名称'
},{
  key:'time',
  name:'下单时间',
  type:'date'
}];
const tableFields = [
  {
    key: 'order_id',
    name: '订单编号'
  },
  {
    key: 'name',
    name: '姓名'
  },
  {
    key: 'gender',
    name: '性别'
  },
  {
    key: 'phone',
    name: '电话号码'
  },
  {
    key: 'total_payments',
    name: '商品金额'
  },
  {
    key: 'time',
    name: '下单时间'
  },
  {
    key: 'seller',
    name: '商家名称'
  },
  {
    key: 'address',
    name: '快递地址'
  },
  {
    key: 'comment',
    name: '备注'
  }
];
const fieldsMapping={
  'order_id': '订单号',
  'name': '姓名',
  'gender': '性别',
  'phone': '电话号码',
  'total_payments': '商品金额',
  'time': '下单时间',
  'seller': '商家名称',
  'address': '快递地址',
  'comment': '备注',
  'products':'订单详情'
};
export {
  searchFields,
  tableFields,
  fieldsMapping
};
