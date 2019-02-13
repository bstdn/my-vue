import Mock from 'mockjs'
import loginAPI from './login'

Mock.mock(/\/login/, 'post', loginAPI.loginByUsername);
Mock.mock(/\/user\/list/, 'get', loginAPI.getUserList);
Mock.mock(/\/user\/edit_self/, 'post', loginAPI.editUserSelf);
Mock.mock(/\/user\/remove/, 'post', loginAPI.deleteUser);
Mock.mock(/\/user\/batchremove/, 'post', loginAPI.batchDeleteUser);
Mock.mock(/\/user\/edit/, 'post', loginAPI.editUser);
Mock.mock(/\/user\/add/, 'post', loginAPI.addUser);
Mock.mock(/\/user/, 'get', loginAPI.getUser);

export default Mock
