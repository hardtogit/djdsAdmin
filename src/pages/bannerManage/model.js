import { pageConfig } from '@/config/default';
import model from '@/utils/baseModel';
import { withLoading } from '@/utils/dva';
import Fetch from '@/utils/baseSever';

export default model.extend({
  namespace: 'bannersManage',
  state: {
    banner: pageConfig,
    loading: {
      banner: false
    }
  },
  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/bannerManage', () => {
          dispatch({
            type: 'fetchList', payload: {
              obj: 'admin',
              act: 'bannerlist'
            }
          });
      });
    }
  },

  effects: {
    * fetchList({ payload }, { update, call, select }) {
      const pageModel = yield select(({ bannersManage }) => bannersManage.banner.pagination);
      const response = yield call(withLoading(Fetch, 'banner'), {
        page_num: pageModel.current - 1,
        page_size: pageModel.pageSize,
        ...payload
      });
      yield update({ banner: { list: response.info.records, pagination: { ...pageModel, total: response.count } } });
    }
  },
  reducers: {}
});
