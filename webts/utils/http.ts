import axios, { AxiosError, AxiosResponse } from 'axios'

let baseURL: any = ''
// The server-side needs a full url to works
baseURL = process.env.BASE_URL || `http://127.0.0.1:3000`
const Axios = axios.create({
  timeout: 80000,
  baseURL,
})

Axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // if (!data.status && data.errormsg === 'crypto/rsa: decryption error' ) {
    //     if (!location.href.indexOf('loginClient'):any > -1) {
    //         alert('登陆过期,请重新登陆')
    //         location.href = '/login'
    //         return
    //       }
    //       return
    // }
    return response
  },
  function (error: AxiosError) {
    return Promise.reject(error)
  }
)
export default Axios
