import http from '~/utils/http'
/**
 * 获取配置
 */
export const getHomeConfig = (label: any) =>
  http.get('/api/config', { params: { label } })
/**
 * 获取文章列表
 */
export const getPostList = (params: any) =>
  http.get('/api/post/list', { params })

export const getPostInfo = (params: object) =>
  http.get('/api/post/getOne', { params })

export const getPostInfoByQuery = (query: Object) =>
  http.get('/api/post', { params: query })

export const getConfigInfoByQuery = (query: Object) =>
  http.get('/api/config', { params: query })

export const getTagsR = (params?: object) =>
  http.get('/api/tag/list', { params })

export const getPostNearByR = (params?: object) =>
  http.get('/api/post/getPostNearBy', { params })
