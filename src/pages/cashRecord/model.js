import { pageConfig } from '@/config/default';
import model from '@/utils/baseModel';
import { withLoading } from '@/utils/dva';
import Fetch from '@/utils/baseSever';

export default model.extend({
  namespace: 'withdrawManage',
  state: {
    withdraw: pageConfig,
    loading: {
      withdraw: false
    }
  },
  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/cashRecord', () => {
          dispatch({
            type: 'fetchList', payload: {
              obj: 'admin',
              act: 'withdrawlist'
            }
          });
      }) ;
    }
  },

  effects: {
    * fetchList({ payload }, { update, call, select }) {
      const pageModel = yield select(({ withdrawManage }) => withdrawManage.withdraw.pagination);
      const response = yield call(withLoading(Fetch, 'withdraw'), {
        page_no: pageModel.current ,
        page_size: pageModel.pageSize,
        ...payload
      });
      console.log(response,'sssssssss');
      yield update({ withdraw: { list: response.data.records, pagination: { ...pageModel, total: response.data.count } } });
    }
  },
  reducers: {}
});
