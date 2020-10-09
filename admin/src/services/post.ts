import http from '../utils/http';

/**
 * 获取文章列表
 */
export async function getPostsR(params: any) {
  return http.get('/api/post/list', { params });
}
/**
 * 增加文章
 */
export async function addPostR(odata: any) {
  const { data } = odata;
  return http.post('/manage/post', { data });
}

export async function uploadPostR(odata: any) {
  const { data, params } = odata;
  return http.put('/manage/post', { params, data });
}

export async function getPostItemR(params: any) {
  return http.get('/api/post/getOne', { params });
}

export async function removePostR(params?: object) {
  return http.delete('/manage/post', { params });
}

export async function uploadFileR(data?: object) {
  return http.post('/manage/upload', { data });
}
