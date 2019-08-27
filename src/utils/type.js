import _ from 'lodash';

// 判断是否为字符串
function isString(source) {
  return _.isString(source);
}

// 判断是否为数组
function isArray(source) {
  return Array.isArray(source);
}

// 判断是否为纯对象
function isObject(source) {
  return Object.prototype.toString.call(source) === '[object Object]';
}

// 判断是否为函数
function isFunction(source) {
  return _.isFunction(source);
}

// 判断是否为数字
function isNumber(source) {
  return _.isNumber(source);
}

// 判断是否为整数
function isInt(source) {
  return Number.isInteger(source);
}

// 判断数组，对象，字符串是否为空，其他类型都为空
function isEmpty(source) {
  return _.isEmpty(source);
}

// 判断是否等于null或者undefined
function isNill(source) {
  return _.isNil(source);
}

// 判断是否等于null或者undefined
function isNaN(source) {
  return isNaN(source);
}
export default {
  isString,
  isArray,
  isObject,
  isFunction,
  isNumber,
  isInt,
  isEmpty,
  isNill,
  isNaN
};

