import { pageConfig } from '@/config/default';
import model from '@/utils/baseModel';
import { withLoading } from '@/utils/dva';
import Fetch from '@/utils/baseSever';

export default model.extend({
  namespace: 'personManage',
  state: {
    person: pageConfig,
    listResponse:{},
    loading: {
      person: false
    }
  },
  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/userManage', () => {
          dispatch({
            type: 'fetchList', payload: {
              obj: 'admin',
              act: 'personlist'
            }
          });
      });
    }
  },

  effects: {
    * fetchList({ payload }, { update, call, select }) {
      const pageModel = yield select(({ personManage }) => personManage.person.pagination);
      const response = yield call(withLoading(Fetch, 'person'), {
        page_no: pageModel.current - 1,
        page_size: pageModel.pageSize,
        ...payload
      });
      yield update({ listResponse:response.info,person: { list: response.info.records, pagination: { ...pageModel, total: response.info.count } } });
    }
  },
  reducers: {}
});
