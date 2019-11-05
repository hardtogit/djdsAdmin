import { pageConfig } from '@/config/default';
import model from '@/utils/baseModel';
import { withLoading } from '@/utils/dva';
import Fetch from '@/utils/baseSever';

export default model.extend({
  namespace: 'orderManage',
  state: {
    orders: pageConfig,
    loading: {
      orders: false
    }
  },
  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/orderManage', () => {
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
      const pageModel = yield select(({ orderManage }) => orderManage.orders.pagination);
      const response = yield call(withLoading(Fetch, 'orders'), {
        page_num: pageModel.current - 1,
        page_size: pageModel.pageSize,
        ...payload
      });
      yield update({ orders: { list: response.info, pagination: { ...pageModel, total: response.count } } });
    }
  },
  reducers: {}
});
