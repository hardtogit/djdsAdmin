## 基于hooks的表单构建方案

-- 代码分支 dev__2.0__fin

> 使用hooks 方案将表单的构建过程分成若干hook，通过安装插件去处理每个hook的功能
插件可以自定义配置参与到表单的所有过程中。

#### 使用
1. 组件配置

| prop 名称| 类型 |  默认值| 备注 |
| -- | -- | --  | --- |
|fields | Array | [] |  配置的字段 所有字段都应用到 Form组件上 placeHolder<br> 自动处理 如果不符合需要 可以自己提供 以自己的为优先|
|btns|Array|[]| 除了查询和重置之外的btns配置|
| handler| function(source, values)| 如果配置了btns 必须提供 | 监听所有除了查询和重置之外按钮的Click时间 返回 source和 <br/>values （values 经过了字符串参数处理）|
| pugins| Array<functiono or A<apply>>| []| 插件 参与整个组件的hooks周期 |

2. 参数解释
- fields
  - name: 标题
  - key: 字段name 
  - initialValue: 默认值
  - rules 验证规则配置
  - ...所有应用到form组件的属性 比如 disabled placeholder
- btns
   - source 事件来源 用于标识事件的来源
   - title btn 标题
   - type btn type
   - style 按钮样式 默认MarginLeft 15px
- handler 
> function(source,values) 用来处理source除了Submit 和 Reset 之外按钮的类型按钮点击事件

- pugins 
> 插件 function(compiler) 类型 或者 prototype.apply 的class 都可以了 默认传入 compiler 实例 compiler是构建的实例 拥有配置参数、hooks 具体用法可以参考默认pugin写法

#### 实现方案
将所有过程分成以下hook

- config
- install
- make
- layout
- validator
- submit

```js
export class Compiler {
  constructor(options = {}) {
    this.hooks = {
      config: new SyncBailHook(['fields']),
      install: new SyncHook(['fieldTypes']),
      make: new SyncHook(['elements', 'btnElemens']),
      layout: new SyncBailHook(['formEles']),
      validator: new AsyncSeriesHook(['form']),
      submit: new SyncWaterfallHook(['source', 'values'])
    };
    // 格式化配置参数
    this.fields = options.fields;
    this.btns = options.btns || [];
    this.fieldTypes = {};
    this.pugins = options.pugins || [];
    this.elements = [];
    this.btnElemens = [];
    this.formEles = null;
    this.form = options.form;
  }
  ...
}
```
1. config （SyncBailHook 同步订阅 只要订阅函数有一个返回值 即可结束 以后执行后面的）

> 这里将所有配置的fields 字段交给插件去处理 比如格式化参数，给默认值
如果配置项没有给type 字段 默认就给 'text' 时间组件如果给的初始值不是moment 转化成moment **这里的配置理论上属于组件级别的 无需去监听处理** 配置一下处理就好 就不需要多次返回值来处理

```js
// 优化配置插件 
export function formate(compiler) {
  compiler.hooks.config.tap('FieldsFormate', (fields = []) => fields.map((field) => {
    // 如果不给type 默认text
    field.type = field.type || 'text';
    if ((field.type === 'date' || field.type === 'month') && field.initialValue) {
      field.initialValue = toMoment(field.initialValue);
    } else if (field.type === 'dateRange' && Array.isArray(field.initialValue)) {
      field.initialValue = field.initialValue.map(it => toMoment(it));
    }
    return field;
  }));
}

```

3. install

> 这里的作用就是注册所有可以使用组件类型 默认提供了text date number等 如果需要扩展
可以监听install hook 添加对应的类型即可 key 不可覆盖默认值， 这么提供hook的想法是
为了将组件的使用最大化 不然注册一大推 用到没几个

```js
 install() {
   // 注册插件
    if (Array.isArray(this.pugins) && this.pugins.length > 0) {
      this.pugins.forEach((pugins) => {
        if (typeof pugins === 'function') {
          pugins(this);
        } else if (typeof pugins === 'object') {
          pugins.apply && pugins.apply(this);
        }
      });
    }
    // 去优化fields
    this.fields = this.hooks.config.call(this.fields);
    // 调用按照插件
    this.hooks.install.call(this.fieldTypes);
  }
```

