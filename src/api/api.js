import axios from 'axios'

export const Login = params => { return axios.post('/login', params).then(res => res.data) };
