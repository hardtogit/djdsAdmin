import Type from './type';

// 为空的情况有：undefined,null,空字符串
export default value => Type.isNill(value) || (Type.isString(value) && Type.isEmpty(value));
