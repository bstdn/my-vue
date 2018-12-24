import axios from 'axios'

export const Login = params => { return axios.post('/login', params).then(res => res.data) };
export const getUser = params => { return axios.get(`/user`, { params: params }); };
export const editUserSelf = params => { return axios.post('/user/edit_self', params).then(res => res.data); };
