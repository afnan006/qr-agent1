// src/roles/kitchen/pages/Orders.jsx
import React from 'react';
import { motion } from 'framer-motion';
import OrderCard from '../components/OrderCard';

const Orders = () => {
  const mockOrders = [
    { id: 1, table: 'Table 1', status: 'pending', items: ['Burger', 'Fries'] },
    { id: 2, table: 'Table 2', status: 'completed', items: ['Salad', 'Coffee'] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 bg-[#F5F7FA] min-h-screen"
    >
      <h1 className="text-2xl font-bold text-[#FF6F61] mb-6">Orders</h1>
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </motion.div>
  );
};

export default Orders;