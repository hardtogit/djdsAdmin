import React from 'react';
import { message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
/*
 * Custom "star" icon for the toolbar using an Octicon
 * https://octicons.github.io
 */

/* eslint-disable */
const CustomButton = () => <span className="octicon octicon-star" />;

/*
 * Event handler to be attached using Quill toolbar module (see line 73)
 * https://quilljs.com/docs/modules/toolbar/
 */
function insertStar() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, '★');
  this.quill.setSelection(cursorPosition + 1);
}
function image() {
  const $this = this;
  let fileInput = this.quill.container.querySelector('input.ql-image[type=file]');
  if (fileInput == null) {
    fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    fileInput.classList.add('ql-image');
    fileInput.addEventListener('change', () => {
      if (fileInput.files != null && fileInput.files[0] != null) {
        const param = { local_file: fileInput.files[0] };
        console.log(fileInput.files[0]);
        if (fileInput.files[0].size > 1024 * 1024 * 1) {
          message.warn('图片大小不能超过1M');
          return;
        }
        let params =new FormData();
          params.append('local_file',fileInput.files[0]);
          params.append('proj','yh_ga');

          fetch('http://www.freshfood.cn/cgi-bin/upload.pl', {
            method: 'POST',
            body: params
          }).then(response => response.json())
            .then((data) => {
              console.log(data);
              const path =`http://www.freshfood.cn/cgi-bin/download.pl?fid=${data.fid}&proj=yh_ga`;
              // const path = data[0].url;
              // // getSelection 选择当前光标位置咯 然后在下一个range.index用它自带的embed媒介插入方式插入你已经存储在阿里上的图片了
              const range = $this.quill.getSelection(true);
              $this.quill.insertEmbed(range.index, 'image', path);
              $this.quill.setSelection(range.index + 1);
            });
        };

    });
    this.container.appendChild(fileInput);
  }
  fileInput.click();
}

const CustomToolbar = () => (
  <div id="toolbar" style={{lineHeight:'normal'}}>
    <select className="ql-header" defaultValue="" onChange={e => e.persist()}>
      <option value="1" />
      <option value="2" />
      <option value="3" />
      <option value="4" />
      <option selected />
    </select>
    <select className="ql-font" defaultValue="Sans Serif">
      <option value="Sans Serif" />
      <option value="serif" />
      <option value="monospace" />
    </select>
    <select className="ql-align">
      <option value="" />
      <option value="right" />
      <option value="center" />
      <option value="justify" />
    </select>
    <button type="button" className="ql-bold" />
    <button type="button" className="ql-italic" />
    <button type="button" className="ql-strike" />
    <select type="button" className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option selected />
    </select>
    <button type="button" className="ql-image" />
    <button type="button" className="ql-link" />
    <button type="button" className="ql-list" value="ordered" />
    <button type="button" className="ql-list" value="bullet" />
    <button type="button" className="ql-insertSta">
      <CustomButton />
    </button>
  </div>
);

/*
 * Editor component with custom toolbar and content containers
 */
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const { value } = nextProps;
      this.setState({ value });
    }
  }

  handleChange(html) {
    this.setState({ value: html });
    const { onChange } = this.props;
    if (onChange) {
      onChange(html);
    }
  }

  render() {
    const { placeholder } = this.props;
    const { value } = this.state;
    return (
      <div className="text-editor" style={{ height: '360px' }}>
        <CustomToolbar />
        <ReactQuill
            {...this.props}
            value={value}
            style={{ height: '318px' }}
            onChange={this.handleChange}
            placeholder={placeholder}
            modules={Editor.modules}
            formats={Editor.formats}
            theme="snow" // pass false to use minimal theme
        />
      </div>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      insertStar,
      image
    }
  },
  clipboard: {
    matchVisual: false
  }
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header',
  'font',
  'size',
  'align',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color'
];
export default Editor;
