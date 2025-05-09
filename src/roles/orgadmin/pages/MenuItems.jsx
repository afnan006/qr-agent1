// src/roles/orgadmin/pages/MenuItems.jsx
import React from 'react';
import { motion } from 'framer-motion';
import MenuItemTable from '../components/MenuItemTable';

const MenuItems = () => {
  const mockMenuItems = [
    { id: 1, name: 'Classic Burger', category: 'Main Course', price: '$12.99' },
    { id: 2, name: 'Caesar Salad', category: 'Starters', price: '$8.99' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 bg-[#F5F7FA] min-h-screen"
    >
      <h1 className="text-2xl font-bold text-[#008080] mb-6">Menu Items</h1>
      <MenuItemTable
        items={mockMenuItems}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </motion.div>
  );
};

export default MenuItems;