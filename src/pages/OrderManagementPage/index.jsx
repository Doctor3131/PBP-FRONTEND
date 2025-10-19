import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useOrders from '../../hooks/useOrders'
import { formatCurrency, validStatuses, getStatusStyle } from '../../utils/helpers'
import { styles } from './styles'

const OrderManagementPage = ({ isAuthenticated }) => {
  const navigate = useNavigate()
  const { orders, loading, error, updateOrderStatus } = useOrders()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus)
  }

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Memuat Data Pesanan...</div>
  }

  if (error) {
    return <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>Error: {error}</div>
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📋 Manajemen Pesanan Admin</h2>
      <p>Ubah status pesanan menggunakan dropdown di kolom Status.</p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID Pesanan</th>
            <th style={styles.th}>Pembeli</th>
            <th style={styles.th}>Total</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Tanggal Pesanan</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={styles.td}>{order.id}</td>
              <td style={styles.td}>{order.buyer}</td>
              <td style={styles.td}>{formatCurrency(order.total)}</td>
              <td style={styles.td}>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  style={getStatusStyle(order.status)}
                >
                  {validStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td style={styles.td}>{new Date(order.date).toLocaleString('id-ID')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/')} style={styles.button}>
        Kembali ke Home
      </button>
    </div>
  )
}

export default OrderManagementPage
