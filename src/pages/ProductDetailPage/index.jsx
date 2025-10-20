import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchProductByIdAPI } from '../../services/productService'
import { addToCartAPI } from '../../services/cartService'
import { formatCurrency } from '../../utils/helpers'

const ProductDetailPage = ({ handleAddToWishlist }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true)
      try {
        const response = await fetchProductByIdAPI(id)
        setProduct(response.data)
      } catch (error) {
        console.error("Gagal mengambil detail produk:", error)
        navigate('/shop')
      } finally {
        setLoading(false)
      }
    }
    getProduct()
  }, [id, navigate])

  const handleAddToCart = async () => {
    if (!product) return
    try {
      await addToCartAPI({ product_id: product.id, qty: quantity })
      alert(`${quantity}x ${product.name} berhasil ditambahkan ke keranjang!`)
    } catch (error) {
      alert(`Gagal menambahkan ke keranjang: ${error.message}`)
    }
  }

  if (loading) return <p style={{ padding: '20px' }}>Memuat detail produk...</p>
  if (!product) return null

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate('/shop')} style={{ marginBottom: '20px' }}>&larr; Kembali ke Toko</button>
      <div style={{ display: 'flex', gap: '30px', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <img src={`https://via.placeholder.com/300x300.png/E8112D/FFFFFF?text=${product.name}`} alt={product.name} style={{ width: '300px', borderRadius: '8px' }} />
        <div style={{ flex: 1 }}>
          <h2>{product.name}</h2>
          <p style={{ fontSize: '24px', color: '#333', fontWeight: 'bold' }}>{formatCurrency(product.price)}</p>
          <p style={{ color: product.stock > 0 ? 'green' : 'red' }}>
            Stok: {product.stock > 0 ? product.stock : 'Habis'}
          </p>

          {product.stock > 0 && (
            <div style={{ margin: '20px 0' }}>
              <label htmlFor="quantity" style={{ marginRight: '10px' }}>Kuantitas:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min={1}
                max={product.stock}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ width: '60px', padding: '8px' }}
              />
            </div>
          )}

          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              style={{ padding: '12px 24px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginRight: '10px', opacity: product.stock === 0 ? 0.5 : 1 }}
            >
              Masukkan ke Keranjang
            </button>
            {/* <button */}
            {/*   onClick={() => handleAddToWishlist(product)} */}
            {/*   style={{ padding: '12px 24px', backgroundColor: '#fff', color: '#007bff', border: '1px solid #007bff', borderRadius: '6px', cursor: 'pointer' }} */}
            {/* > */}
            {/*   ❤️ Tambah ke Wishlist */}
            {/* </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
