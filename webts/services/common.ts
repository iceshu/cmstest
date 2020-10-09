import http from '~/utils/http'
export const userLoginR = (data = {}) => http.post('/api/common/login', data)
export const userRegR = (data = {}) => http.post('/api/common/reg', data)
export const getConfigInfoR = (params = {}) =>
    http.get('/api/config/getOne', { params })
