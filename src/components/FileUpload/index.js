import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImgCrop from 'antd-img-crop';
import {Upload,Icon,Button} from 'antd';
// ws://47.52.252.181:51718/qsw
class Index extends Component {
  static defaultProps={
    uploadProps:{
      name:'local_file',
      accept:'image/jpg,image/jpeg,image/png',
      multiple:false,
      showUploadList:false,
      action:'http://47.103.2.159/cgi-bin/upload.pl',
      data:{proj:'hxz_ga'},
      headers:{ 'X-Requested-With': null , withCredentials: null}
    },
    imgCropProps:{
      modalWidth:800
    }
  }
  static getDerivedStateFromProps(nextProps){
    if('value' in nextProps){
      return {
        fid:nextProps.value
      };
    }
  }
  constructor(props) {
    super(props);
    this.state={
      fid:'',
      loading:false
    };
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        fid:info.file.response.fid,
        loading:false
      });
      if(this.props.onChange){
        console.log(info.file,'sssssssssssssssss');
        this.props.onChange(info.file.response.fid);
      }

    }
  };
  render() {
    const {fid,loading}=this.state;
    const {uploadProps,imgCropProps,crop=false}=this.props;
    const uploadBtn = (
      <Button>
        <Icon type="upload" /> 点击上传
      </Button>
    );
    return (
      <>
        <Upload {...uploadProps}
           onChange={this.handleChange}
        >
          {fid?<span ><Icon type="paper-clip" />{fid}</span>:uploadBtn}
        </Upload>

      </>

    );
  }
}

Index.propTypes = {
  uploadProps:PropTypes.object,
  ImgCrop:PropTypes.object
};

export default Index;
