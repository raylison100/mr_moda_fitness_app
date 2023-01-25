import axios from '@axios'

const token = JSON.parse(localStorage.getItem('accessToken'))

export const saleService = defineStore('SaleService', {
  actions: {
    storeSale(body) {
      return axios.post('/sales', body, {
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
    fetchSales(params) {
      return axios.get('/sales', {
        params: params,
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
    fetchSaleId(id) {
      return axios.get(`/sales/${id}`, {
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
    updateSale(body, id) {
      return axios.put(`/sales/${id}`, body, {
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
  },
})
