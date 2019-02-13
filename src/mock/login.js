import Mock from 'mockjs'
import {param2Obj} from '../utils'
import {LoginUsers, Users} from './data/user'

let _Users = Users;

export default {
  loginByUsername: config => {
    let {username, password} = JSON.parse(config.body);
    let user = null;
    let hasUser = LoginUsers.some(u => {
      if(u.username === username && u.password === password) {
        user = JSON.parse(JSON.stringify(u));
        user.password = undefined;
        return true;
      }
    });
    if(hasUser) {
      return {code: 200, msg: '登录成功', user};
    }
    return {code: 500, msg: '账号或者密码错误'};
  },
  getUser: config => {
    let {username} = param2Obj(config.url);
    let user = null;
    LoginUsers.some(u => {
      if(u.username === username) {
        user = JSON.parse(JSON.stringify(u));
        user.password = undefined;
      }
    });
    return {user};
  },
  getUserList: config => {
    let {page, page_size, search, sex, begin_time, end_time} = param2Obj(config.url);
    page = parseInt(page);
    sex = parseInt(sex);
    let mockUsers = _Users.filter(user => {
      let birth = new Date(user.birth).getTime();
      if((search && user.name.indexOf(search) === -1)
        || (sex && user.sex !== sex) || (begin_time && end_time && (birth < begin_time || birth > end_time))) return false;
      return true;
    });
    let total = mockUsers.length;
    mockUsers = mockUsers.filter((u, index) => index < page_size * page && index >= page_size * (page - 1));
    return {users: mockUsers, count: total, current: page};
  },
  editUserSelf: config => {
    let userInfo = JSON.parse(config.body);
    let userInfo2 = null;
    let hasUser = LoginUsers.some(u => {
      if(u.username === userInfo.username) {
        userInfo2 = Object.assign({}, userInfo);
        return true;
      }
    });
    if(hasUser) {
      return {code: 200, msg: '修改成功', data: userInfo2};
    }
    return {code: 500, msg: '修改失败'};
  },
  deleteUser: config => {
    let userInfo = JSON.parse(config.body);
    _Users = _Users.filter(u => u.id !== userInfo.id);
    return {code: 200, msg: '删除成功'};
  },
  batchDeleteUser: config => {
    let {ids} = JSON.parse(config.body);
    ids = ids.split(',');
    _Users = _Users.filter(u => !ids.includes(u.id));
    return {code: 200, msg: '批量删除成功'};
  },
  editUser: config => {
    let userInfo = JSON.parse(config.body);
    _Users.some(u => {
      if(u.id === userInfo.id) {
        u.name = userInfo.name;
        u.addr = userInfo.addr;
        u.age = userInfo.age;
        u.birth = userInfo.birth;
        u.sex = userInfo.sex;
        return true;
      }
    });
    return {code: 200, msg: '编辑成功'};
  },
  addUser: config => {
    let params = JSON.parse(config.body);
    params.id = Mock.Random.guid();
    _Users.push(params);
    return {code: 200, msg: '新增成功'};
  },
}
