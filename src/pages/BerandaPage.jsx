import { useState } from 'react'

// Pastikan semua komponen ini diimpor dari lokasi yang benar
import ProductCardUser from '../components/ProductCardUser.jsx'
import CartPanel from '../components/CartPanel.jsx'
import WishlistPanel from '../components/WishlistPanel.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'
import { useProducts } from '../hooks/useProducts.js'
import '../assets/index.css'

// Prop yang diterima dari App.jsx: onNavigate, userRole, cart, setCart, onLogout
export default function BerandaPage({ onNavigate, userRole, cart, setCart, onLogout }) {
  // === STATE DAN HOOKS ===
  const { products, categories } = useProducts()
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Home")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // PERBAIKAN: setWishlist HARUS didefinisikan di sini
  const [wishlist, setWishlist] = useState([])
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  // =======================


  // === LOGIKA CART ===
  const handleAddToCart = (product) => {
    if (userRole === 'visitor') {
      alert('Silakan login terlebih dahulu untuk menambahkan produk ke keranjang.')
      onNavigate('login')
      return
    }

    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id)
      if (existingItem) {
        if (existingItem.quantity >= existingItem.stock) {
          alert(`Stok ${product.name} sudah maksimal!`)
          return currentCart
        }
        return currentCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...currentCart, { ...product, quantity: 1, image: product.image, stock: product.stock }]
    })
  }

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

  const handleCheckout = () => {
    if (userRole === 'visitor') {
      alert('Silakan login terlebih dahulu untuk melakukan checkout')
      onNavigate('login')
      return
    }

    if (cart.length > 0) {
      onNavigate('checkout', { cartItems: cart })
      setIsCartOpen(false)
    } else {
      alert("Keranjang belanja kosong!")
    }
  }

  // === LOGIKA WISHLIST ===
  const handleAddToWishlist = (product) => {
    if (userRole === 'visitor') {
      alert('Silakan login terlebih dahulu untuk menambahkan produk ke Wishlist.')
      onNavigate('login')
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

  const handleRemoveFromWishlist = (id) => {
    setWishlist(currentWishlist => currentWishlist.filter(item => item.id !== id))
  }

  const handleMoveToCart = (product) => {
    handleAddToCart(product)
    handleRemoveFromWishlist(product.id)
  }

  // === LOGIKA NAVIGASI/FILTER ===
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat)
    setIsSidebarOpen(false)
  }

  // LOGIKA LOGOUT YANG SUDAH BENAR
  const handleLogoutClick = () => {
    // PERBAIKAN INI HANYA BISA BEKERJA KARENA setWishlist didefinisikan di atas.
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      onLogout() // Memanggil App.jsx's handleLogout
      setWishlist([]) // Membersihkan state Wishlist lokal
    }
  }

  // === LOGIKA TAMPILAN ===
  const filteredProducts = products.filter(p => {
    const categoryKey = p.category.toLowerCase().replace(/ /g, '-')
    const selectedKey = selectedCategory.toLowerCase().replace(/ /g, '-')

    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "Home" || categoryKey === selectedKey
    return matchesSearch && matchesCategory
  })

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
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
          onNavigate={onNavigate}
          onLogout={handleLogoutClick}
        />

        <div className="dashboard">
          <div className="product-list">
            {filteredProducts.map(product => (
              <ProductCardUser
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
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
