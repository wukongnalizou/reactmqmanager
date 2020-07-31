import axios from 'axios';
import qs from 'qs';
import router from 'umi/router';
import UUID from 'node-uuid';
// import { notification } from 'antd';
import { noHeaderUrl, getCodeUrl, refreshTokenUrl, baseUrl } from './settings';
import { setData, getData, removeData } from './localData';

// const request = axios;
let refreshConfig = null;
let refreshStatus = true;
let refreshType = '';
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = baseUrl;
// request拦截器, 改变url 或 options.
axios.interceptors.request.use(config => {
  // console.log(window.g_app._store)
  const accessToken = localStorage.getItem('access_token');
  // if (config.method === 'post') {
  //   config.data = qs.stringify(config.data);
  // }
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// response拦截器, 处理response
axios.interceptors.response.use(response => {
  const res = response.data;
  if (!res.success) {
    const code = res.subCode;
    if (res.code === 'UNAUTHORIZED' && res.subCode === '401') {
      if (refreshStatus) {
        refreshConfig = response.config;
        const config = {
          url: refreshTokenUrl,
          data: {
            refreshToken: getData('refresh_token'),
            type: 1,
          },
          method: 'post',
        };
        removeData('access_token');
        axios(config).then(refreshReq => {
          if (refreshReq.success) {
            setData('access_token', refreshReq.data.access_token);
            // token过期，重发请求
            window.g_app._store.dispatch({
              type: refreshType,
              payload: refreshConfig.data,
            })
            // axios(refreshConfig);
          } else {
            refreshStatus = false;
            removeData('access_token');
            removeData('refresh_token');
            router.push('/user/login');
          }
        });
      }
    } else if (res.code === 'UNAUTHORIZED' && res.subCode !== '401') {
      router.push('/user/login');
    }
  }
  return res;
});
const request = (url, param, type) => {
  refreshType = type;
  return axios({
    url,
    method: param.method,
    data: param.data,
  })
}
export default request;
