/**
 * 通用searchForm 开发
 */
import React from 'react';
import { Form } from 'antd';
import { Compiler } from './compiler';
import pugins from './plugins/index';
import { looseEqual } from '@/utils/share';

/**
 * 统一表单生成器
 * pugins 拼写错误 忽略【plugins】
 */
@Form.create()
class SearchFormHook extends React.Component {
  constructor(props) {
    super(props);
    this.compiler = new Compiler({
      fields: props.fields,
      btns: props.btns,
      form: props.form,
      pugins: [...pugins, ...(props.pugins || [])]
    });
    // this.handle();
  }

  componentWillMount() {
    this.compiler.install();
    this.compiler.make();
    this.handle();
  }
  componentWillReceiveProps(nextProps) {
    // 接受处理给表单设置值
    // console.log(nextProps.search,);
    const { search } = nextProps;
    if (!!search && Object.keys(search).length > 0 &&
                            this.props.search !== search &&
                            !looseEqual(this.props.search, search)) {
      // const values = form.getFieldsValue();
      // if (!looseEqual(search, values)) {
      // 当 search 和 values 不相等 才有赋值的
      // 这里不再进行form的value和当前 search的比较 如果需要判断将这块逻辑纳入到插件
      this.compiler.hooks.rev.call(search);
      // }
    }
  }
  handle() {
    const { onSearch, handler } = this.props;
    const compiler = this.compiler;
    // 将表单的按钮回调全部返回回去
    compiler.hooks.submit.tap('CallBack', ({ source, values }) => {
      if (source === 'Submit' || source === 'Reset') {
        onSearch(values);
      } else {
        handler(source, values);
      }
    });
  }
  render() {
    return this.compiler.run();
  }
}
export {SearchFormHook};
