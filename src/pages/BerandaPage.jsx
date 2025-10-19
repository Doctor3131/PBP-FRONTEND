// src/pages/BerandaPage.jsx

import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom' // 1. Import useNavigate dan Link

// Komponen lainnya
import ProductCardUser from '../components/ProductCardUser.jsx'
import CartPanel from '../components/CartPanel.jsx'
import WishlistPanel from '../components/WishlistPanel.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'
import { useProducts } from '../hooks/useProducts.js'
import '../assets/index.css'

// 2. Hapus 'onNavigate' dari props
export default function BerandaPage({ userRole, cart, setCart, wishlist, setWishlist, onLogout, isAuthenticated }) {
  const navigate = useNavigate() // 3. Inisialisasi hook
  const { products, categories } = useProducts()
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Home")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      setWishlist([]) // Kosongkan wishlist jika user logout
    }
  }, [isAuthenticated, setWishlist])

  // === LOGIKA CART & WISHLIST (diperbarui) ===
  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert('Silakan login untuk menambahkan produk ke keranjang.')
      navigate('/login') // 4. Gunakan navigate
      return
    }
    // ... (sisa logika sama)
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id)
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          alert(`Stok ${product.name} sudah maksimal!`)
          return currentCart
        }
        return currentCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  const handleAddToWishlist = (product) => {
    if (!isAuthenticated) {
      alert('Silakan login untuk menambahkan produk ke Wishlist.')
      navigate('/login') // 4. Gunakan navigate
      return
    }
    setWishlist(currentWishlist => {
      if (currentWishlist.some(item => item.id === product.id)) {
        alert(`${product.name} sudah ada di Wishlist!`)
        return currentWishlist
      }
      alert(`${product.name} ditambahkan ke Wishlist!`)
      return [...currentWishlist, product]
    })
  }

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout') // 4. Gunakan navigate
      setIsCartOpen(false)
    } else {
      alert("Keranjang belanja kosong!")
    }
  }

  // ... (Sisa fungsi lain seperti handleUpdateQuantity, handleRemoveItem, dll. tidak perlu diubah)
  // ... (Sisa fungsi lain tidak berubah)
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id)
      return
    }
    setCart(currentCart =>
      currentCart.map(item => {
        if (item.id === id) {
          const validQuantity = Math.min(newQuantity, item.stock)
          return { ...item, quantity: validQuantity }
        }
        return item
      })
    )
  }
  const handleRemoveItem = (id) => {
    setCart(currentCart => currentCart.filter(item => item.id !== id))
  }
  const handleRemoveFromWishlist = (id) => {
    setWishlist(currentWishlist => currentWishlist.filter(item => item.id !== id))
  }
  const handleMoveToCart = (product) => {
    handleAddToCart(product)
    handleRemoveFromWishlist(product.id)
  }
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat)
    setIsSidebarOpen(false)
  }
  const filteredProducts = products.filter(p => {
    const categoryKey = p.category.toLowerCase().replace(/ /g, '-')
    const selectedKey = selectedCategory.toLowerCase().replace(/ /g, '-')
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "Home" || categoryKey === selectedKey
    return matchesSearch && matchesCategory
  })

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 0), 0)
  const wishlistCount = wishlist.length


  return (
    <div className={`app-container ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      <main className="main-content">
        <Header
          search={search}
          setSearch={setSearch}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onCartClick={() => setIsCartOpen(true)}
          onWishlistClick={() => setIsWishlistOpen(true)}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          userRole={userRole}
          onLogout={onLogout}
        // 5. Hapus prop onNavigate dari sini
        />

        <div className="dashboard">
          <div className="product-list">
            {filteredProducts.map(product => (
              <ProductCardUser
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              // 5. Hapus prop onNavigate dari sini
              />
            ))}
          </div>
        </div>
      </main>

      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <WishlistPanel
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveItem={handleRemoveFromWishlist}
        onMoveToCart={handleMoveToCart}
      />
    </div>
  )
}
