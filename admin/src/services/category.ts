import http from '../utils/http';

export async function getCategoryR(data?: object) {
    return http('/api/category/list', data);
}
export async function createCategoryR(data?: object) {
    return http.post('/manage/category', { data });
}
export async function updateCategoryR(data: any) {
    const { id = '' } = data
    return http.put('/manage/category', { data, params: { id } });
}
export async function removeCategoryR(params?: object) {
    return http.delete('/manage/category', { params });
}