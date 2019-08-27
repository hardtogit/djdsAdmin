import { pageConfig } from '@/config/default';
import model from '@/utils/baseModel';

export default model.extend({
  namespace: 'baseModel',
  state: {
    factory: pageConfig,
    loading: {
      banners: false
    }
  },
  subscriptions: {

  },

  effects: {
  },
  reducers: {}
});
