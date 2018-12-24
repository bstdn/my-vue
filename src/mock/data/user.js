import Mock from 'mockjs'

const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    name: 'admin',
    telephone: '13800000000',
    email: 'admin@vue.com',
  }
];

const Users = [];

for(let i = 0; i < 90; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(), // 随机生成一个id
    name: Mock.Random.cname(), // 随机生成一个常见的中文姓名。
    addr: Mock.mock('@county(true)'), // @county(true)为数据模板
    'age|18-60': 1, // 'age|18-60': 1 为数据模板
    birth: Mock.Random.date(), // 随机生成日期
    sex: Mock.Random.integer(1, 2), // 随机生成整数, min:0, max1
  }));
}

export {LoginUsers, Users}
