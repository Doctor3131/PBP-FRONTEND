import { useState } from 'react';
import { CATEGORIES, getInitialProducts } from '../data/productsData';

export const useProducts = () => {
  const [products, setProducts] = useState(getInitialProducts());
  const [categories, setCategories] = useState(CATEGORIES);

  // --- LOGIKA UNTUK PRODUK ---
  const handleAddProduct = (newProduct) => {
    setProducts(currentProducts => [...currentProducts, { ...newProduct, id: Date.now() }]);
  };

  const handleDeleteProduct = (id) => {
    setProducts(currentProducts => currentProducts.filter(p => p.id !== id));
  };

  const handleUpdateStock = (id, delta) => {
    setProducts(currentProducts =>
      currentProducts.map(p =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      )
    );
  };

  // --- LOGIKA UNTUK KATEGORI ---
  const handleAddCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories(currentCategories => [...currentCategories, newCategory]);
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    const isCategoryInUse = products.some(p => p.category === categoryToDelete);
    if (isCategoryInUse) {
      alert('Kategori tidak bisa dihapus karena masih digunakan oleh produk.');
      return;
    }
    setCategories(currentCategories => currentCategories.filter(cat => cat !== categoryToDelete));
  };

  return {
    products, categories,
    handleAddProduct, handleDeleteProduct, handleUpdateStock,
    handleAddCategory, handleDeleteCategory,
  };
};