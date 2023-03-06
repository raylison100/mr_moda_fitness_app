import axios from '@axios'

const token = JSON.parse(localStorage.getItem('accessToken'))

export const spendingService = defineStore('SpendingService', {
  actions: {
    storeSpending(body) {
      return axios.post('/spendings', body, {
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
    fetchSpendings(params) {
      return axios.get('/spendings', {
        params: params,
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
    fetchSpendingId(id) {
      return axios.get(`/spendings/${id}`, {
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
    updateSpending(body, id) {
      return axios.put(`/spendings/${id}`, body, {
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
  },
})
