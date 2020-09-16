import React, { Component } from 'react';
import {model} from '@/utils/portal';
import moment from 'moment';
import {Table,Divider,message,Modal} from 'antd';
import ListPage from '@/components/Page/listPage';
import {tableFields} from './fields';
import TableUtils from '@/utils/table';
import Fetch from '@/utils/baseSever';
import AddModal  from './components/addModel';
const createColumns=TableUtils.createColumns;
@model('feedBack')
class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      entity:{},
      type:'add'
    };
    this.searchParams={};
  }
  getInitalColumns(fields) {
    const extraFields = [{
      name:'操作',
      render:(v,row)=>{
        return (
          <div>
            <a onClick={() => {this.setState({entity:row,visible:true});}}>回复</a>
            <Divider type={'vertical'}/>
            <a onClick={() => {
              Fetch({
                obj: 'person',
                act: 'feedbackresponsedetail',
                feedback_id:row.feedback_id
              }).then((data)=>{
                if(data.data.feedbackresponse_txt){
                  Modal.info({
                    title:'回复内容',
                    content:data.data.feedbackresponse_txt
                  });
                }else{
                  message.info('没有回复内容');
                }

              });
            }}
            >查看回复</a>
            <div/>
          </div>

        );
          }
          }];
          return createColumns(fields).enhance(extraFields).values();
  }
  handleSearch=(values)=>{
    const {fetchList,goPage}=this.props;
    goPage({key:'person',current:1});
    if(values.time&&values.time.length){
      values.starttime=moment(values.time[0]).unix();
      values.endTime=moment(values.time[1]).unix();
      delete values.time;
    }
    this.searchParams=values;
    fetchList({...values,obj:'person',act:'feedbacklist'});
  }
  render() {
    const {visible,entity}=this.state;
    const {person,loading,fetchList,goPage}=this.props;
    const tableProps= {
      columns:this.getInitalColumns(tableFields),
      bordered:true,
      dataSource: person.list,
      loading: loading.person,
      pagination:person.pagination,
      onChange:({ current })=>{
        goPage({key:'person',current});
        fetchList({...this.searchParams,obj:'person',act:'feedbacklist'});
      }
    };
    const addModalProps={
      onCancel:()=>this.setState({
        visible:false
      }),
      entity,
      onOk:(params)=> {
        if (this.state.type === 'add') {
            Fetch({
              obj: 'person',
              act: 'feedbackresponse',
              ...params,
              feedback_id:entity.feedback_id
            }).then((data)=>{
              message.success('提交成功');
              this.setState({
                visible: false
              });
            });
        }else{

        }
      }
    };
    return (
      <ListPage
          table={<Table {...tableProps}/>}
      >
        {visible&& <AddModal {...addModalProps}/>}

      </ListPage>
    );
  }
}

export default Index;
