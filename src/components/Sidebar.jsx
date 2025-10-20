import { useState, useEffect } from 'react'
import { fetchCategoriesAPI } from '../services/categoryService'

export default function Sidebar({ open, onCategoryClick, userRole }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategoriesAPI()
        setCategories([{ id: 0, name: 'Home' }, ...response.data])
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    getCategories()
  }, [])

  const buttonStyle = {
    padding: '15px 20px',
    textAlign: 'left',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: open ? 0 : '-250px', width: '250px', height: '100%',
      backgroundColor: '#fff', boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      transition: 'left 0.3s', zIndex: 1000, paddingTop: '70px', display: 'flex', flexDirection: 'column'
    }}>
      {categories.map((cat) => (
        <button key={cat.id} onClick={() => onCategoryClick(cat)} style={buttonStyle}>
          {cat.name}
        </button>
      ))}
      {userRole === 'admin' && (
        <a href="/admin/orders" style={{ ...buttonStyle, textDecoration: 'none', color: '#007bff' }}>
          Manajemen Pesanan
        </a>
      )}
    </div>
  )
}
