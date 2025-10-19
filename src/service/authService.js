import api from './api'

/**
 * Mendaftarkan pengguna baru.
 * @param {object} userData - { name, email, password }
 */
export const registerAPI = (userData) => {
  return api.post('/auth/register', userData)
}

/**
 * Login pengguna.
 * @param {object} credentials - { email, password }
 */
export const loginAPI = (credentials) => {
  return api.post('/auth/login', credentials)
}

/**
 * Mendapatkan profil pengguna yang sedang login.
 */
export const getProfileAPI = () => {
  return api.get('/auth/profile')
}
