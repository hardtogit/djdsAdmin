import { pageConfig } from '@/config/default';
import model from '@/utils/baseModel';
import { withLoading } from '@/utils/dva';
import Fetch from '@/utils/baseSever';

export default model.extend({
  namespace: 'scene',
  state: {
    person: pageConfig,
    loading: {
      person: false
    }
  },
  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/vrSetting/scene', () => {
          dispatch({
            type: 'fetchList', payload: {
              obj: 'admin',
              act: 'vrscenariolist'
            }
          });
      });
    }
  },

  effects: {
    * fetchList({ payload }, { update, call, select }) {
      const pageModel = yield select(({ scene }) => scene.person.pagination);
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
