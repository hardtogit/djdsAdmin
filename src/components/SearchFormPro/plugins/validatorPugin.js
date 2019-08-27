/**
 * 验证插件
 */

export function validatorPugin(compiler) {
  compiler.hooks.validator.tapAsync('validatorPugin', (form, callback) => {
    // console.log(callback);
    form.validateFieldsAndScroll((err, values) => {
      callback(err, values);
    });
  });
}
