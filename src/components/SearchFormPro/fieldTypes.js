import React from 'react';
import {
  // AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  InputNumber,
  Input,
  // Mention,
  Radio,
  // Rate,
  // Select,
  // Slider,
  // Switch,
  TimePicker,
  TreeSelect
  // Transfer,
  // Upload
} from 'antd';

import { moment } from 'carno/third-party';
import { HSelect, HDatePicker } from 'carno';
import { Type } from 'carno/utils';
import { HCityPicker } from 'carno';
import SelectDepartment from '../SelectDepartment';


const { MonthPicker, RangePicker } = DatePicker;
const { TextArea } = Input;
const { Group: CheckboxGroup } = Checkbox;
const { Group: RadioGroup } = Radio;

const Format = {
  DATE: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  TIME: 'HH:mm:ss',
  MONTH: 'YYYY-MM'
};

// 支持格式 moment、date、时间戳(数值或者number)、IOS9601/RFC2822日期格式
function toMoment(value, format) {
  let momentValue;

  const isNumber = Type.isNumber(value);
  const isMoment = moment.isMoment(value);
  const isString = Type.isString(value);
  const isNotNaN = !isNaN(value);
  const isDate = value instanceof Date;
  const isDefaultFormat = Object.values(Format).includes(format);

  // 忽略[]或{}的情况
  if (!value && Type.isEmpty(value)) return null;

  if (isMoment) {
    momentValue = value;
  } else if (isDate || isNumber) {
    momentValue = moment(value);
  } else if (isString && isNotNaN && isDefaultFormat) {
    // 判断isDefaultFormat 主要是为了避免格式为数字型format时，也被强转为number，比如: 2012.12
    momentValue = moment(parseInt(value, 10));
  } else {
    momentValue = moment(value, format);
  }

  return momentValue.isValid() ? momentValue : null;
}

/*
 * 表单字段类型
 */
const fieldTypes = {
  date: ({ initialValue, inputProps = {} }) => ({
    input: <DatePicker {...inputProps} />,
    initialValue: toMoment(initialValue)
  }),
  dateRange: ({ initialValue = [], inputProps = {} }) => {
    const [start, end] = initialValue;
    const { format = Format.DATE } = inputProps;
    return {
      input: <RangePicker format={format} {...inputProps} />,
      initialValue: [toMoment(start, format), toMoment(end, format)]
    };
  },
  datetime: ({ initialValue, inputProps }) => {
    const { format = Format.DATETIME } = inputProps;
    return {
      input: <DatePicker showTime format={format} {...inputProps} />,
      initialValue: toMoment(initialValue, format)
    };
  },
  datetimeRange: ({ initialValue = [], inputProps }) => {
    const [start, end] = initialValue;
    const { format = Format.DATETIME } = inputProps;
    return {
      input: <RangePicker showTime format={format} {...inputProps} />,
      initialValue: [toMoment(start), toMoment(end)]
    };
  },
  hDateRange: ({ initialValue = {}, inputProps }) => {
    const { startDate, endDate } = initialValue;
    const { format = Format.DATETIME } = inputProps;
    return {
      input: <HDatePicker format={format} {...inputProps} />,
      initialValue: { startDate: toMoment(startDate, format), endDate: toMoment(endDate, format) }
    };
  },
  enum: ({ field, placeholder, inputProps, meta = {} }) => {
    const { enums, name } = field;
    let options = enums;
    if (!Array.isArray(options)) {
      options = Object.keys(enums).reduce((occ, key) =>
        occ.concat([{ value: key, label: enums[key] }]), []);
    }

    const tmpPlaceholder = placeholder === false ? '' : placeholder || meta.placeholder || `请选择${name}`;
    return (
      <HSelect
        style={{ width: '100%' }}
        allowClear
        options={options}
        getPopupContainer={() => document.getElementById('mainContainer')}
        placeholder={tmpPlaceholder}
        {...inputProps}
      />
    );
  },
  boolean: ({ inputProps }) => <Checkbox {...inputProps} />,
  number: ({ meta = {}, inputProps }) => (
    <InputNumber
      min={meta.min !== undefined ? meta.min : -Infinity}
      max={meta.max !== undefined ? meta.max : Infinity}
      step={meta.step || 1}
      {...inputProps}
    />
  ),
  textarea: ({ meta = {}, field, placeholder, inputProps }) => {
    const tmpPlaceholder = placeholder === false ? '' : placeholder || meta.placeholder || `请输入${field.name}`;
    return <TextArea rows={meta.rows || 3} placeholder={tmpPlaceholder} autosize={meta.autosize} {...inputProps} />;
  },
  text: ({ meta = {}, field, placeholder, inputProps }) => {
    const tmpPlaceholder = placeholder === false ? '' : placeholder || meta.placeholder || `请输入${field.name}`;
    return <Input type="text" placeholder={tmpPlaceholder} {...inputProps} />;
  },
  month: ({ initialValue, inputProps = {} }) => {
    const { format = Format.MONTH } = inputProps;
    return {
      input: <MonthPicker {...inputProps} style={{ width: '100%' }} />,
      initialValue: toMoment(initialValue, format)
    };
  },
  monthdate: ({ initialValue, inputProps = {} }) => {
    const { format = Format.MONTH } = inputProps;
    return {
      input: <MonthPicker {...inputProps} style={{ width: '100%' }} />,
      initialValue: toMoment(initialValue, format)
    };
  },
  time: ({ initialValue, inputProps }) => {
    const { format = Format.TIME } = inputProps;
    return {
      input: <TimePicker {...inputProps} />,
      initialValue: toMoment(initialValue, format)
    };
  },
  cascader: ({ initialValue, inputProps }) => ({
    input: <Cascader {...inputProps} />,
    initialValue
  }),
  checkboxGroup: ({ initialValue, inputProps }) => ({
    input: <CheckboxGroup {...inputProps} />,
    initialValue
  }),
  radioGroup: ({ initialValue, inputProps }) => ({
    input: <RadioGroup {...inputProps} />,
    initialValue
  }),
  treeSelect: ({ initialValue, inputProps }) => ({
    input: <TreeSelect {...inputProps} />,
    initialValue
  }),
  selectDepartment: ({ initialValue, inputProps }) => ({
    input: <SelectDepartment style={{ width: '100%' }} {...inputProps} />,
    initialValue
  }),
  selectCity: ({ initialValue, field: { inputProps } }) => ({
    input: <HCityPicker style={{ width: '100%' }} {...inputProps} />,
    initialValue: initialValue || []
  })
};

/*
 * 扩展表单字段类型
 */
export function combineTypes(extras) {
  Object.assign(fieldTypes, extras);
}

export default fieldTypes;

