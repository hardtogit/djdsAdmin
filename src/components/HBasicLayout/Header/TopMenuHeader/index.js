import React, { PureComponent } from 'react';
import RightContent from '../RightContent';
import BaseMenu from '../../SiderMenu/BaseMenu';
import Logo from '../../SiderMenu/Logo';
import './index.less';

export default class TopNavHeader extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 330 - 165 - 4
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 330 - 165 - 4
    };
  }

  render() {
    const { setting } = this.props;
    const { theme, contentWidth } = setting;
    const { maxWidth } = this.state;
    return (
      <div className={`basic-layout-top-menu-head ${theme === 'light' ? 'basic-layout-top-menu-light' : ''}`}>
        <div
            ref={(ref) => {
            this.maim = ref;
          }}
            className={`basic-layout-top-menu-head-main ${contentWidth === 'Fixed' ? 'basic-layout-top-menu-head-wide' : ''}`}
        >
          <div className="basic-layout-top-menu-head-main-left">
            <Logo {...this.props} styles={{}} />
            <div
                style={{
                maxWidth
              }}
            >
              <BaseMenu {...this.props} style={{ border: 'none', height: 64 }} />
            </div>
          </div>
          <RightContent {...this.props} />
        </div>
      </div>
    );
  }
}
