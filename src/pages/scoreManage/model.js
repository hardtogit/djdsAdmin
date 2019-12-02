import { pageConfig } from '@/config/default';
import model from '@/utils/baseModel';
import { withLoading } from '@/utils/dva';
import Fetch from '@/utils/baseSever';

export default model.extend({
  namespace: 'scoreManage',
  state: {
    score: pageConfig,
    loading: {
      score: false
    }
  },
  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/scoreManage', () => {
          dispatch({
            type: 'fetchList', payload: {
              obj: 'admin',
              act: 'scorelist'
            }
          });
      });
    }
  },

  effects: {
    * fetchList({ payload }, { update, call, select }) {
      const pageModel = yield select(({ scoreManage }) => scoreManage.score.pagination);
      const response = yield call(withLoading(Fetch, 'score'), {
        page_num: pageModel.current - 1,
        page_size: pageModel.pageSize,
        ...payload
      });
      yield update({ score: { list: response.info.records, pagination: { ...pageModel, total: response.info.maxpage } } });
    }
  },
  reducers: {}
});
