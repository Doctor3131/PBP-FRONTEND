import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchProductsAPI } from '../../services/productService'
import { addToCartAPI } from '../../services/cartService'
import ProductCard from '../../components/ProductCard'

const ShopPage = ({ searchQuery, selectedCategory, setSidebarOpen }) => {
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
    try {
      await addToCartAPI({ product_id: product.id, qty: 1 })
      alert(`${product.name} added to cart!`)
    } catch (error) {
      alert(`Error adding to cart: ${error.message}`)
    }
  }

  const handleAddToWishlist = (product) => {
    alert(`${product.name} added to wishlist!`)
  }

  useEffect(() => {
    setSidebarOpen(true)
    return () => setSidebarOpen(false)
  }, [setSidebarOpen])

  if (loading) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading products...</p>

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>{selectedCategory ? selectedCategory.name : 'All Products'}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.length > 0 ? (
          products.map(prod => (
            <ProductCard
              key={prod.id}
              product={prod}
              onClick={() => navigate(`/product/${prod.id}`)}
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
