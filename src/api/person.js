/*
* 个人中心的所有请求都放在这里处理
* */
import axios from './index';

// 验证是否登录
export function checkLogin() {
	return axios.get('/personal/login');
}