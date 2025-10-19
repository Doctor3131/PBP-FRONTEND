import api from './api'


export const loginAPI = (credentials) => {
  return api.post('/login', credentials)
}

export const registerAPI = (userData) => {
  return api.post('/register', userData)
}

export const getProfileAPI = () => {
  return api.get('/auth/profile')
}
