import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate()

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id)

      return
    }

    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        // Check stock limit
        if (newQuantity > item.stock) {
          alert('Cannot exceed available stock')

          return item
        }

        return { ...item, quantity: newQuantity }
      }

      return item
    }))
  }

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">

        <div className="bg-white rounded-lg shadow-md p-12">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>

          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline text-lg"
          >
            Continue Shopping

          </button>

        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {cartItems.map((item) => (

          <div
            key={item.id}
            className="flex items-center gap-4 py-4 border-b last:border-b-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{item.name}</h3>
              <p className="text-gray-600">Rp {item.price.toLocaleString('id-ID')}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}

                className="w-8 h-8 border rounded hover:bg-gray-100 transition-colors"
                aria-label="Decrease quantity"
              >
                -

              </button>
              <input
                type="number"
                min="1"
                max={item.stock}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                className="w-16 text-center border rounded px-2 py-1"
              />
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 border rounded hover:bg-gray-100 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <p className="font-bold w-32 text-right">
              Rp {(item.price * item.quantity).toLocaleString('id-ID')}
            </p>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-600 hover:text-red-800 px-2 transition-colors"
              aria-label="Remove item"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-2xl font-bold text-blue-600">
            Rp {total.toLocaleString('id-ID')}
          </span>
        </div>
        <button

          onClick={() => navigate('/checkout')}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"

        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}
