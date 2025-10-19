import api from './api'

/**
 * Mendapatkan riwayat pesanan pengguna yang sedang login.
 * Sesuai dengan GET /orders dari OpenAPI.
 * @param {object} params - { page, limit, status }
 */
export const fetchUserOrdersAPI = (params) => {
  return api.get('/orders', { params })
}

/**
 * Membuat pesanan baru dari keranjang (checkout).
 * Sesuai dengan POST /orders dari OpenAPI.
 * @param {object} orderData - { address_text }
 */
export const createOrderAPI = (orderData) => {
  return api.post('/orders', orderData)
}

/**
 * CATATAN PENTING:
 * Endpoint untuk admin mengelola/mengubah status pesanan (`/admin/orders`)
 * TIDAK DITEMUKAN dalam file openapi.yaml yang Anda berikan.
 * * Jika endpoint tersebut ada (misal: PUT /admin/orders/{id}),
 * implementasinya akan seperti di bawah ini.
 * Untuk sekarang, fungsi ini saya beri komentar.
 */
/*
export const updateOrderStatusAPI = (orderId, newStatus) => {
    return api.put(`/admin/orders/${orderId}`, { status: newStatus });
};
*/
