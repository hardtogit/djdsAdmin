import React from 'react';
import { Link } from 'dva/router';
import classNames from 'classnames';

export default ({ logo, setting, siteName, collapsed, renderLogo }) => {
  const { theme, layout } = setting;

  const lightCls = classNames({
    'basic-layout-top-menu-light': theme === 'light',
  });

  const className = layout === 'sidemenu' ? 'basic-layout-sider-logo' : 'basic-layout-top-menu-logo';

  return (
    <div className={lightCls}>
      {renderLogo ? renderLogo({ collapsed, setting }) : (
        <div key="logo" id="logo" className={className}>
          <Link to="/">
            <h1 style={{ fontSize: 18, marginLeft: 6 }}>
              {siteName.length > 10 ? `${siteName.slice(0, 10)}...` : siteName}
            </h1>
          </Link>
        </div>
      )}
    </div>
  );
};
