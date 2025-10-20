import api from './api'

export const getCartAPI = () => {
  return api.get('/cart')
}

export const addToCartAPI = (item) => {
  return api.post('/cart', item)
}

export const updateCartItemAPI = (itemId, qty) => {
  return api.put(`/cart/items/${itemId}`, { qty })
}

export const removeCartItemAPI = (itemId) => {
  return api.delete(`/cart/items/${itemId}`)
}

export const clearCartAPI = () => {
  return api.delete('/cart/clear')
}
