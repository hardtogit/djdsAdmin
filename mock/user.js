import Mock from 'mockjs';
var Random = Mock.Random;

export default {
  // 使用 mockjs 等三方库
  'POST /user/list': Mock.mock({
    'list|100': [{
      'id|+1': 1,
      name: '@cname',
      'phone|1': ['15528059582', '13422497817', '15815097652'],
      email: '@email',
      'status|1': ['有效','无效']
    }]
  }),
};
