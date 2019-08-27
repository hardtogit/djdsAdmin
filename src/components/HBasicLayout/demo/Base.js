import React from 'react';
import { Tooltip, Icon } from 'antd';
import { Switch, Route } from 'dva/router';
import { HBasicLayout } from 'carno';

function Base() {
  const location = { pathname: '/app/appManage/serviceManage', search: '', hash: '', state: '' };
  const menus = [{
    title: '总览',
    key: 'dashboard',
    icon: 'home',
    path: '/dashboard',
  }, {
    title: '应用',
    key: 'app',
    icon: 'appstore',
    children: [{
      title: '域名管理',
      key: 'Layout1',
      path: '/components/Layout',
    }, {
      title: '应用管理',
      key: 'appManage',
      children: [{
        title: '服务管理',
        key: 'serviceManage',
        path: '/app/appManage/serviceManage',
      }],
    }, {
      title: '发布统计',
      key: 'Layout2',
      path: '/components/Layout',
    }]
  }, {
    title: '集群',
    key: 'dashboard1',
    icon: 'database',
    path: '/dashboard',
  }];
  const props = {
    siteName: '后台管理系统',
    user: { username: 'gogo' },
    nav: { menus },
    pathname: location.pathname,
    header: {
      list: [
        {
          key: 'notification',
          title: <Icon type="notification" />,
          content: <div style={{ width: 280, height: 140, background: '#fff' }} />,
        },
        {
          key: 'question',
          title: <Tooltip title="使用文档"><Icon type="question-circle-o" /></Tooltip>,
        },
      ],
      setUserOps(item) {
        return [
          { key: 'setting', title: '个人设置', icon: 'setting', onClick: () => console.log('个人设置') },
          {
            key: 'close-circle',
            title: '触发报错',
            icon: 'close-circle',
            divider: true,
            onClick: () => console.log('触发报错')
          },
          item,
        ];
      },
      onLogout() {
        console.log('退出登录');
      },
    },
    footer: {
      title: '后台管理系统',
      content: (
        <React.Fragment>
          Copyright <Icon type="copyright" /> 2018
        </React.Fragment>
      ),
    },
  };

  return (
    <HBasicLayout {...props}>
      <Switch>
        <Route path="/" render={() => <div>布局</div>} />
      </Switch>
    </HBasicLayout>
  );
}

export default Base;
