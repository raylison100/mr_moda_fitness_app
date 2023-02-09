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
    fetchProducts(params) {
      return axios.get('/products', {
        params: params,
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
    fetchProductId(id) {
      return axios.get(`/products/${id}`, {
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
    updateProduct(body, id) {
      return axios.put(`/products/${id}`, body, {
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
    fetchProductCode(code) {
      return axios.get(`/products/code/${code}`, {
        headers: { 'Authorization': 'Bearer ' + token },
      })
    },
  },
})
