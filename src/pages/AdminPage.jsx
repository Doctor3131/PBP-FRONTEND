// src/pages/AdminPage.jsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // 1. Import useNavigate
import { useProducts } from '../hooks/useProducts.js'
import ProductCardAdmin from '../components/ProductCardAdmin.jsx'
import '../assets/admin.css'

// 2. Hapus prop 'onNavigate', ganti dengan 'onLogout' dari App.jsx
export default function AdminPage({ onLogout }) {
  const navigate = useNavigate() // 3. Inisialisasi hook
  const { products: initialProducts } = useProducts()
  const [products, setProducts] = useState(initialProducts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const handleAddNew = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== productId))
    }
  }

  const handleSave = (productData) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === productData.id ? productData : p)))
    } else {
      const newProduct = { ...productData, id: Date.now() }
      setProducts([...products, newProduct])
    }
    setIsModalOpen(false)
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div>
          <button onClick={handleAddNew} className="admin-button add-new-button">
            Add New Product
          </button>
          {/* 4. Ganti onNavigate dengan navigate('/') */}
          <button onClick={() => navigate('/')} className="admin-button">
            View Store
          </button>
          <button onClick={onLogout} className="admin-button delete-button">
            Logout
          </button>
        </div>
      </header>

      <main className="admin-main">
        <h2>Manage Products</h2>
        <div className="admin-product-list">
          {products.map((product) => (
            <ProductCardAdmin
              key={product.id}
              product={product}
              onEdit={() => handleEdit(product)}
              onDelete={() => handleDelete(product.id)}
            />
          ))}
        </div>
      </main>

      {isModalOpen && (
        <ProductEditModal
          product={editingProduct}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

// Komponen Modal tidak perlu diubah
function ProductEditModal({ product, onSave, onClose }) {
  // ... (kode modal tetap sama)
  const [formData, setFormData] = useState(
    product || { name: '', price: '', stock: '', category: 'Keyboards', specs: '' }
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content admin-modal">
        <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit}>
          {/* ... (form input tetap sama) ... */}
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Specifications</label>
            <textarea name="specs" value={formData.specs} onChange={handleChange} rows="3"></textarea>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
            <button type="submit" className="btn-save">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  )
}
