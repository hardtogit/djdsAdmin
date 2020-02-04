export default [{
  title: 'banner管理',
  key: 'banner',
  name: 'banner',
  path: '/banner',
  icon: 'picture'
},{
  title: 'app内容管理',
  key: 'content',
  name: 'content',
  path: '/content',
  icon: 'project',
  children:[{
    title: '课程内容编辑',
    key: 'class',
    name: 'class',
    path: '/content/class'
    // icon: 'project'
  },{
    title: '首页资讯编辑',
  key: 'news',
  name: 'news',
  path: '/content/news'
  // icon: 'project'
}]
},{
  title: '课程付费配置',
  key: 'payRule',
  name: 'payRule',
  path: '/payRule',
  icon: 'transaction'
},{
  title: 'VR训练配置',
  key: 'vrSetting',
  name: 'vrSetting',
  path: '/vrSetting',
  icon: 'setting',
  children:[
    {
      title: 'VR场景配置',
      name: 'vrSettingScene',
      path: '/vrSetting/scene'
    },{
      title: 'VR多媒体配置',
      name: 'vrSettingMedia',
      path: '/vrSetting/media'
    }
  ]
},{
  title: '任务配置',
  key: 'task',
  name: 'task',
  path: '/task',
  icon: 'shake'
},{
  title: '用户管理',
  key: 'userManage',
  name: 'userManage',
  path: '/userManage',
  icon: 'user'
},
  {
    title: '订单管理',
    key: 'order',
    name: 'order',
    path: '/order',
    icon: 'file-done'
  },
  {
    title: '建议与反馈',
    key: 'feedBack',
    name: 'feedBack',
    path: '/feedBack',
    icon: 'file-done'
  },
  {
  title: '登陆',
  key: 'login',
  name: 'login',
  path: '/login',
  hidden:true
}
];
