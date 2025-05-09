// src/roles/kitchen/pages/Dashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 bg-[#F5F7FA] min-h-screen"
    >
      <h1 className="text-2xl font-bold text-[#FF6F61] mb-6">Kitchen Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-[#FF6F61] mb-2">Orders</h3>
          <p className="text-gray-600">Total: 10</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-[#FF6F61] mb-2">Inventory</h3>
          <p className="text-gray-600">Items: 25</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-[#FF6F61] mb-2">Recipes</h3>
          <p className="text-gray-600">Total: 15</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;