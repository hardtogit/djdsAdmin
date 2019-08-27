import React, { Component } from 'react';
import { TreeSelect } from 'antd';
import { looseEqual } from '/utils/share';
// import { isObject } from '../../../utils/share';

/**
 * 搜索组件
 */

const TreeNode = TreeSelect.TreeNode;

export class AutoCompleteComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      value: undefined
    };
    this.onSearch = this.onSearch.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // 适当补充数据
    const { dataSource } = nextProps;
    if (Array.isArray(dataSource) &&
      dataSource !== this.props.dataSource &&
      !looseEqual(dataSource, this.props.dataSource)) {
      this.setState({
        dataSource
      });
    }
    if ('value' in nextProps) {
      const value = nextProps.value || undefined;
      this.setState({ value: value && value.toString() });
    }
  }
  onSearch(val) {
    const { dataSource } = this.props;
    if (!val) {
      this.setState({ dataSource });
    } else {
      this.setState({
        dataSource: dataSource.filter(({ label }) => label.indexOf(val) > -1)
      });
    }
  }
  onChange = (value) => {
    const { onChange } = this.props;
    if (!value) {
      this.setState({
        dataSource: this.props.dataSource
      });
    }
    this.setState({
      value
    });
    onChange(value);
  }
  renderNode() {
    const { dataSource } = this.state;
    return dataSource.map((item, index) => {
      const title = <span className="search-item" key={item.value}>{item.label}</span>;
      return (<TreeNode
        value={item.value}
        title={title}
        key={index}
      />);
    });
  }
  render() {
    const treeNode = this.renderNode();
    return (
      <TreeSelect
        {...this.props}
        showSearch
        onChange={this.onChange}
        onSearch={this.onSearch}
        filterTreeNode={() => true}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        dropdownClassName={'selectAccount'}
        value={this.state.value}
        allowClear
        treeDefaultExpandAll
      >
        {treeNode}
      </TreeSelect>
    );
  }
}
