import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AddressModal from '../components/AddressModal';
import PaymentModal from '../components/PaymentModal';
import '../assets/index.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = location.state?.cartItems || [];

  const [recipientName, setRecipientName] = useState('Citra Builder');
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const shippingCost = 15000;

  const totalProductPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalCost = totalProductPrice + shippingCost;

  const handleCreateOrder = () => {
    if (!address || !paymentMethod) {
      alert('Lengkapi alamat dan pilih metode pembayaran terlebih dahulu.');
      return;
    }

    const orderData = {
      id: `ORD-${Date.now()}`,
      recipientName,
      address,
      items: cartItems, 
      totalProductPrice,
      shippingCost,
      totalCost,
      paymentMethod,
      status: 'Diproses',
    };

    navigate(`/order/${orderData.id}`, { state: orderData });
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container" style={{textAlign: 'center'}}>
        <h1>Checkout</h1>
        <p>Keranjang Anda kosong. Silakan tambahkan produk terlebih dahulu.</p>
        <button 
          className="link-button" 
          onClick={() => navigate('/')}
          style={{fontSize: '18px', marginTop: '20px', display: 'inline-block'}}
        >
          ← Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      <div className="checkout-section">
        <h2>Informasi Penerima</h2>
        <p><strong>Nama:</strong> {recipientName}</p>
        <p><strong>Alamat:</strong> 
          {address ? (
            <>
              {address.detail}, {address.village}, {address.district}, {address.city}, {address.province} {address.postalCode}
            </>
          ) : (
            <button className="link-button" onClick={() => setShowAddressModal(true)}>Masukkan Alamat</button>
          )}
        </p>
        {address && <button className="link-button" onClick={() => setShowAddressModal(true)}>Ubah Alamat</button>}
      </div>

      <div className="checkout-section">
        <h2>Produk dalam Keranjang</h2>
        {cartItems.map(item => (
          <div key={item.id} className={`cart-item checkout-item`}>
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
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
          onSubmit={setAddress}
        />
      )}

      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSelect={setPaymentMethod}
        />
      )}
    </div>
  );
};

export default CheckoutPage;