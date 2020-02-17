import {staticPath} from '@/config/default';
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
    key: 'picture',
    name: '主图',
    render:(v)=>{
      return (<img height={40} src={staticPath+v} alt=""/>);
    }
  },
  {
    key: 'name',
    name: '标题'
  },
  {
    key: 'applink',
    name: 'app内链接'
  },
  {
    key: 'time',
    name: '发布时间'
  },
  {
    key: 'lock',
    name: '状态',
    render:(v)=>{
      if(v==='true'){return '锁定';
      }else{
        return '不锁定';
      }
    }

  },
  {
    key: 'top',
    name: '是否置顶',
    render:(v)=>{
      if(v===0){return '置顶';
      }else{
        return '不置顶';
      }
    }
  }
];
export {
  searchFields,
  tableFields
};
