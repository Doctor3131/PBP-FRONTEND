import api from './api'

export const fetchUserOrdersAPI = (params) => {
  return api.get('/orders', { params })
}

export const createOrderAPI = (orderData) => {
  return api.post('/orders', orderData)
}

