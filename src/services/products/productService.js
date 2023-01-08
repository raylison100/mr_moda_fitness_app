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
  },
})
