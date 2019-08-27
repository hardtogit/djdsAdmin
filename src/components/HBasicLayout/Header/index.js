import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import Animate from 'rc-animate';
import SiderMenuHeader from './SiderMenuHeader';
import TopMenuHeader from './TopMenuHeader';
import './index.less';

const { Header } = Layout;

class HeaderView extends PureComponent {
  state = {
    visible: true,
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true,
      };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
  }

  getHeadWidth = () => {
    const { collapsed, setting } = this.props;
    const { fixedHeader, layout } = setting;
    if (!fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
  };

  handScroll = () => {
    const { autoHideHeader } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true,
          });
          this.scrollTop = scrollTop;
          return;
        }
        if (scrollTop > 300 && visible) {
          this.setState({
            visible: false,
          });
        }
        if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true,
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
    this.ticking = false;
  };

  renderRealHeader() {
    const { setting, onCollapse, renderHeader } = this.props;
    const { layout } = setting;
    const isTop = layout === 'topmenu';

    if (renderHeader) return renderHeader({ setting, onCollapse });
    if (isTop) {
      return (
        <TopMenuHeader mode="horizontal" {...this.props} />
      );
    }
    return (
      <SiderMenuHeader {...this.props} />
    );
  }

  render() {
    const { setting } = this.props;
    const { fixedHeader } = setting;
    const { visible } = this.state;
    const width = this.getHeadWidth();

    const HeaderDom = visible ? (
      <Header style={{ padding: 0, width }} className={fixedHeader ? 'basic-layout-header-fixedHeader' : ''}>
        {this.renderRealHeader()}
      </Header>
    ) : null;
    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

export default HeaderView;