默认插件 
```js
export class ElementTypePugin {
  constructor() {
    this.options = {
      text: field => <Input placeholder={getPlaceholder(field)} {...field} />,
      number: field => <InputNumber placeholder={getPlaceholder(field)} {...field} />,
      dateRange: field => <DatePicker.RangePicker {...field} />,
      date: field => <DatePicker placeholder={getPlaceholder(field)} {...field} />,
      month: field => <DatePicker.MonthPicker placeholder={getPlaceholder(field)} {...field} />,
      enum: (field) => {
        const options = field.enums &&
                  Object.keys(field.enums).map(key => <Option value={key} key={key} >
                    {field.enums[key]}
                  </Option>);
        return <Select style={{ width: '100%' }} placeholder={getPlaceholder(field)} {...field}>{options}</Select>;
      }
    };
  }
  apply(compiler) {
    compiler.hooks.install.tap('ElementTypePugin', (fieldsTypes) => {
      Object.keys(this.options).forEach((type) => {
        // fieldsTypes[type] = this.options[type];
        // const ele = this.options[type];
        fieldsTypes[type] = field => this.options[type](field);
      });
    });
  }
}

```

4. make 
> 将fields 插件转成elements 这里的hook 还没到布局阶段 可以调用插件 插入动态组件元素 或者删除 或者调整位置 group 分组等 方便layout

```js
    const fieldTypes = this.fieldTypes;
    const fields = this.fields;
    const btns = this.btns;
    if (fields.length) {
      fields.forEach((field) => {
        // console.log(fieldTypes, field);
        this.elements.push({
          ele: fieldTypes[field.type](field),
          field
        });
      });
    }
    if (btns.length) {
      btns.forEach(({ type, source, style, title }) => {
        this.btnElemens.push({
          type,
          source,
          style,
          title
        });
      });
    }
    this.hooks.make.call(this.elements, this.btnElemens);
```

5. layout
> 这里提供默认的将elements 转成form 元素的过程 并提供简单的布局 如果有需要 可以使用hooks layout 自定义 hook 调用的时候传入自己生产的基础布局 可以适当调整

```js
layout() {
    // 最初的元素集合
    const elements = this.elements;
    const btnElemens = this.btnElemens;
    const { getFieldDecorator } = this.form;
    const dfStyle = { marginLeft: '15px' };

    // let visDom;
    if (elements.length) {
      this.formEles = (<Row>
        { elements.map(({ ele, field }) => {
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
        <Col {...itemLayout.itemCol}>
          {
          // btns
            btnElemens.map(({ type, style, source, title }) => {
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
```
这样form生成完毕 给render 方法即可

6. validator 
> 表单在使用过程中 还要验证 这里加了validator的 hook 并提供了hook 这里将验证的工作
交给了插件 后续提供方案让开发自己去验证<br>
validator是异步的过程 所以使用AsyncSeriesHook 异步串行hook

```js
 handle(source) {
    // 所有的按钮提交必须走表单验证
    // 重置 不走表单验证
    if (source === 'Reset') {
      this.form.resetFields();
      this.hooks.submit.call(source, this.form.getFieldsValue());
      return;
    }
    // 异步hook
    this.hooks.validator.callAsync(this.form, (err) => {
      if (!err) {
        this.hooks.submit.call(source, this.form.getFieldsValue());
      }
    });
  }
```

7. submit
> 验证通过的表单需要提交 按钮的click 会触发 validator 然后会触发 submit
 hook 只要监听了的订阅者都可以接收到这个事件 并通过source 标识click的来源 并传入 value
 
 #### 其他处理
 - 提供表单数据字符串处理 比如moment 处理为字符串
 
 #### 例子
 
 ```js
 // fields: 
 export default [{
  name: '靠台时间',
  key: 'dependTime',
  type: 'dateRange',
  rules: [{
    required: true,
    message: '靠台时间必填'
  }]
}, {
  name: '托运人',
  key: 'shipper'
}, {
  name: '订单号',
  key: 'orderNo'
}, {
  name: '是否对账',
  key: 'isReconciliation',
  type: 'enum',
  enums: { ALL: '全部', NO: '未对账', YES: '已对账' }
}];

// index 

export default ({
  search,
  onExport,
  onSearch
}) => {
  const props = {
    search,
    fields,
    btns: [{ type: 'ghost', key: 'exportOrder', source: 'expoerOrder', title: '导出订单' }],
    onSearch,
    handler: (source, values) => {
      if (source === 'expoerOrder') {
        onExport(values);
      }
    }
  };
  return <Card bordered> <SearchFormHook {...props} /></Card>;
};

 ```
