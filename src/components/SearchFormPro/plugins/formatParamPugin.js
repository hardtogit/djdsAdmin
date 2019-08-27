
const Patter = 'YYYY-MM-DD HH:mm:ss';
const Ratter = 'YYYY-MM-DD';
const Mpatter = 'YYYY-MM';

const Factory = {
  date: val => val.format(Patter),
  dateRange: val => val.map((v, i) => i === 0 ? `${v.format(Ratter)} 00:00:00` : `${v.format(Ratter)} 23:59:59`),
  month: val => val.format(Mpatter)
  // cityPicker: val=>
};

/**
 * 格式化参数
 * @param {*} compier
 */
export function formteParamPugin(compier) {
  compier.hooks.submit.tap('formteParamPugin', (source, values) => {
    const fieldsMap = compier.fields.reduce((p, v) => {
      p[v.key] = v;
      return p;
    }, {});
    return {
      source,
      values: Object.keys(values).reduce((prev, next) => {
        const field = fieldsMap[next];
        if (Factory[field.type] && values[next]) {
          prev[next] = Factory[field.type](values[next]);
        } else {
          prev[next] = values[next];
        }
        return prev;
      }, {})
    };
  });
}
