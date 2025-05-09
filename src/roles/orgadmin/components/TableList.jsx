import React from 'react';
import { motion } from 'framer-motion';

function TableList({ tables, onStatusChange }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tables.map((table) => (
        <motion.div
          key={table.id}
          className="bg-white rounded-lg shadow p-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-medium">Table {table.number}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(table.status)}`}>
              {table.status}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Capacity: {table.capacity} people
          </p>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onStatusChange(table.id, 'available')}
              className={`flex-1 py-1 rounded-md text-sm font-medium transition-colors ${
                table.status === 'available'
                  ? 'bg-green-500 text-white'
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              Available
            </button>
            
            <button
              onClick={() => onStatusChange(table.id, 'occupied')}
              className={`flex-1 py-1 rounded-md text-sm font-medium transition-colors ${
                table.status === 'occupied'
                  ? 'bg-red-500 text-white'
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              Occupied
            </button>
            
            <button
              onClick={() => onStatusChange(table.id, 'reserved')}
              className={`flex-1 py-1 rounded-md text-sm font-medium transition-colors ${
                table.status === 'reserved'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              }`}
            >
              Reserved
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default TableList;