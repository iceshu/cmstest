import http from '../utils/http';

export async function getTagR(data?: object) {
    return http('/api/tag/list', data);
}
export async function createTagR(data?: object) {
    return http.post('/manage/tag', { data });
}
export async function updateTagR(data: any) {
    const { id = '' } = data
    return http.put('/manage/tag', { data, params: { id } });
}
export async function removeTagR(params?: object) {
    return http.delete('/manage/tag', { params });
}