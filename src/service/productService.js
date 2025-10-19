import api from './api'

/**
 * Mendapatkan daftar produk dengan filter.
 * @param {object} params - { page, limit, search, category_id, sort }
 */
export const fetchProductsAPI = (params) => {
  // Axios akan secara otomatis mengubah objek params menjadi query string
  return api.get('/products', { params })
}

/**
 * Mendapatkan detail satu produk berdasarkan ID.
 * @param {number|string} productId
 */
export const fetchProductByIdAPI = (productId) => {
  return api.get(`/products/${productId}`)
}

// ... Anda bisa menambahkan createProduct, updateProduct, dst. di sini ...
