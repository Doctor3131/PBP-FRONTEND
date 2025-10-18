import React from 'react';
import orderIcon from '../assets/order.png';
import revenueIcon from '../assets/revenue.png';
import pendingIcon from '../assets/pending.png';
import productIcon from '../assets/product.png';
import lowstockIcon from '../assets/lowstock.png';
import userIcon from '../assets/user.png';

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <img src={icon} alt={title} />
      </div>
      <div className="stat-info">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default function DashboardStats({ products, orders, users }) {
  // Hitung stok rendah dari data produk
  const lowStockThreshold = 10;
  const lowStockProducts = products.filter(p => p.stock < lowStockThreshold).length;

  // Ambil data statistik dari hook (yang sudah dihitung di dalam hook)
  const { totalOrders, totalRevenue, pendingOrders } = orders;
  const { totalUsers } = users;

  return (
    <div className="dashboard-stats">
      <StatCard 
        title="Total Pesanan" 
        value={totalOrders} 
        icon={orderIcon}
      />
      <StatCard 
        title="Total Pendapatan" 
        value={`Rp ${totalRevenue.toLocaleString('id-ID')}`} 
        icon={revenueIcon}
      />
      <StatCard 
        title="Pesanan Pending" 
        value={pendingOrders} 
        icon={pendingIcon}
      />
      <StatCard 
        title="Total Produk" 
        value={products.length} 
        icon={productIcon}
      />
      <StatCard 
        title="Stok Rendah" 
        value={lowStockProducts} 
        icon={lowstockIcon}
      />
      <StatCard 
        title="Total Pengguna" 
        value={totalUsers} 
        icon={userIcon}
      />
    </div>
  );
}