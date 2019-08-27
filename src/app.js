import createHistory from 'history/createHashHistory';
import {Modal} from 'antd';
const history = createHistory();
window.apiconn.response_received_handler = function(jo){
  if(!sessionStorage.getItem('credential_data')){
    if(window.location.href.indexOf('login')===-1){
      history.push('/login');
    }
  };
  if (jo.ustr) {
    Modal.error({title:'错误提示',content:jo.ustr});
    if(window.callBackFn[jo.obj + '_' + jo.act]&&window.callBackFn[jo.obj + '_' + jo.act].length){
      window.callBackFn[jo.obj + '_' + jo.act].shift()(jo);
    }
  } else {
    if (window.callBackFn[jo.obj + '_' + jo.act] && window.callBackFn[jo.obj + '_' + jo.act].length) {
      window.callBackFn[jo.obj + '_' + jo.act].shift()(jo);
    }
  }
  if(!jo.ustr&&jo.obj === 'person'&&jo.act === 'login'){
    console.log('a');
  }
  if(jo.ustr&&jo.obj === 'person'&&jo.act === 'login') {
    if (window.location.href.indexOf('login') === -1) {
      sessionStorage.removeItem('credential_data');
      window.apiconn.logout();
      history.push('/login');
    }
  }
};
window.apiconn.wsUri = 'ws://www.freshfood.cn/yh_ga';
window.apiconn.connect();
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    }
  }
};
export function render(oldRender) {
  window.apiconn.state_changed_handler = function() {
    if(window.apiconn.conn_state == 'IN_SESSION') {
      sessionStorage.setItem('credential_data', JSON.stringify(window.apiconn.credential_data));
    } else if(window.apiconn.conn_state == 'LOGIN_SCREEN_ENABLED') {
      oldRender();
      if(window.apiconn.login_name == '' && window.apiconn.credential_data == null) {
        var login_name = sessionStorage.getItem('login_name');
        var login_passwd = sessionStorage.getItem('login_passwd');
        var cred = sessionStorage.getItem('credential_data');
        var cred_obj = null;
        if(cred !== '') cred_obj = JSON.parse(cred);

        if(login_name != '' && login_name != null) {
          window.apiconn.login(login_name, login_passwd);

        } else if(cred_obj != null) {
          window.apiconn.loginx(cred_obj);
        }
      }
    }
  };
}
