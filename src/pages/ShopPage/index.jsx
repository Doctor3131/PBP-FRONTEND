import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchProductsAPI } from '../../services/productService'
import { addToCartAPI } from '../../services/cartService'
import ProductCard from '../../components/ProductCard'

const ShopPage = ({ searchQuery, selectedCategory, setSidebarOpen, isAuthenticated }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      try {
        const params = {
          search: searchQuery,
          category_id: selectedCategory && selectedCategory.id !== 0 ? selectedCategory.id : undefined,
          limit: 100,
        }
        const response = await fetchProductsAPI(params)
        setProducts(response.data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }
    getProducts()
  }, [searchQuery, selectedCategory])

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      alert('Silakan login terlebih dahulu untuk menambahkan produk ke keranjang!')
      navigate('/login')
      return
    }

    try {
      await addToCartAPI({ product_id: product.id, qty: 1 })
      alert(`${product.name} added to cart!`)
    } catch (error) {
      alert(`Error adding to cart: ${error.message}`)
    }
  }

  const handleAddToWishlist = (product) => {
    if (!isAuthenticated) {
      alert('Silakan login terlebih dahulu untuk menambahkan produk ke wishlist!')
      navigate('/login')
      return
    }
    alert(`${product.name} added to wishlist! (Note: This needs to be connected to App state)`)
  }

  const handleProductClick = (productId) => {
    if (!isAuthenticated) {
      alert('Silakan login terlebih dahulu untuk melihat detail produk!')
      navigate('/login')
      return
    }
    navigate(`/product/${productId}`)
  }

  useEffect(() => {
    if (isAuthenticated) {
      setSidebarOpen(true)
    }
    return () => setSidebarOpen(false)
  }, [setSidebarOpen, isAuthenticated])

  if (loading) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading products...</p>

  return (
    <div style={{ padding: '20px' }}>
      {!isAuthenticated && (
        <div style={{ backgroundColor: '#fff3cd', border: '1px solid #ffc107', borderRadius: '6px', padding: '15px', marginBottom: '20px', textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#856404' }}>
            🔒 <strong>Login</strong> untuk mengakses fitur lengkap seperti keranjang belanja, wishlist, dan detail produk!
          </p>
        </div>
      )}

      <h2 style={{ marginBottom: '20px' }}>{selectedCategory ? selectedCategory.name : 'All Products'}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.length > 0 ? (
          products.map(prod => (
            <ProductCard
              key={prod.id}
              product={prod}
              onClick={() => handleProductClick(prod.id)}
              addToCart={handleAddToCart}
              addToWishlist={handleAddToWishlist}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  )
}

export default ShopPage
