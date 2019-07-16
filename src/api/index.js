/*
* 真实的react、vue项目中，我们会把所有向服务器发送具体请求的操作写
* 在api目录中（不写在组件内部，方便请求处理的统一管理）。
*
* index：是把axios或fetch等进行初始处理或二次封装的地方，以后在别的地
* 方用到的axios、fetch都是经过处理的。
* */

import axios from 'axios';
import Qs from 'qs';

// 请求的基础地址配置
axios.defaults.baseURL = 'http://localhost:8000';

// 是否允许跨越并携带cookie：从3000端口访问8000端口，需要跨越并携带cookie
axios.defaults.withCredentials = true;

// 把post、put请求方式，通过请求主体传递给服务器的data内容通
// 过Qs.stringify(date）方法统一转换为x-www-url-encoded的格式（name=wei&age=12）
axios.defaults.transformRequest = (data = {}) => Qs.stringify(data);

// 响应拦截器：把服务器返回的信息中的响应主体内容拦截返回，以后在then中获取的结果就是主体内容
axios.interceptors.response.use(result => result.data);

export default axios;