import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../assets/index.css';

const OrderDetailPage = () => {
  const location = useLocation();
  const orderData = location.state;

  if (!orderData) {
    return (
      <div className="order-detail-container">
        <p>Data pesanan tidak ditemukan.</p>
        <Link to="/" className="link-button">Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <div className="order-detail-container">
      <h1>Detail Pesanan</h1>
      {/* ... sisanya sama seperti yang Anda berikan ... */}
      <div className="order-detail-section">
        <h2>Informasi Pesanan</h2>
        <p><strong>No. Pesanan:</strong> {orderData.id}</p>
        <p><strong>Status:</strong> <span className="status-badge processed">{orderData.status}</span></p>
        <p><strong>Tanggal Pesanan:</strong> {new Date().toLocaleDateString('id-ID')}</p>
      </div>

      <div className="order-detail-section">
        <h2>Informasi Penerima</h2>
        <p><strong>Nama:</strong> {orderData.recipientName}</p>
        <p><strong>Alamat:</strong> {orderData.address.detail}, {orderData.address.village}, {orderData.address.district}, {orderData.address.city}, {orderData.address.province} {orderData.address.postalCode}</p>
      </div>

      <div className="order-detail-section">
        <h2>Produk yang Dipesan</h2>
        {orderData.items.map(item => (
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

      <div className="order-detail-section">
        <h2>Rincian Pembayaran</h2>
        <div className="cost-detail">
          <p>Total Harga Produk: <span>Rp {orderData.totalProductPrice.toLocaleString('id-ID')}</span></p>
          <p>Ongkir: <span>Rp {orderData.shippingCost.toLocaleString('id-ID')}</span></p>
          <h3>Total Pembayaran: <span>Rp {orderData.totalCost.toLocaleString('id-ID')}</span></h3>
          <p><strong>Metode Pembayaran:</strong> {orderData.paymentMethod}</p>
        </div>
      </div>
      
      <div className="order-detail-section">
          <Link to="/" className="link-button">← Kembali ke Beranda</Link>
      </div>
    </div>
  );
};

export default OrderDetailPage;