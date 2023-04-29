import axios from '@axios'

const token = JSON.parse(localStorage.getItem('accessToken'))

export const authService = defineStore('AuthService', {
  actions: {
    register(body) {
      return axios.post('/auth/register', body)
    },
    login(body) {
      return axios.post('/auth/login', body)
    },
    update(body, id) {
      return axios.put(`/auth/update/${id}`, body, {
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
  },
})
