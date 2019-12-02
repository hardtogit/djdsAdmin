import { pageConfig } from '@/config/default';
import model from '@/utils/baseModel';
import { withLoading } from '@/utils/dva';
import Fetch from '@/utils/baseSever';

export default model.extend({
  namespace: 'giftManage',
  state: {
    gift: pageConfig,
    loading: {
      gift: false
    }
  },
  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/giftManage', () => {
          dispatch({
            type: 'fetchList', payload: {
              obj: 'admin',
              act: 'giftlist'
            }
          });
      });
    }
  },

  effects: {
    * fetchList({ payload }, { update, call, select }) {
      const pageModel = yield select(({ giftManage }) => giftManage.gift.pagination);
      const response = yield call(withLoading(Fetch, 'gift'), {
        page_num: pageModel.current - 1,
        page_size: pageModel.pageSize,
        ...payload
      });
      yield update({ gift: { list: response.info.records, pagination: { ...pageModel, total: response.info.maxpage } } });
    }
  },
  reducers: {}
});
