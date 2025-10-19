import api from './api'

export const fetchProtectedCheckoutAPI = () => {
  return api.get('/checkout')
}
