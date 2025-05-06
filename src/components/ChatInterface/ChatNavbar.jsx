import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useCart } from '../../context/CartContext';

export default function ChatNavbar() {
  const navigate = useNavigate();
  const { groupData } = useUser();
  const { cart, toggleCart } = useCart();
  
  const tableId = groupData?.table_id || sessionStorage.getItem('table_id') || 'Table';
  const formattedTableId = tableId.replace('table_', 'Table ');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-10 bg-white shadow-md px-4 py-3 flex items-center justify-between"
    >
      <div className="flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="mr-3 p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft size={24} className="text-[#7A7F87]" />
        </button>
        <div>
          <h2 className="font-medium text-lg">{formattedTableId}</h2>
          <p className="text-xs text-[#7A7F87]">
            {groupData?.party_size || '2'} guests • {groupData?.host?.name || 'Guest'}
          </p>
        </div>
      </div>
      
      <motion.button
        onClick={toggleCart}
        className="relative p-2 rounded-full bg-[#4C4C9D] text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ShoppingCart size={20} />
        {cart.items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
            {cart.items.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </motion.button>
    </motion.div>
  );
}