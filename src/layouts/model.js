import model  from '@/utils/baseModel';
import cookie  from 'js-cookie';
import { routerRedux } from 'dva/router';
// import { Paths } from 'configs/constants';
import { withLoading } from '@/utils/dva';

// import { login } from '../../services/login';

export default model.extend({
  namespace: 'layout',
  state: {
    siteName: '永辉彩食鲜后台管理系统',
    // siteName: 'ss',
    user: { username: cookie.get('username') || '' },
    loading: { login: false }
  },
  effects: {
    * login({ payload: { phoneNum, identifyCode } }, { call, put }) {
      const param = { mobile: phoneNum, code: identifyCode };
      // const { id, token, name } = yield call(withLoading(login, 'login'), param);

      const expires = { expires: 1 };

      // cookie.set('sid', id, expires);
      // cookie.set('st', token, expires);
      // cookie.set('username', name, expires);
      //
      // yield put(routerRedux.push(Paths.ORDER_MANAGE));
    },

    // // 发送验证码
    // * sendSms({ payload }, { call }) {
    //   yield call(sendSms, payload);
    // },

    * logout({ payload }, { put }) {
      cookie.remove('username');
      cookie.remove('sid');
      cookie.remove('st');

      // yield put(routerRedux.push(Paths.LOGIN));
    }
  },

  reducers: {}
});
