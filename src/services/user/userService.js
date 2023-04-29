import axios from '@axios'

const token = JSON.parse(localStorage.getItem('accessToken'))

export const userService = defineStore('UserService', {
  actions: {
    fetchAbilities() {
      return axios.get('/users/abilities', {
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
    fetchUserId(id) {
      return axios.get(`/users/${id}`, {
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
    fetchUsers() {
      return axios.get(`/users/`, {
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
  },
})
