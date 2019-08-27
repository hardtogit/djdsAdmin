import React from 'react';
import { HBasicLayout } from 'carno';

import SettingDrawer from './SettingDrawer';

class HLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    const { fixSiderbar = true } = props;
    this.state = {
      collapsed: this.props.collapsed || false,
      setting: {
        theme: this.props.theme || 'dark',
        layout: this.props.layout || 'sidemenu',
        contentWidth: 'Fluid',
        fixedHeader: this.props.fixedHeader || false,
        fixSiderbar,
      },
    };

    this.changeSetting = this.changeSetting.bind(this);
  }

  changeSetting(key, value) {
    const { setting } = this.state;
    const nextSetting = { ...setting };

    if (key === 'fixedHeader' && !value) {
      nextSetting.autoHideHeader = false;
    }

    this.setState({
      setting: { ...nextSetting, [key]: value },
    });
  }

  renderSettingDrawer() {
    const { setting } = this.state;
    const settingProps = {
      setting,
      changeSetting: this.changeSetting,
    };

    return <SettingDrawer {...settingProps} />;
  }

  render() {
    const { setting, collapsed } = this.state;
    const { children } = this.props;

    const layoutProps = {
      ...this.props,
      ...setting,
      collapsed,
    };

    return (
      <React.Fragment>
        <HBasicLayout {...layoutProps}>{children}</HBasicLayout>
        {this.renderSettingDrawer()}
      </React.Fragment>
    );
  }
}

export default HLayout;
