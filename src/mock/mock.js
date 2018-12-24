import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {LoginUsers} from './data/user';

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
  }
}
