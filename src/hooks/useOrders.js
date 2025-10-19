import { useState, useEffect, useCallback } from 'react'
// Impor fungsi API yang baru
import { fetchUserOrdersAPI } from '../services/orderService'

// Ganti nama hook agar lebih sesuai dengan fungsinya (mengambil order milik user)
const useUserOrders = (initialParams = { page: 1, limit: 10 }) => {
  const [orders, setOrders] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [params, setParams] = useState(initialParams)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      // Panggil fungsi API yang sudah menggunakan klien terpusat
      // Tidak perlu lagi mengirim header token secara manual
      const response = await fetchUserOrdersAPI(params)

      setOrders(response.data)
      setPagination(response.pagination)

    } catch (err) {
      // Error sudah diformat oleh interceptor di api.js
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [params]) // Hook akan dijalankan ulang jika params berubah

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  // Fungsi untuk mengubah halaman, dll.
  const updateQuery = (newParams) => {
    setParams(prev => ({ ...prev, ...newParams }))
  }

  return { orders, pagination, loading, error, updateQuery, refresh: fetchOrders }
}

export default useUserOrders
