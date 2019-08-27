import { pageConfig } from '@/config/default';
import model from '@/utils/baseModel';
import { withLoading } from '@/utils/dva';
import Fetch from '@/utils/baseSever';

export default model.extend({
  namespace: 'homePartner',
  state: {
    partners: pageConfig,
    loading: {
      banners: false
    }
  },
  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/home/partner', () => {
        setTimeout(() => {
          dispatch({
            type: 'fetchList', payload: {
              obj: 'admin',
              act: 'homepartnerlist'
            }
          });
        }, 0);

      });
    }
  },

  effects: {
    * fetchList({ payload }, { update, call, select }) {
      const pageModel = yield select(({ homePartner }) => homePartner.partners.pagination);
      const response = yield call(withLoading(Fetch, 'partners'), {
        page_num: pageModel.current - 1,
        page_size: pageModel.pageSize,
        ...payload
      });
      yield update({ partners: { list: response.info, pagination: { ...pageModel, total: response.count } } });
    }
  },
  reducers: {}
});
