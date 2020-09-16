import {staticPath} from '@/config/default';
const searchFields=[{
  key:'display_name',
  name:'用户名'
},{
  key:'feedback_txt',
  name:'建议内容'
}
];
const tableFields = [
  {
    key: 'feedback_txt',
    name: '建议内容'
  },
  {
    key: 'feedback_file',
    name: '附件',
    render:(v)=>{
      return <img style={{height:'40px'}} onClick={()=>window.open(staticPath+v,'_blank')} src={staticPath+v} alt=""/>;
    }
  },
  {
    key: 'et',
    name: '时间'
  },
  {
    key: 'feedback_contact',
    name: '联系方式'
  }
];
export {
  searchFields,
  tableFields
};
