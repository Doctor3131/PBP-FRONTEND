import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ecom_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'Terjadi kesalahan pada server.'
    if (error.response?.status === 401) {
      // Logika untuk logout jika tidak terautentikasi
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(new Error(errorMessage))
  }
)

export default api
