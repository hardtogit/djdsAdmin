import React, { PureComponent } from 'react';
import { Icon } from 'antd';
// import Debounce from 'lodash/debounce';
import RightContent from '../RightContent';
import './index.less';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    // this.triggerResizeEvent.cancel();
  }
  /* eslint-disable*/
  // @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  render() {
    const { collapsed, logo } = this.props;

    return (
      <div className="basic-layout-side-menu-header">
        <Icon
          className="basic-layout-side-menu-header-trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />

        <RightContent {...this.props} />
      </div>
    );
  }
}
