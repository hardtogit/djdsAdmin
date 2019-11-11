import { pageConfig } from '@/config/default';
import model from '@/utils/baseModel';
import { withLoading } from '@/utils/dva';
import Fetch from '@/utils/baseSever';

export default model.extend({
  namespace: 'gamesManage',
  state: {
    games: pageConfig,
    loading: {
      games: false
    }
  },
  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/gameManage', () => {
          dispatch({
            type: 'fetchList', payload: {
              obj: 'admin',
              act: 'matchlist'
            }
          });
      });
    }
  },

  effects: {
    * fetchList({ payload }, { update, call, select }) {
      const pageModel = yield select(({ gamesManage }) => gamesManage.games.pagination);
      const response = yield call(withLoading(Fetch, 'games'), {
        page_num: pageModel.current - 1,
        page_size: pageModel.pageSize,
        ...payload
      });
      yield update({ games: { list: response.info.records, pagination: { ...pageModel, total: response.count } } });
    }
  },
  reducers: {}
});
