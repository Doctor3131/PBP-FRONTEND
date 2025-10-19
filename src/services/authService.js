import api from './api'

export const loginAPI = (credentials) => {
  return api.post('/auth/login', credentials)
}

export const registerAPI = (userData) => {
  return api.post('/auth/register', userData)
}

export const getProfileAPI = () => {
  return api.get('/auth/profile')
}
