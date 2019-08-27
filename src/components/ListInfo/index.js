import React from 'react';
import { Tag, Input, Tooltip, Icon } from 'antd';
import './index.less';

class EditableTagGroup extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: ''
  };
  componentWillReceiveProps(nextProps){
    if('value' in nextProps){
      this.setState({
        tags:nextProps.value
      });
    }
  }
  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
    if(this.props.onChange){
      this.props.onChange(tags);
    }
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: ''
    });
    if(this.props.onChange){
      this.props.onChange(tags);
    }
  };

  saveInputRef = input => (this.input = input);

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div>
        {tags.map((tag) => {
          const tagElem = (
            <Tag key={tag} closable  onClose={() => this.handleClose(tag)}>
              {tag}
            </Tag>
          );
          return tagElem;

        })}
        {inputVisible && (
          <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> 新增
          </Tag>
        )}
      </div>
    );
  }
}
export default EditableTagGroup;
