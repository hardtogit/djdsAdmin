/**
  * @title     model
  * @description
  * @author 向国
  * @email 413401168@qq.com
  * @date   2020/7/26 11:02 PM
  *
  */
import { pageConfig } from '@/config/default';
import model from '@/utils/baseModel';
import { withLoading } from '@/utils/dva';
import Fetch from '@/utils/baseSever';

export default model.extend({
  namespace: 'feedBack',
  state: {
    person: pageConfig,
    loading: {
      person: false
    }
  },
  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/feedBack', () => {
        dispatch({
          type: 'fetchList', payload: {
            obj: 'person',
            act: 'feedbacklist'
          }
        });
      });
    }
  },

  effects: {
    * fetchList({ payload }, { update, call, select }) {
      const pageModel = yield select(({ feedBack }) => feedBack.person.pagination);
      const response = yield call(withLoading(Fetch, 'person'), {
        page_no: pageModel.current,
        page_size: pageModel.pageSize,
        ...payload
      });
      yield update({ person: { list: response.info.records, pagination: { ...pageModel, total: response.info.count } } });
    }
  },
  reducers: {}
});
