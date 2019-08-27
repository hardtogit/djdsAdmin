import React from 'react'
import fieldTypes from './fieldTypes';

export default (field) => {
  let { type } = field;
  const { enums, meta, render } = field;
  type = (Object.prototype.hasOwnProperty.call(fieldTypes, type) && type) || (enums && 'enum') || 'text';

  const typedItem = (render || fieldTypes[type])({ meta, field, inputProps: field.inputProps });
  let { input } = typedItem;

  if (React.isValidElement(typedItem)) {
    input = typedItem;
  }

  return React.cloneElement(input);
};
