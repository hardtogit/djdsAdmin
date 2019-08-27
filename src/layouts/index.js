import { withRouter ,routerRedux} from 'dva/router';
import { Icon } from 'antd';
import HBasicLayout  from '@/components/HBasicLayout';
import menus from '@/config/menus';
import React from 'react';
import { connect } from 'dva';
import './index.less';

function Layout({
                  dispatch,
                  location,
                  siteName,
                  user,
                  children
                }) {
  console.log(siteName);
  const props = {
    siteName,
    user,
    nav: { menus },
    pathname: location.pathname,
    header: {
      // setUserOps(item) {
      //   return [
      //     // { key: 'setting', title: '个人设置', icon: 'setting', onClick: () => console.log('个人设置') },
      //     // {
      //     //   key: 'close-circle',
      //     //   title: '触发报错',
      //     //   icon: 'close-circle',
      //     //   divider: true,
      //     //   onClick: () => console.log('触发报错')
      //     // },
      //     item,
      //   ];
      // },
      onLogout() {
        sessionStorage.removeItem('credential_data');
        window.apiconn.logout();
        dispatch(routerRedux.push('/login'));
      }
    },
    footer: {
      title: '基础系统',
      content: (
        <React.Fragment>
          Copyright <Icon type="copyright" /> 2018
        </React.Fragment>
      )
    }
  };
  console.log(props);
  if (props.pathname === '/login') {
    return <div className="loginContainer">{children}</div>;
  }
  return (
    <HBasicLayout {...props}>
      {children}
      {/* <Switch>
        <Route exact path={Paths.ORDER_MANAGE} component={pages.OrderManage} breadcrumbName="订单管理" />
        <Redirect to={Paths.ORDER_MANAGE} />
      </Switch> */}
    </HBasicLayout>
  );
}

function mapStateToProps({ layout }) {
  return {
    ...layout
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
