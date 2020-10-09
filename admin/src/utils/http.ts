import store2 from 'store2';
import { history } from 'umi';
import request from 'umi-request';


const http = request;


http.interceptors.request.use((url: string, options: any) => {
  let headers = {}
  if (localStorage.token) { // 判断token是否存在
    headers = { Authorization: store2('token') };
  }
  return {
    url,
    options: {
      ...options,
      headers,
      interceptors: true
    },
  };
});

http.interceptors.response.use((response, options) => {
  console.log('response', response)
  if (response.status === 886) {
    return Promise.reject(response);
  }
  if (response.status === 401) {
    history.replace(`/user/login`);
    return Promise.reject(response);
  }
  return response;
});

export default http;
