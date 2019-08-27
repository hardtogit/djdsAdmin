import { Input, InputNumber, DatePicker, Select } from 'antd';
import { nextTick } from '@/utils/nextTick';

const Option = Select.Option;

function getPlaceholder({ type, name }) {
  let dot = '';
  switch (type) {
    case 'select':
    case 'date':
    case 'dateRange':
    case 'cityPicker':
      dot = '选择';
      break;
    default:
      dot = '输入';
      break;
  }
  return `请${dot}${name}`;
}

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
      },
    };
  }
  apply(compiler) {
    compiler.hooks.install.tap('ElementTypePugin', (fieldsTypes) => {
      Object.keys(this.options).forEach((type) => {
        fieldsTypes[type] = (field) => {
          // 自动添加onChange监听 触发change hook 帮助联动性处理
          field.onChange = (args) => {
            nextTick(() => {
              compiler.hooks.change.call(field.key, args, compiler.form.getFieldsValue());
            });
          };
          return this.options[type](field);
        };
      });
    });
  }
}
