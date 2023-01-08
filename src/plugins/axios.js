import axios from 'axios'

const axiosIns = axios.create({
// You can add your headers here
// ================================
// baseURL: 'https://some-domain.com/api/',
// timeout: 1000,
// headers: {'X-Custom-Header': 'foobar'}
  baseURL: 'http://0.0.0.0:8000',
  withCredentials: true,
})

export default axiosIns
