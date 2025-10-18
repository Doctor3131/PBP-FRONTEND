import { useState } from "react"
import { useNavigate } from "react-router-dom" // <-- PENTING: Gunakan useNavigate di sini!

import ProductCardUser from "../components/ProductCard.jsx"
import Sidebar from "../components/Sidebar.jsx"
import CartPanel from "../components/CartPanel"
import Header from "../components/Header"
import { useProducts } from "../hooks/useProducts"
import "../assets/index.css"

// *Diasumsikan* Anda akan mengintegrasikan hook dan state dari App.jsx lama di sini nanti.
// Untuk saat ini, kita akan menggunakan state yang ada dan menambahkan useNavigate.

export default function BerandaPage() {
  const navigate = useNavigate() // <-- Hook yang sebelumnya tidak digunakan

  const { products, categories } = useProducts()
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // ... (handleAddToCart, handleUpdateQuantity, handleRemoveItem, dll. tetap sama)
  const handleAddToCart = (product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id)
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id)
      return
    }
    setCart(currentCart =>
      currentCart.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
    )
  }

  const handleRemoveItem = (id) => {
    setCart(currentCart => currentCart.filter(item => item.id !== id))
  }

  const handleCheckout = () => {
    if (cart.length > 0) {
      // Menggunakan useNavigate untuk berpindah ke rute /checkout dan membawa data keranjang
      navigate("/checkout", { state: { cartItems: cart } })
      setIsCartOpen(false) // Tutup panel keranjang setelah checkout
    } else {
      alert("Keranjang belanja kosong!")
    }
  }
  // ... (end of state/logic)

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "" || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(false)}
        readOnly={true}
      />

      <main className="main-content">
        <Header
          search={search}
          setSearch={setSearch}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onCartClick={() => setIsCartOpen(true)}
          cartCount={cartCount}
        />

        <div className="dashboard">
          <div className="product-list">
            {filteredProducts.map(product => (
              <ProductCardUser key={product.id} product={product} onAddToCart={handleAddToCart} />
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
        // Tambahkan prop onCheckout ke CartPanel
        onCheckout={handleCheckout}
      />
    </div>
  )
}
