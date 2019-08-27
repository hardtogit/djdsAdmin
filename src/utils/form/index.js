import React from 'react'
import moment from 'moment';
import _ from 'lodash';

import { default as fieldTypes, combineTypes } from './fieldTypes';
import  Type  from '../type';
/*
 * 获取date数据的时间戳
 */
const getDateValue = (value, defaultValue = undefined) => {
  return value ? value.valueOf() : defaultValue;
};

/*
 * 获取表单field数组
 * 示例:
 * const formFields = getFields(fields,['name','author'],{ name: { rules: []}}).values();
 * const formFields = getFields(fields).excludes(['id','desc']).values();
 * const formFields = getFields(fields).pick(['name','author','openTime']).enhance({name:{ rules: [] }}).values();
 * @param originField 原始fields
 * @param fieldKeys 需要包含的字段keys
 * @param extraFields 扩展的fields
 * @result 链式写法，返回链式对象(包含pick,excludes,enhance,values方法), 需要调用values返回最终的数据
 */
const createFields = (originFields, fieldKeys, extraFields) => {
  const chain = {};
  let fields = [...originFields];

  const pick = (keys) => {
    keys = [].concat(keys);
    fields = keys.map(key => {
      let field = fields.find(item => key == item.key);
      if (!field) {
        // 如果field不存在，则默认类型的field
        field = {
          key,
          name: key
        };
      }
      return field;
    });
    return chain;
  };

  const excludes = (keys) => {
    keys = [].concat(keys);
    fields = fields.filter(field => !keys.includes(field.key));
    return chain;
  };

  const enhance = (_extraFields) => {
    if (!Array.isArray(_extraFields)) {
      _extraFields = Object.keys(_extraFields).map(key => {
        return Object.assign(_extraFields[key], {
          key
        });
      });
    }
    _extraFields.forEach(extraField => {
      const field = fields.find(item => item.key == extraField.key);
      if (field) {
        Object.assign(field, extraField);
      } else {
        fields.push(extraField);
      }
    });
    return chain;
  };

  const values = () => {
    return fields;
  };

  const mixins = (keys) => {
    keys = [].concat(keys);
    fields = keys.map(key => {
      let field;
      if (typeof key == 'string') {
        field = fields.find(item => key == item.key) || { key };
      } else {
        field = key;
      }
      return field;
    });
    return chain;
  };

  if (fieldKeys) {
    mixins(fieldKeys);
  }

  if (extraFields) {
    enhance(extraFields);
  }

  return Object.assign(chain, {
    pick,
    excludes,
    enhance,
    values
  });
};

/*
 * 创建antd fieldDecorator
 */
const createFieldDecorator = (field, item, getFieldDecorator, placeholder, inputProps = {}, decoratorOpts = {}) => {
  let { type, rules } = field;
  const { key, enums, meta, required, render } = field;
  const originInitialValue = _.get(item, key);

  type = (fieldTypes.hasOwnProperty(type) && type) || (enums && 'enum') || 'text';

  const typedItem = (render || fieldTypes[type])({ initialValue: originInitialValue, meta, field, inputProps, placeholder });
  let { input, initialValue } = typedItem;

  if (React.isValidElement(typedItem)) {
    input = typedItem;
    initialValue = originInitialValue;
  }

  if (required && !rules) {
    rules = [{
      required: true,
      message: `请输入${field.name}`
    }];
  }

  return getFieldDecorator(key, { initialValue, rules, inputProps, ...decoratorOpts })(input);
};

/*
 * 包装antd form validateFields
 * 主要用途自动转换date类型数据，validateFields提供的错误处理大部分情况下都用不到，故提供一个包装函数，简化使用
 * 示例:
 * validate(form, fieldNames)((values) => {
 *     onSave({
 *       ...values,
 *     });
 *  });
 * @param form, antd form对象
 * @param fieldNames, 需要校验的字段，如果为空，则校验全部字段
 * @param filter, 是否过滤值为undefined的字段，默认过滤
 * @param 返回result函数，参数为: onSuccess, onError
 */
const validate = (form, fieldNames, filter = true) => {
  const { validateFields, getFieldsValue } = form;

  const transformValues = (values) => {
    const newValues = {};
    Object.keys(values).forEach((key) => {
      const value = values[key];
      const isDateTimeType = value && value instanceof moment;
      const newValue = isDateTimeType ? getDateValue(values[key]) : values[key];
      // 如果value为undefined,则不赋值到values对象上
      if (newValue != undefined) {
        newValues[key] = newValue;
      } else if (!filter) {
        newValues[key] = newValue;
      }
    });
    return newValues;
  };

  return (ops = {}, os, oe) => {
    let options = ops;
    let onSuccess = os;
    let onError = oe;
    // 兼容不传 options
    if (onError === undefined && Type.isFunction(options)) {
      onSuccess = options;
      options = {};
      onError = os;
    }

    // 兼容fields列表
    if (fieldNames) {
      fieldNames = fieldNames.map((fieldName) => {
        return Type.isObject(fieldName) ? fieldName.key : fieldName;
      });
    }

    validateFields(fieldNames, options, (errors) => {
      if (errors) {
        onError && onError(errors);
      } else {
        const originValues = { ...getFieldsValue() };
        onSuccess(transformValues(originValues), originValues);
      }
    });
  };
};

export default { combineTypes, createFields, validate, getDateValue, createFieldDecorator };

