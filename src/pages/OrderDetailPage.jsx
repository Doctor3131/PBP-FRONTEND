// src/pages/OrderDetailPage.jsx
// Kode dari input Anda
export default function OrderDetailPage({ orderData, onNavigate }) {
  if (!orderData) {
    return (
      <div className="order-detail-container">
        <p>Data pesanan tidak ditemukan.</p>
        <button className="link-button" onClick={() => onNavigate('home')}>Kembali ke Beranda</button>
      </div>
    )
  }

  return (
    <div className="order-detail-container">
      <h1>Detail Pesanan</h1>
      <div className="order-detail-section">
        <h2>Informasi Pesanan</h2>
        <p><strong>No. Pesanan:</strong> {orderData.id}</p>
        <p><strong>Status:</strong> <span className="status-badge">{orderData.status}</span></p>
        <p><strong>Tanggal Pesanan:</strong> {new Date().toLocaleDateString('id-ID')}</p>
      </div>

      <div className="order-detail-section">
        <h2>Informasi Penerima</h2>
        <p><strong>Nama:</strong> {orderData.recipientInfo.name}</p>
        <p><strong>Alamat:</strong> {orderData.recipientInfo.address.detail}, {orderData.recipientInfo.address.village}, {orderData.recipientInfo.address.district}, {orderData.recipientInfo.address.city}, {orderData.recipientInfo.address.province} {orderData.recipientInfo.address.postalCode}</p>
        <p><strong>Telepon:</strong> {orderData.recipientInfo.phone}</p>
      </div>

      <div className="order-detail-section">
        <h2>Produk yang Dipesan</h2>
        {orderData.items.map(item => (
          <div key={item.id} className="checkout-item">
            <div>
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
        <button className="link-button" onClick={() => onNavigate('home')}>← Kembali ke Beranda</button>
      </div>
    </div>
  )
}
