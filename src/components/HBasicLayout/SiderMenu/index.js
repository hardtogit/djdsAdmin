import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';
import Logo from './Logo';
import BaseMenu from './BaseMenu';
import './index.less';

const { Sider } = Layout;

export default class SiderMenu extends PureComponent {
  render() {
    const { setting, collapsed, onCollapse } = this.props;
    const { fixSiderbar, theme } = setting;

    const siderCls = classNames('basic-layout-sider', {
      'basic-layout-sider-light': theme === 'light',
      'basic-layout-sider-fixSiderbar': fixSiderbar
    });

    return (
      <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          onCollapse={onCollapse}
          width={256}
          theme={theme}
          className={siderCls}
      >
        <Logo {...this.props} styles={{}} />
        <BaseMenu
            {...this.props}
            mode="inline"
            handleOpenChange={this.handleOpenChange}
            onOpenChange={this.handleOpenChange}
            style={{ padding: '16px 0', width: '100%' }}
        />
      </Sider>
    );
  }
}
