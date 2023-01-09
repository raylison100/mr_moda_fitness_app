import axios from '@axios'

const token = JSON.parse(localStorage.getItem('accessToken'))

export const productService = defineStore('ProductService', {
  actions: {
    fetchDepartments() {
      return axios.get('/departments', {
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
    fetchCategories(params) {
      return axios.get('/categories', {
        params: params,
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
    fetchSubCategories(params) {
      return axios.get('/sub-categories', {
        params: params,
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
    storeProduct(body) {
      return axios.post('/products', body, {
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
  },
})
