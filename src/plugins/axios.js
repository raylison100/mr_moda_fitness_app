import axios from 'axios'
import { initialAbility } from '@/plugins/casl/ability'
import { useAppAbility } from '@/plugins/casl/useAppAbility'

const baseUrl = import.meta.env.VITE_APP_API_URL;
const router = useRouter()

function handleUnauthorized(error) {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('userData')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userAbilities')
    window.location.reload()
  }

  return Promise.reject(error);
}

const axiosIns = axios.create({
// You can add your headers here
// ================================
// baseURL: 'https://some-domain.com/api/',
// timeout: 1000,
// headers: {'X-Custom-Header': 'foobar'}
  baseURL: baseUrl,
  withCredentials: true,
})

axiosIns.interceptors.response.use(null, handleUnauthorized);

export default axiosIns
