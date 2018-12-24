import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {LoginUsers, Users} from './data/user';

let _Users = Users;

export default {
  start() {
    let mock = new MockAdapter(axios);

    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise(resolve => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if(u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });
          if(hasUser) {
            resolve([200, {code: 200, msg: '登录成功', user}]);
          } else {
            resolve([200, {code: 500, msg: '账号或者密码错误'}]);
          }
        }, 300);
      });
    });

    mock.onGet('/user').reply(config => {
      let {username} = config.params;
      return new Promise(resolve => {
        let user = null;
        setTimeout(() => {
          LoginUsers.some(u => {
            if(u.username === username) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
            }
          });
          resolve([200, {user: user}]);
        }, 300);
      });
    });

    mock.onPost('/user/edit_self').reply(config => {
      let userInfo = JSON.parse(config.data);
      return new Promise(resolve => {
        let userInfo2 = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if(u.username === userInfo.username) {
              userInfo2 = Object.assign({}, userInfo);
              return true;
            }
          });
          if(hasUser) {
            resolve([200, {code: 200, msg: '修改成功', data: userInfo2}]);
          } else {
            resolve([200, {code: 500, msg: '修改失败'}]);
          }
        }, 300);
      });
    });

    mock.onGet('/user/list').reply(config => {
      let {page, page_size} = config.params;
      let mockUsers = _Users;
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < page_size * page && index >= page_size * (page - 1));
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers,
            count: total,
            current: page,
          }]);
        }, 300);
      });
    });

    mock.onPost('/user/remove').reply(config => {
      let userInfo = JSON.parse(config.data);
      _Users = _Users.filter(u => u.id !== userInfo.id);
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([200, {code: 200, msg: '删除成功'}]);
        }, 300);
      });
    });

    mock.onPost('/user/batchremove').reply(config => {
      let {ids} = JSON.parse(config.data);
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([200, {code: 200, msg: '批量删除成功'}]);
        }, 300);
      });
    });

    mock.onPost('/user/edit').reply(config => {
      let userInfo = JSON.parse(config.data);
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
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([200, {code: 200, msg: '编辑成功'}])
        }, 300);
      });
    });
  }
}
