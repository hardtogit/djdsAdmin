## HBasicLayout 布局

`HBasicLayout`是 HLayout 组件的升级版，解决了很多遗留问题，添加了 header 和 footer 的配置，并且参考了[pro.ant.design](https://preview.pro.ant.design/list/table-list)的布局，让中后台系统更加的美观大气。

## DEMOS

## API

### Layout 组件参数

| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| siteName | 必填，站点名称 | string | - |
| logo | 站点logo | 是一个 import 进来的图片模块 | 有 |
| pathname | 必填，location中的路径 | string | - |
| defaultCollapsed | 是否折叠侧边导航 | boolean | - |
| layout | 布局，目前支持'topmenu'和'sidemenu'这2种 | string | 'sidemenu' |
| theme | 主题，目前支持'light'和'dark'这2种 | string | 'dark' |
| fixSiderbar | 是否固定侧边栏 | boolean | true |
| fixedHeader | 是否固定header | boolean | false |
| user | 必填，用户信息，目前只有一个username | object | - |
| nav | 侧边栏配置 | object | - |
| header | 头部配置 | object | - |
| breadcrumb | 面包屑配置 | object | - |
| footer | 底部配置 | object | - |
| renderNav | 自定义侧边栏 | Function() {} | - |
| renderHeader | 自定义头部 | Function() {} | - |
| renderBreadcrumb | 自定义面包屑 | Function() {} | - |
| renderFooter | 自定义底部 | Function() {} | - |

### user 用户信息
| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| username | 必填，用户名 | string | - |

### nav 导航栏配置
| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| menus | 菜单配置数据 | Object[] | - |
| onChange | menu 改变时调用 | Function(keys) {} | - |
| onClick | menu 被选中时调用 | Function(key) {} | - |

### header 头部配置
| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| list | 自定义头部右侧的区块 | Array[] | - |
| onLogout | 退出系统时调用 | Function() {} | - |
| setUserOps | 设置用户名称下面的操作 | Function() {} | - |

### breadcrumb 面包屑配置
| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| hide | 是否隐藏面包屑 | boolean | false |
| separator | 设置面包屑的分隔符 | string | - |
添加在 <Route /> 上面的 breadcrumbName 属性，可以是一个方法，也可以是一个字符串

### footer 底部配置
| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| title | 标题 | string/ReactNode | false |
| content | 内容 | string/ReactNode | - |

