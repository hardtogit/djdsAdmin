import  isEmpty  from '@/utils/isEmpty';
/**
 * 干掉查询空格
 */
export function trimStringPugin(compiler) {
  compiler.hooks.submit.tap('trimStringPugin', (target) => {
    Object.keys(target.values).forEach((key) => {
      const val = target.values[key];
      if (val && typeof val === 'string') {
        target.values[key] = val.trim();
      }
    });
    return target;
  });
}

/**
 * 干掉参数中存在的 为空的参数
 * @param {} compiler
 */
export function trimParamPugin(compiler) {
  compiler.hooks.submit.tap('trimParamPugin', (target) => {
    Object.keys(target.values).forEach((key) => {
      const val = target.values[key];
      if (isEmpty(val) || (Array.isArray(val) && val.length === 0)) {
        delete target.values[key];
      }
    });
    return target;
  });
}
