import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

const SubMenu = Menu.SubMenu;

// 从当前 pathname 中解析出对应的 openKeys 以及 selectedKey
function getRelativedKeysByRoutes({ nav, pathname }) {
  let index = 0;
  let selectedKeys = [];
  let openKeys = [];
  const { menus } = nav;
  const path = pathname;
  const traversedKeys = [];

  function traverseMenus(menus) {
    if (!menus) return;

    menus.forEach((menu) => {
      if (!Object.prototype.hasOwnProperty.call(menu, 'key')) {
        menu.key = `menuKey${index}`;
        index += 1;
      }

      traversedKeys.push(menu.key);

      // 保证两个路径的进行比较的时候，都是以'/'开头
      const routePath = path.startsWith('/') ? path : `/${path}`;
      const menuPath = (menu.path && menu.path.startsWith('/') ? menu.path : `/${menu.path}`) || '';

      // 如果当前路径匹配菜单
      if (routePath.startsWith(menuPath)) {
        openKeys = [...traversedKeys];
      }
      traverseMenus(menu.children);
      traversedKeys.pop();
    });
  }
  traverseMenus(menus);
  // openKeys 最后一个为 selectedKey
  if (openKeys.length) {
    selectedKeys = [openKeys.pop()];
  }
  return { openKeys, selectedKeys };
}

export default class BaseMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = getRelativedKeysByRoutes(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // 每次 routes 改变后，重设 selectedKeys
    if (nextProps.nav && nextProps.nav.menus && nextProps.pathname) {
      const { selectedKeys, openKeys } = getRelativedKeysByRoutes(nextProps);
      this.setState({
        selectedKeys,
        openKeys
      });
    }
  }

  handleKeysChange(keys) {
    const { openKeys, selectedKey } = keys;

    if (openKeys) {
      this.setState({ openKeys });
    }
    if (selectedKey) {
      this.setState({ selectedKeys: [selectedKey] });
    }

    this.props.onChange && this.props.onChange(keys);
  }

  handleClick({ key }) {
    const keys = { selectedKey: key };

    this.props.onClick && this.props.onClick(keys);
    this.handleKeysChange(keys);
  }

  renderDeepMenus(menus) {
    return menus.map(({ children, key, icon, title, path,hidden }) => {
      const iconTitle = (
        <span>
          {icon && <Icon type={icon} />}
          <span>{title}</span>
        </span>
      );
      if(!hidden){
        return (children ? (
          <SubMenu key={key} title={iconTitle}>
            {this.renderDeepMenus(children)}
          </SubMenu>
        ) : (
          <Menu.Item key={key}>
            <Link to={path} >{iconTitle}</Link>
          </Menu.Item>
        ));
      }

    });
  }

  render() {
    const { nav, setting, collapsed, mode, style, renderNav } = this.props;
    const { openKeys, selectedKeys } = this.state;
    const { menus = [] } = nav;
    const { theme, layout } = setting;
    const defaultProps = (collapsed || layout === 'topmenu') ? {} : { openKeys };

    return (
      <React.Fragment>
        {renderNav ? renderNav({ collapsed, setting, selectedKeys, ...defaultProps }) : (
          <Menu
              key="Menu"
              mode={mode}
              theme={theme}
              selectedKeys={selectedKeys}
              onOpenChange={(keys) => { this.handleKeysChange({ openKeys: keys }); }}
              onClick={this.handleClick}
              style={style}
              {...defaultProps}
          >
            {this.renderDeepMenus(menus)}
          </Menu>
        )}
      </React.Fragment>
    );
  }
}

