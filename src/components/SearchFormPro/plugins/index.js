import { formate } from './formatPugin';
import { ElementTypePugin } from './FiledsTypePugin';
import { validatorPugin } from './validatorPugin';
import { submitAndResetPugin } from './submitPugin';
import { formteParamPugin } from './formatParamPugin';
import { trimStringPugin, trimParamPugin } from './trimPugin';
// import { revPlugin } from './revPlugin';

/**
 * 插件集合
 */
export default [
  formate,
  new ElementTypePugin(),
  validatorPugin,
  submitAndResetPugin,
  formteParamPugin,
  trimStringPugin,
  trimParamPugin
  // revPlugin
];
