import { useState, useEffect, useCallback } from 'react'
import { getCartAPI, updateCartItemAPI, removeCartItemAPI } from '../../services/cartService'
import { formatCurrency } from '../../utils/helpers'

const CartPage = () => {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchCart = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getCartAPI()
      setCart(response.data)
    } catch (error) {
      console.error("Gagal mengambil keranjang:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const handleUpdateQuantity = async (itemId, qty) => {
    if (qty < 1) return
    try {
      await updateCartItemAPI(itemId, qty)
      fetchCart()
    } catch (error) {
      alert(`Gagal memperbarui kuantitas: ${error.message}`)
    }
  }

  const handleRemoveItem = async (itemId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      try {
        await removeCartItemAPI(itemId)
        fetchCart()
      } catch (error) {
        alert(`Gagal menghapus item: ${error.message}`)
      }
    }
  }

  if (loading) return <p style={{ padding: '20px' }}>Memuat keranjang...</p>
  if (!cart || cart.items.length === 0) return <p style={{ padding: '20px' }}>Keranjang belanja Anda kosong.</p>

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Keranjang Belanja</h2>
      {cart.items.map((item) => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '15px 0' }}>
          <div>
            <h4>{item.product_name}</h4>
            <p>{formatCurrency(item.price)}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="number"
              value={item.qty}
              min={1}
              max={item.available_stock}
              onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
              style={{ width: '60px', marginRight: '10px', padding: '5px' }}
            />
            <button onClick={() => handleRemoveItem(item.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>
              Hapus
            </button>
          </div>
        </div>
      ))}
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <h3>Total: {formatCurrency(cart.total)}</h3>
        <button style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Lanjut ke Checkout
        </button>
      </div>
    </div>
  )
}

export default CartPage
