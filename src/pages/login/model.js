import model from '@/utils/baseModel';
import {routerRedux} from 'dva/router';
import {withLoading} from '@/utils/dva';
import  Fetch from '@/utils/baseSever';
export default model.extend( {
  namespace:'login',
  state: {
    loading:{
      login:false
    }
  },
  subscriptions: {
  },
  effects: {
    * login({payload}, {put, call}) {
      const response = yield call(withLoading(Fetch, 'login',),payload);
      if (response.ustr != null && response.ustr !== '' && response.uerr !== 'ERR_CONNECTION_EXCEPTION'){
        // Modal.warning({title:response.ustr});
      }else{
          yield put(routerRedux.push('/userManage'));
      }
    }
  },
  reducers:{

  }
});
