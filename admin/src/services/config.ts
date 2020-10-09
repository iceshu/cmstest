import http from '../utils/http';

export async function getConfigR(data?: object) {
    return http('/api/config/list', data);
}
export async function createConfigR(data?: object) {
    return http.post('/manage/config', { data });
}
export async function updateConfigR(data: any) {
    const { id = '' } = data
    return http.put('/manage/config', { data, params: { id } });
}
export async function removeConfigR(params?: object) {
    return http.delete('/manage/config', { params });
}
export async function getConfigItemR(params: any) {
    return http.get('/api/post/getOne', { params });
}