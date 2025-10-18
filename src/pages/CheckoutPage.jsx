import React, { useState } from 'react'
// Import modal-modal yang diperlukan (perlu dibuat di komponen)
import { AddressModal, PaymentModal, RecipientInfoModal } from '../components/Modals.jsx'

// Kode dari input Anda
export default function CheckoutPage({ cartItems, onNavigate }) {
  const [recipientInfo, setRecipientInfo] = useState({
    name: 'Citra Builder',
    address: null,
    phone: '08123456789'
  })
  const [paymentMethod, setPaymentMethod] = useState('')
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showRecipientModal, setShowRecipientModal] = useState(false)

  const shippingCost = 15000
  const totalProductPrice = cartItems ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0) : 0
  const totalCost = totalProductPrice + shippingCost

  const handleCreateOrder = () => {
    if (!recipientInfo.name || !recipientInfo.address || !recipientInfo.phone || !paymentMethod) {
      alert('Lengkapi semua informasi penerima dan pilih metode pembayaran terlebih dahulu.')
      return
    }

    const orderData = {
      id: `ORD-${Date.now()}`,
      recipientInfo,
      items: cartItems,
      totalProductPrice,
      shippingCost,
      totalCost,
      paymentMethod,
      status: 'Diproses',
    }

    onNavigate('order', orderData)
  }

  const handleRecipientInfoSubmit = (info) => {
    setRecipientInfo(prev => ({ ...prev, ...info }))
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="checkout-container" style={{ textAlign: 'center' }}>
        <h1>Checkout</h1>
        <p>Keranjang Anda kosong. Silakan tambahkan produk terlebih dahulu.</p>
        <button
          className="link-button"
          onClick={() => onNavigate('home')}
          style={{ fontSize: '18px', marginTop: '20px', display: 'inline-block' }}
        >
          ← Kembali ke Beranda
        </button>
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, borderBottom: 'none', paddingBottom: 0 }}>Checkout</h1>
        <button
          onClick={() => onNavigate('home')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9em'
          }}
        >
          ✕ Keluar
        </button>
      </div>
      <hr style={{ border: 'none', borderTop: '2px solid #2c3e50', marginBottom: '20px' }} />

      <div className="checkout-section">
        <h2>Informasi Penerima</h2>
        <p><strong>Nama:</strong> {recipientInfo.name}</p>
        <p><strong>Alamat:</strong>{' '}
          {recipientInfo.address ? (
            <>
              {recipientInfo.address.detail}, {recipientInfo.address.village}, {recipientInfo.address.district}, {recipientInfo.address.city}, {recipientInfo.address.province} {recipientInfo.address.postalCode}
            </>
          ) : (
            <button className="link-button" onClick={() => setShowAddressModal(true)}>Masukkan Alamat</button>
          )}
        </p>
        <p><strong>Telepon:</strong> {recipientInfo.phone}</p>
        <button className="link-button" onClick={() => setShowRecipientModal(true)}>Ubah Informasi Penerima</button>
      </div>

      <div className="checkout-section">
        <h2>Produk dalam Keranjang</h2>
        {cartItems.map(item => (
          <div key={item.id} className="checkout-item">
            <div>
              <h4>{item.name}</h4>
              <p>Rp {item.price.toLocaleString('id-ID')} x {item.quantity}</p>
            </div>
            <p><strong>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</strong></p>
          </div>
        ))}
      </div>

      <div className="checkout-section">
        <h2>Rincian Biaya</h2>
        <div className="cost-detail">
          <p>Total Harga Produk: <span>Rp {totalProductPrice.toLocaleString('id-ID')}</span></p>
          <p>Ongkir: <span>Rp {shippingCost.toLocaleString('id-ID')}</span></p>
          <h3>Total Biaya: <span>Rp {totalCost.toLocaleString('id-ID')}</span></h3>
        </div>
      </div>

      <div className="checkout-section">
        <h2>Metode Pembayaran</h2>
        <p>
          {paymentMethod ? paymentMethod : <button className="link-button" onClick={() => setShowPaymentModal(true)}>Pilih Metode Pembayaran</button>}
        </p>
        {paymentMethod && <button className="link-button" onClick={() => setShowPaymentModal(true)}>Ubah Metode</button>}
      </div>

      <button className="create-order-btn" onClick={handleCreateOrder}>
        Buat Pesanan
      </button>

      {showAddressModal && (
        <AddressModal
          onClose={() => setShowAddressModal(false)}
          onSubmit={(address) => setRecipientInfo(prev => ({ ...prev, address }))}
        />
      )}

      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSelect={setPaymentMethod}
        />
      )}

      {showRecipientModal && (
        <RecipientInfoModal
          onClose={() => setShowRecipientModal(false)}
          onSubmit={handleRecipientInfoSubmit}
          initialData={recipientInfo}
        />
      )}
    </div>
  )
}
