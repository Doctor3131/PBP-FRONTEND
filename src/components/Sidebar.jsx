import React from 'react';
import AddCategoryModal from './AddCategoryModal';

const Sidebar = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  onDeleteCategory,
  isSidebarOpen, 
  onToggleSidebar,
  showAddCategoryModal,
  setShowAddCategoryModal,
  onAddCategory
}) => {
  return (
    <>
      <aside className="sidebar">
        {/* Tombol tutup hanya muncul saat sidebar terbuka */}
        {isSidebarOpen && (
          <button className="sidebar-toggle" onClick={onToggleSidebar}>
            ✕
          </button>
        )}
        
        {isSidebarOpen && (
          <>
            <h2>Kategori</h2>
            <ul>
              <li>
                <div
                  className={`category-item ${selectedCategory === "" ? "active" : ""}`}
                  onClick={() => onCategorySelect("")}
                >
                  <span>Semua Kategori</span>
                </div>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <div
                    className={`category-item ${selectedCategory === category ? "active" : ""}`}
                    onClick={() => onCategorySelect(category)}
                  >
                    <span>{category}</span>
                    <button
                      className="category-delete-btn"
                      onClick={(e) => {
                        e.stopPropagation(); // Mencegah event select kategori terpicu
                        onDeleteCategory(category);
                      }}
                      title="Hapus kategori"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button className="add-category-btn" onClick={() => setShowAddCategoryModal(true)}>
              + Tambah Kategori
            </button>
          </>
        )}
      </aside>
      {showAddCategoryModal && (
        <AddCategoryModal
          onClose={() => setShowAddCategoryModal(false)}
          onAdd={onAddCategory}
        />
      )}
    </>
  );
};

export default Sidebar;