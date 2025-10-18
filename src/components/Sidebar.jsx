// src/components/Sidebar.jsx
import React from 'react'

export default function Sidebar({ categories, selectedCategory, onCategorySelect }) {
  const handleCategoryClick = (cat) => {
    // onCategorySelect harus menutup sidebar di BerandaPage
    onCategorySelect(cat)
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>KeyStore</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {categories.map(cat => (
            <li key={cat} className={selectedCategory === cat ? 'active' : ''}>
              <button onClick={() => handleCategoryClick(cat)}>
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
