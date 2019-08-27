/**
 * 组件控制器
 */
import { Form, Col, Row, Button } from 'antd';
import { SyncHook } from '../Hook/SyncHook';
import { SyncBailHook } from '../Hook/SyncBailHook';
import { SyncWaterfallHook } from '../Hook/SyncWaterfallHook';
import { AsyncSeriesHook } from '../Hook/AsyncSeriesHook';

const FormItem = Form.Item;
const itemLayout = {
  itemCol: {
    span: 6
  },
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 15
  }
};
/**
 * 表单构建器
 */
export class Compiler {
  constructor(options = {}) {
    this.hooks = {
      // 配置修改可以传递
      config: new SyncWaterfallHook(['fields']),
      install: new SyncHook(['fieldTypes']),
      make: new SyncHook(['elements', 'btnElements']),
      layout: new SyncBailHook(['formEles']),
      change: new SyncWaterfallHook(['prop', 'val', 'values']),
      validator: new AsyncSeriesHook(['form']),
      submit: new SyncWaterfallHook(['source', 'values']),
      rev: new SyncHook(['values'])
    };
    // 格式化配置参数
    this.fields = options.fields;
    this.btns = options.btns || [];
    this.fieldTypes = {};
    this.pugins = options.pugins || [];
    this.elements = [];
    this.btnElements = [];
    this.formEles = null;
    this.form = options.form;
  }
  install() {
    if (Array.isArray(this.pugins) && this.pugins.length > 0) {
      this.pugins.forEach((pugins) => {
        if (typeof pugins === 'function') {
          pugins(this);
        } else if (typeof pugins === 'object') {
          pugins.apply && pugins.apply(this);
        }
      });
    }
    this.fields = this.hooks.config.call(this.fields);
    this.hooks.install.call(this.fieldTypes);
  }
  handle(source) {
    // 所有的按钮提交必须走表单验证
    // 重置 不走表单验证
    if (source === 'Reset') {
      this.form.resetFields();
      this.hooks.submit.call(source, this.form.getFieldsValue());
      return;
    }
    this.hooks.validator.callAsync(this.form, (err) => {
      if (!err) {
        this.hooks.submit.call(source, this.form.getFieldsValue());
      }
    });
  }
  layout() {
    // 最初的元素集合
    const elements = this.elements;
    const btnElements = this.btnElements;
    const { getFieldDecorator } = this.form;
    const dfStyle = { marginLeft: '15px' };
    const btnCollayout = { ...itemLayout.itemCol, ...elements[0].field.ColLayout };

    // let visDom;
    if (elements.length) {
      this.formEles = (<Row>
        {elements.map(({ ele, field }) => {
          const collayout = { ...itemLayout.itemCol, ...field.ColLayout };
          return (<Col {...collayout} key={field.key}>
            <FormItem label={field.name} {...itemLayout}>
              {
                getFieldDecorator(field.key, {
                  initialValue: field.initialValue || undefined,
                  rules: field.rules || []
                })(ele)
              }
            </FormItem>
          </Col>);
        })
        }

        <Col {...btnCollayout} style={{ textAlign: 'center', float: 'right', marginTop: '5px',marginBottom:'24px' }}>
          {
          // btns
            btnElements.map(({ type, style, source, title }) => {
              const btnPros = {
                type,
                onClick: () => this.handle(source),
                style
              };
              return <Button {...btnPros} style={{ ...dfStyle, ...style }} key={source}>{title}</Button>;
            })
          }
        </Col>
      </Row>);
    }
    // 布局交给用户自己去整理
    const layout = this.hooks.layout.call(this.formEles);
    return layout || this.formEles;
  }
  make() {
    const fieldTypes = this.fieldTypes;
    const fields = this.fields;
    const btns = this.btns;
    if (fields.length) {
      fields.forEach((field) => {
        this.elements.push({
          ele: fieldTypes[field.type](field),
          field
        });
      });
    }
    if (btns.length) {
      btns.forEach(({ type, source, style, title }) => {
        this.btnElements.push({
          type,
          source,
          style,
          title
        });
      });
    }
    this.hooks.make.call(this.elements, this.btnElements);
  }
  run() {
    return this.layout();
  }
}
