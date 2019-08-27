import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImgCrop from 'antd-img-crop';
import {Upload,Icon} from 'antd';

class Index extends Component {
  static defaultProps={
    uploadProps:{
      name:'local_file',
      listType:'picture-card',
        accept:'image/jpg,image/jpeg,image/png',
      multiple:false,
      showUploadList:false,
      action:'http://www.freshfood.cn/cgi-bin/upload.pl',
      data:{proj:'yh_ga'},
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
        this.props.onChange(info.file.response.fid);
      }

    }
  };
  render() {
    const {fid,loading}=this.state;
    const {uploadProps,imgCropProps,crop=true}=this.props;
    const uploadBtn = (
      <div>
        <Icon type="plus" loading={loading}/>
        <div className="ant-upload-text">点击上传</div>
      </div>
    );
    return (
      <>
        {crop? <ImgCrop {...imgCropProps}>
          <Upload {...uploadProps}
              onChange={this.handleChange}
          >
            {fid? <img style={{maxHeight:'84px',maxWidth:'84px'}} src={`http://www.freshfood.cn/cgi-bin/download.pl?fid=${fid}&proj=yh_ga`} alt=""/>:uploadBtn}
          </Upload>
        </ImgCrop>:<Upload {...uploadProps}
            onChange={this.handleChange}
                   >
          {fid? <img style={{maxHeight:'84px',maxWidth:'84px'}} src={`http://www.freshfood.cn/cgi-bin/download.pl?fid=${fid}&proj=yh_ga`} alt=""/>:uploadBtn}
        </Upload>}

        </>

    );
  }
}

Index.propTypes = {
  uploadProps:PropTypes.object,
  ImgCrop:PropTypes.object
};

export default Index;
