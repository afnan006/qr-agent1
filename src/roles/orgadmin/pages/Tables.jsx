// src/roles/orgadmin/pages/Tables.jsx
import React from 'react';
import { motion } from 'framer-motion';
import TableList from '../components/TableList';

const Tables = () => {
  const mockTables = [
    { id: 1, name: 'Table 1', status: 'occupied' },
    { id: 2, name: 'Table 2', status: 'available' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 bg-[#F5F7FA] min-h-screen"
    >
      <h1 className="text-2xl font-bold text-[#008080] mb-6">Tables</h1>
      <TableList
        tables={mockTables}
        onUpdateStatus={() => {}}
      />
    </motion.div>
  );
};

export default Tables;