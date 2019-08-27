import React, { PureComponent } from 'react';
import { Select, Drawer, List, Switch, Divider, Icon, Tooltip } from 'antd';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import ThemeColor from './ThemeColor';
import BlockChecbox from './BlockChecbox';
import './index.less';

const { Option } = Select;

const Body = ({ children, title, style }) => (
  <div
    style={{
      ...style,
      marginBottom: 24,
    }}
  >
    <h3 className="setting-drawer-title">{title}</h3>
    {children}
  </div>
);

class SettingDrawer extends PureComponent {
  state = {
    collapse: false,
  };

  getLayoutSetting = () => {
    const {
      changeSetting,
      setting: { contentWidth, fixedHeader, layout, autoHideHeader, fixSiderbar },
    } = this.props;
    return [
      {
        title: '内容区域宽度',
        action: (
          <Select
            value={contentWidth}
            size="small"
            onSelect={value => changeSetting('contentWidth', value)}
            style={{ width: 80 }}
          >
            {/* 需要和实际项目结合使用，所以暂不提供 */}
            {/* {layout === 'sidemenu' ? null : (
              <Option value="Fixed">
                定宽
              </Option>
            )} */}
            <Option value="Fluid">
              流式
            </Option>
          </Select>
        ),
      },
      {
        title: '固定头部',
        action: (
          <Switch
            size="small"
            checked={!!fixedHeader}
            onChange={checked => changeSetting('fixedHeader', checked)}
          />
        ),
      },
      // TODO
      // {
      //   title: '下滑时隐藏 Header',
      //   disabled: !fixedHeader,
      //   disabledReason: '固定 Header 时可配置',
      //   action: (
      //     <Switch
      //       size="small"
      //       checked={!!autoHideHeader}
      //       onChange={checked => changeSetting('autoHideHeader', checked)}
      //     />
      //   ),
      // },
      {
        title: '固定侧边菜单',
        disabled: layout === 'topmenu',
        disabledReason: '侧边菜单布局时可配置',
        action: (
          <Switch
            size="small"
            checked={!!fixSiderbar}
            onChange={checked => changeSetting('fixSiderbar', checked)}
          />
        ),
      },
    ];
  };

  togglerContent = () => {
    const { collapse } = this.state;
    this.setState({ collapse: !collapse });
  };

  renderLayoutSettingItem = (item) => {
    const action = React.cloneElement(item.action, {
      disabled: item.disabled,
    });
    return (
      <Tooltip title={item.disabled ? item.disabledReason : ''} placement="left">
        <List.Item actions={[action]}>
          <span style={{ opacity: item.disabled ? '0.5' : '' }}>{item.title}</span>
        </List.Item>
      </Tooltip>
    );
  };

  render() {
    const { setting, changeSetting } = this.props;
    const { theme, primaryColor, layout, colorWeak } = setting;
    const { collapse } = this.state;
    return (
      <React.Fragment>
        <Drawer
          visible={collapse}
          width={300}
          onClose={this.togglerContent}
          placement="right"
          closable={false}
          handler={
            <div className="setting-drawer-handle">
              <Icon
                type={collapse ? 'close' : 'setting'}
                style={{
                  color: '#fff',
                  fontSize: 20,
                }}
              />
            </div>
          }
          onHandleClick={this.togglerContent}
          style={{
            zIndex: 999,
          }}
        >
          <div className="setting-drawer-content">
            <Body title="整体风格">
              <BlockChecbox
                list={[
                  {
                    key: 'dark',
                    url: 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
                    title: '暗色菜单',
                  },
                  {
                    key: 'light',
                    url: 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
                    title: '亮色菜单',
                  },
                ]}
                value={theme}
                onChange={value => changeSetting('theme', value)}
              />
            </Body>
            {/* <ThemeColor
              title={formatMessage({ id: 'app.setting.themecolor' })}
              value={primaryColor}
              onChange={color => this.changeSetting('primaryColor', color)}
            /> */}

            <Divider />

            <Body title="导航模式">
              <BlockChecbox
                list={[
                  {
                    key: 'sidemenu',
                    url: 'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg',
                    title: '侧边菜单',
                  },
                  {
                    key: 'topmenu',
                    url: 'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg',
                    title: '顶部菜单',
                  },
                ]}
                value={layout}
                onChange={value => changeSetting('layout', value)}
              />
            </Body>
            <List
              split={false}
              dataSource={this.getLayoutSetting()}
              renderItem={this.renderLayoutSettingItem}
            />
{/*

            <Divider />

            <Body title={formatMessage({ id: 'app.setting.othersettings' })}>
              <List.Item
                actions={[
                  <Switch
                    size="small"
                    checked={!!colorWeak}
                    onChange={checked => this.changeSetting('colorWeak', checked)}
                  />,
                ]}
              >
                {formatMessage({ id: 'app.setting.weakmode' })}
              </List.Item>
            </Body>
            <Divider />
            <CopyToClipboard
              text={JSON.stringify(omit(setting, ['colorWeak']), null, 2)}
              onCopy={() => message.success(formatMessage({ id: 'app.setting.copyinfo' }))}
            >
              <Button block icon="copy">
                {formatMessage({ id: 'app.setting.copy' })}
              </Button>
            </CopyToClipboard>
            <Alert
              type="warning"
              className={styles.productionHint}
              message={
                <div>
                  {formatMessage({ id: 'app.setting.production.hint' })}{' '}
                  <a
                    href="https://u.ant.design/pro-v2-default-settings"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    src/defaultSettings.js
                  </a>
                </div>
              }
            /> */}
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default SettingDrawer;
