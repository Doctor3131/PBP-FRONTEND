// Fungsi untuk memformat mata uang
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount)
}

// Daftar status yang valid untuk konsistensi
export const validStatuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELED"]

// Fungsi untuk menentukan style status
export const getStatusStyle = (status) => {
  const baseStyle = {
    padding: '6px 10px',
    borderRadius: '4px',
    fontWeight: 'bold',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    minWidth: '120px',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
  }

  switch (status) {
    case 'PENDING': return { ...baseStyle, backgroundColor: '#ffc107', color: '#333' }
    case 'PROCESSING': return { ...baseStyle, backgroundColor: '#007bff' }
    case 'SHIPPED': return { ...baseStyle, backgroundColor: '#17a2b8' }
    case 'DELIVERED': return { ...baseStyle, backgroundColor: '#28a745' }
    case 'CANCELED': return { ...baseStyle, backgroundColor: '#dc3545' }
    default: return { ...baseStyle, backgroundColor: '#6c757d' }
  }
}
