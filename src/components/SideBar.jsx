import React from 'react'

export default function Sidebar({
  open,
  toggle,
  categories,
  onCategoryClick,
  selectedCategory,
}) {
  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggle}
        />
      )}

      {/* Sidebar */}

      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 
        transform transition-transform duration-300 overflow-y-auto
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
      `}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Categories</h2>
            <button
              onClick={toggle}
              className="lg:hidden text-2xl hover:text-gray-300"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <button

                  onClick={() => onCategoryClick(category)}

                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-700'
                    }`}
                >
                  {category}
                </button>

              </li>

            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}

