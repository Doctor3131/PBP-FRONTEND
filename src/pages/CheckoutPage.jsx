import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

const CheckoutPage = ({ cartItems, clearCart }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',

    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    paymentMethod: 'bank-transfer',
  })

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 15000
  const total = subtotal + shipping

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill in all required fields')

      return
    }

    // Create order
    const order = {

      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      customer: formData,
      items: cartItems,
      subtotal,
      shipping,
      total,
      status: 'Processing',
    }

    // In real app, send to backend
    console.log('Order created:', order)

    // Clear cart and navigate
    clearCart()
    alert('Order placed successfully! Order ID: ' + order.id)
    navigate('/')
  }

  if (cartItems.length === 0) {
    navigate('/cart')

    return null
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>

            <div className="space-y-4">

              <div>

                <label className="block mb-2 font-semibold">Full Name *</label>
                <input
                  type="text"

                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-semibold">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required

                    value={formData.phone}

                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold">Address *</label>
                <textarea
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />

              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 font-semibold">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}

                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">Province *</label>
                  <input
                    type="text"
                    name="province"
                    required
                    value={formData.province}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                  />

                </div>

                <div>

                  <label className="block mb-2 font-semibold">Postal Code *</label>

                  <input
                    type="text"

                    name="postalCode"
                    required
                    value={formData.postalCode}

                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>

                <label className="block mb-2 font-semibold">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="bank-transfer">Bank Transfer</option>
                  <option value="gopay">GoPay</option>

                  <option value="ovo">OVO</option>
                  <option value="cod">Cash on Delivery</option>

                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Place Order
            </button>
          </form>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cartItems.map(item => (

                <div key={item.id} className="flex justify-between text-sm py-2 border-b">
                  <div className="flex-1 pr-2">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold whitespace-nowrap">
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Rp {shipping.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total</span>
                <span className="text-blue-600">Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage

