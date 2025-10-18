import { useMemo } from 'react'
import { CATEGORIES, PRODUCTS } from '../utils/data'

export function useProducts() {
  const categoryMap = useMemo(() => {
    const map = new Map()
    CATEGORIES.forEach(cat => {
      map.set(cat.toLowerCase().replace(/ /g, '-'), cat)
    })
    return map
  }, [])

  const initialProducts = useMemo(() => {
    const products = []
    let productIdCounter = 1

    for (const categoryKey in PRODUCTS) {
      const categoryName = categoryMap.get(categoryKey)
      if (categoryName) {
        PRODUCTS[categoryKey].forEach(product => {
          products.push({
            id: productIdCounter++,
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: categoryName,
            image: `https://via.placeholder.com/250?text=${encodeURIComponent(product.name)}`,
            specs: product.specs || `High quality ${categoryName} component.`
          })
        })
      }
    }
    return products
  }, [categoryMap])

  return { products: initialProducts, categories: CATEGORIES }
}
