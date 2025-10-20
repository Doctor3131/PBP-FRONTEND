import { useState, useEffect, useCallback } from 'react'
import { fetchUserOrdersAPI } from '../services/orderService'

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
      const response = await fetchUserOrdersAPI(params)

      setOrders(response.data)
      setPagination(response.pagination)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [params])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const updateQuery = (newParams) => {
    setParams(prev => ({ ...prev, ...newParams }))
  }

  return { orders, pagination, loading, error, updateQuery, refresh: fetchOrders }
}

export default useUserOrders
