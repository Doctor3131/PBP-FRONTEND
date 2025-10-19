import axios from 'axios'

// Buat instance axios dengan konfigurasi default
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor untuk menambahkan token otentikasi ke setiap request
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    // Nama token 'ecom_token' disesuaikan dari kode Anda sebelumnya.
    const token = localStorage.getItem('ecom_token')

    if (token) {
      // Jika token ada, tambahkan ke header Authorization
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // Lakukan sesuatu jika ada error pada request
    return Promise.reject(error)
  }
)

// Interceptor untuk menangani respons error secara global (opsional tapi bagus)
api.interceptors.response.use(
  (response) => {
    // Setiap respons sukses akan langsung mengembalikan data
    return response.data
  },
  (error) => {
    // Menangani error secara lebih konsisten
    const errorMessage = error.response?.data?.message || error.message || 'Terjadi kesalahan pada server.'

    // Anda bisa menambahkan logika lain di sini, misal:
    // jika status 401 (Unauthorized), logout pengguna
    if (error.response?.status === 401) {
      // localStorage.clear();
      // window.location.href = '/login';
    }

    return Promise.reject(new Error(errorMessage))
  }
)

export default api
