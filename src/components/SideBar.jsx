import React from 'react';

const Sidebar = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  isSidebarOpen, 
  onToggleSidebar
}) => {
  return (
    <aside className="sidebar">
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
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
};

export default Sidebar;