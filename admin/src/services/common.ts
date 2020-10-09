import http from '../utils/http';


export async function backUpR() {
    return http.post('/manage/backupdata');
}