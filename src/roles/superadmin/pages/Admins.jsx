// src/roles/superadmin/pages/Admins.jsx
import React from 'react';
import { motion } from 'framer-motion';
import AdminTable from '../components/AdminTable';

const Admins = () => {
  const mockAdmins = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'org_admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'kitchen_admin', status: 'active' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 bg-[#F5F7FA] min-h-screen"
    >
      <h1 className="text-2xl font-bold text-[#1A365D] mb-6">Admins</h1>
      <AdminTable admins={mockAdmins} onEdit={() => {}} onDelete={() => {}} />
    </motion.div>
  );
};

export default Admins;