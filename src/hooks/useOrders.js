import { useState, useMemo } from 'react';
import { ORDERS } from '../data/ordersData';

export const useOrders = () => {
  const [orders] = useState(ORDERS);

  // Gunakan useMemo untuk menghitung ulang hanya jika `orders` berubah
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const pendingOrders = orders.filter(order => order.status === 'Pending').length;

    return {
      totalOrders,
      totalRevenue,
      pendingOrders,
    };
  }, [orders]);

  return {
    orders,
    ...stats,
  };
};