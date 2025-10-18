import { useState } from 'react'

export function useCart(showNotification, userRole) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = product => {
    if (userRole === 'visitor') {
      showNotification('Please log in to add items to your cart', 'warning')
      return
    }

    if (product.stock === 0) {
      showNotification('This item is out of stock', 'error')
      return
    }

    const exist = cartItems.find(item => item.name === product.name)
    const requestedQty = product.quantity || 1

    if (exist) {
      const newQty = exist.quantity + requestedQty

      if (newQty > product.stock) {
        showNotification(`Only ${product.stock} items available in stock`, 'error')
        return
      }

      setCartItems(cartItems.map(item =>
        item.name === product.name
          ? { ...item, quantity: newQty }
          : item
      ))
      showNotification(`Updated quantity in cart`, 'success')
    } else {
      if (requestedQty > product.stock) {
        showNotification(`Only ${product.stock} items available`, 'error')
        return
      }

      setCartItems([...cartItems, { ...product, quantity: requestedQty }])
      showNotification('Added to cart', 'success')
    }
  }

  return { cartItems, setCartItems, addToCart }
}
