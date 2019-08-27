import React, { PureComponent } from 'react';
import { Menu, Icon, Dropdown, Popover, Avatar } from 'antd';
import './index.less';

const renderItem = ({ content, children, trigger = 'click', placement = 'bottomRight' }) => {
  if (content) {
    return (
      <Popover content={content} trigger={trigger} placement={placement} arrowPointAtCenter>
        <span className="basic-layout-header-right-content-action">
          {children}
        </span>
      </Popover>
    );
  }
  return (
    <span className="basic-layout-header-right-content-action">
      {children}
    </span>
  );
};

const renderMenu = list => (
  <Menu className="basic-layout-header-right-content-menu" selectedKeys={[]}>
    {list.map(({ key, icon, title, divider, disabled, onClick }, index) => [(
      <Menu.Item key={key} onClick={onClick} disabled={disabled}>
        {icon && <Icon type={icon} />}
        {title}
      </Menu.Item>
    ), divider ? <Menu.Divider key={index} /> : null])}
  </Menu>
);

export default class RightContent extends PureComponent {
  renderUser() {
    const { header = {} } = this.props;
    const { setUserOps, onLogout = () => console.log('请配置 onLogout 使退出登录生效！') } = header;
    const item = {
      key: 'logout',
      title: '退出登录',
      icon: 'logout',
      onClick: onLogout
    };
    const menuList = setUserOps ? setUserOps(item) : [item];

    return (
      <Dropdown overlay={renderMenu(menuList)}>
        <span className="basic-layout-header-right-content-action basic-layout-header-right-content-account">
          <React.Fragment>
            <Avatar
                size="small"
                className="basic-layout-header-right-content-account-avatar"
                icon="user"
            />
            <span>{JSON.parse(sessionStorage.getItem('credential_data')).login_name}</span>
          </React.Fragment>
        </span>
      </Dropdown>
    );
  }

  render() {
    const { setting, header = {} } = this.props;
    const { theme, layout } = setting;
    const { list = [] } = header;

    let className = 'basic-layout-header-right';
    if (theme === 'dark' && layout !== 'sidemenu') {
      className = 'basic-layout-header-right basic-layout-header-dark';
    }

    return (
      <div className={className}>
        {list.map(item => (
          <React.Fragment key={item.key}>{renderItem({ ...item, children: item.title })}</React.Fragment>
        ))}
        {this.renderUser()}
      </div>
    );
  }
}
