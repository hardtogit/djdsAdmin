import { pageConfig } from '@/config/default';
import model from '@/utils/baseModel';
import { withLoading } from '@/utils/dva';
import Fetch from '@/utils/baseSever';

export default model.extend({
  namespace: 'homeBanner',
  state: {
    banners: pageConfig,
    loading: {
      banners: false
    }
  },
  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/home/banner', () => {
          dispatch({
            type: 'fetchList', payload: {
              obj: 'admin',
              act: 'bannerlist',
              type:'home'
            }
          });
      });
    }
  },

  effects: {
    * fetchList({ payload }, { update, call, select }) {
      const pageModel = yield select(({ homeBanner }) => homeBanner.banners.pagination);
      const response = yield call(withLoading(Fetch, 'banners'), {
        page_num: pageModel.current - 1,
        page_size: pageModel.pageSize,
        ...payload
      });
      console.log(response,'sssssssss');
      yield update({ banners: { list: response.info, pagination: { ...pageModel, total: response.count } } });
    }
  },
  reducers: {}
});
