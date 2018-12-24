import axios from 'axios'

export const Login = params => { return axios.post('/login', params).then(res => res.data) };
export const getUser = params => { return axios.get(`/user`, { params: params }); };
export const editUserSelf = params => { return axios.post('/user/edit_self', params).then(res => res.data); };
export const getUserList = params => { return axios.get('/user/list', { params: params })};
export const deleteUser = params => { return axios.post('/user/remove', params).then(res => res.data); };
export const batchDeleteUser = params => { return axios.post('/user/batchremove', params).then(res => res.data); };
export const editUser = params => { return axios.post('/user/edit', params).then(res => res.data); };
export const addUser = params => { return axios.post('/user/add', params).then(res => res.data); };
