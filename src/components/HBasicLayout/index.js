import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'dva/router';
import _ from 'lodash';

import SiderMenu from './SiderMenu';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import Footer from './Footer';

const { Content } = Layout;

/**
 * HLayout组件
 *
 * SettingDrawer 只能在组件库内使用，不暴露给业务方，业务同学可以通过提供的参数，自己设计对 Layout 组件的控制实现
 *
 * @props {object} children 儿子节点
 *
 * @props {string} siteName 站点名称
 * @props {string} logo 站点logo
 * @props {string} pathname location中的路径
 * @props {boolean} defaultCollapsed 是否折叠侧边导航
 *
 * @props {string} layout 布局 topmenu | sidemenu
 * @props {string} theme 主题 light | dark
 * @props {string} fixedHeader 是否固定header
 * @props {string} fixSiderbar 是否固定侧边栏
 *
 * @props {object} user 用户信息
 *   user
 *   @props {string} username
 *   @props {string} passwrod
 *
 * @props {object} nav 导航栏配置
 *   nav
 *   @props {object[]} menus
 *   @props {Function} onChange
 *   @props {Function} onClick
 *
 * @props {object} header 头部配置
 *   header
 *   @props {object} list
 *   @props {Function} onLogout
 *   @props {Function} setUserOps 设置用户名称下面的操作
 *
 * @props {object} breadcrumb 面包屑配置
 *   breadcrumb
 *   @props {boolean} hide
 *   @props {string} separator
 *
 * @props {object} footer 底部配置
 *   footer
 *   @props {string} title
 *   @props {string} content
 *
 * @props {Function} renderLogo({ boolean: collapsed, object: setting }) 自定义logo
 * @props {Function} renderNav({
 *  boolean: collapsed, object: setting, string[]: openKeys, string[]: selectedKeys
 * }) 自定义导航栏
 * @props {Function} renderHeader({ function: onCollapse, object: setting }) 自定义头部
 * @props {Function} renderBreadcrumb 自定义面包屑
 * @props {Function} renderFooter 自定义底部
 *
 */
class BasicLayout extends React.PureComponent {
  static defaultProps = {
    theme: 'dark',
    layout: 'sidemenu',
    contentWidth: 'Fluid',
    fixedHeader: false,
    fixSiderbar: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      collapsed: props.defaultCollapsed || false,
    };

    this.handleMenuCollapse = this.handleMenuCollapse.bind(this);
  }

  getLayoutStyle() {
    const { collapsed } = this.state;
    const { layout, fixSiderbar } = this.props;

    if (fixSiderbar && layout !== 'topmenu') {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  }

  getContentStyle() {
    const { fixedHeader } = this.props;

    return {
      margin: '24px 24px 0',
      paddingTop: fixedHeader ? 64 : 0,
      backgroundColor:'#fff',
      padding:'24px'
    };
  }

  handleMenuCollapse(collapsed) {
    this.setState({ collapsed });
  }

  renderBreadcrumbWrapper() {
    const { breadcrumb = {}, renderBreadcrumb, pathname, children } = this.props;
    const { hide } = breadcrumb;

    const { type, props } = children;
    const breadcrumbNameMap = [];

    if (type !== Switch) throw new Error("HLayout's children is not a Switch component");

    // 获取 Route 组件的 props
    React.Children.map(props.children, (child) => {
      const route = breadcrumbNameMap.find(({ path }) => path === child.props.path);

      if (!route && child.type === Route) {
        breadcrumbNameMap.push(child.props);
      }
    });

    const breadcrumbProps = {
      breadcrumb,
      breadcrumbNameMap,
      pathname,
    };
    return (
      <React.Fragment>
        {hide ? null : (
          <div style={{ marginBottom: 16 }}>
            {renderBreadcrumb ? renderBreadcrumb() : <Breadcrumb {...breadcrumbProps} />}
          </div>
        )}
      </React.Fragment>
    );
  }

  render() {
    const { collapsed } = this.state;
    const {
      children, user, nav, header, footer, pathname, siteName, renderLogo, renderNav, renderHeader, renderUser
    } = this.props;
    const setting = _.pick(this.props, ['theme', 'layout', 'contentWidth', 'fixedHeader', 'fixSiderbar']);
    const isTop = setting.layout === 'topmenu';

    const props = {
      pathname,
      siteName,
      setting,
      collapsed,
      nav,
      onCollapse: this.handleMenuCollapse,
      renderNav,
    };

    const siderMenuProps = {
      ...props,
      renderLogo,
    };

    const headerProps = {
      ...props,
      user,
      header,
      renderHeader,
      renderUser,
    };

    return (
      <Layout>
        {isTop ? null : <SiderMenu {...siderMenuProps} />}
        <Layout style={{ ...this.getLayoutStyle(), minHeight: '100vh', minWidth: 800 }} >
          <Header {...headerProps} />
          <Content style={this.getContentStyle()}>
            {/*{this.renderBreadcrumbWrapper()}*/}
            {children}
          </Content>
          {/*<Footer footer={footer} />*/}
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
