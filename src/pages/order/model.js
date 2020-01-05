import { pageConfig } from '@/config/default';
import model from '@/utils/baseModel';
import { withLoading } from '@/utils/dva';
import Fetch from '@/utils/baseSever';

export default model.extend({
  namespace: 'orderManage',
  state: {
    person: pageConfig,
    loading: {
      person: false
    }
  },
  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/order', () => {
          dispatch({
            type: 'fetchList', payload: {
              obj: 'admin',
              act: 'orderlist'
            }
          });
      });
    }
  },

  effects: {
    * fetchList({ payload }, { update, call, select }) {
      const pageModel = yield select(({ orderManage }) => orderManage.person.pagination);
      const response = yield call(withLoading(Fetch, 'person'), {
        page_num: pageModel.current - 1,
        page_size: pageModel.pageSize,
        ...payload
      });
      yield update({ person: { list: response.info.records, pagination: { ...pageModel, total: response.info.count } } });
    }
  },
  reducers: {}
});
