import api from './api'

export const fetchProductsAPI = (params) => {
  return api.get('/products', { params })
}

export const fetchProductByIdAPI = (productId) => {
  return api.get(`/products/${productId}`)
}

