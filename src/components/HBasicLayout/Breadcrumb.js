import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import _ from 'lodash';
// import { REMAIN_CORE_STATE } from '../addons/model';

// 点击面包屑菜单，则设置REMAIN_CORE_STATE为true，进入新的路由后，如果调用reset action 则只更新部分状态state
function handleLinkClick() {
  // localStorage.setItem(REMAIN_CORE_STATE, true);
}

export default class BreadcrumbView extends React.PureComponent {
  getBreadcrumbByPath(breadcrumbNameMap) {
    const { pathname } = this.props;
    const pathSnippets = pathname.split('/').filter(i => i);
    const arr = [];

    pathSnippets.forEach((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

      breadcrumbNameMap.forEach((route) => {
        const match = pathToRegexp(route.path).exec(url);

        if (match) {
          const params = match.slice(1);
          arr.push({ ...route, params, url });
        }
      });
    });

    return arr;
  }

  render() {
    const { breadcrumb = {}, breadcrumbNameMap } = this.props;
    const { separator } = breadcrumb;

    const usedBreadcrumbs = this.getBreadcrumbByPath(_.cloneDeep(breadcrumbNameMap));

    const breadcrumbItems = usedBreadcrumbs.map(({ url, breadcrumbName, params }, index) => {
      const name = typeof breadcrumbName === 'function' ? breadcrumbName({ params }) : breadcrumbName;

      return (
        <Breadcrumb.Item key={url}>
          {index === usedBreadcrumbs.length - 1 ? (
            <span>{name}</span>
          ) : (
            <Link to={url} onClick={handleLinkClick}>
              {name}
            </Link>
          )}
        </Breadcrumb.Item>
      );
    });

    return <Breadcrumb separator={separator || '>'}>{breadcrumbItems}</Breadcrumb>;
  }
}
