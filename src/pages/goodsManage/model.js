import { pageConfig } from '@/config/default';
import model from '@/utils/baseModel';
import { withLoading } from '@/utils/dva';
import Fetch from '@/utils/baseSever';

export default model.extend({
  namespace: 'goodsManage',
  state: {
    goods: pageConfig,
    loading: {
      goods: false
    }
  },
  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/goodsManage', () => {
          dispatch({
            type: 'fetchList', payload: {
              obj: 'admin',
              act: 'goodslist'
            }
          });
      });
    }
  },

  effects: {
    * fetchList({ payload }, { update, call, select }) {
      const pageModel = yield select(({ goodsManage }) => goodsManage.goods.pagination);
      const response = yield call(withLoading(Fetch, 'goods'), {
        page_num: pageModel.current - 1,
        page_size: pageModel.pageSize,
        ...payload
      });
      yield update({ goods: { list: response.info, pagination: { ...pageModel, total: response.count } } });
    }
  },
  reducers: {}
});
