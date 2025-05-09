import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function MenuCard({ item }) {
  const { addToCart } = useCart();
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="min-w-[280px] bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="h-40 bg-gray-200 relative">
        {/* In production, this would be a real image */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#4C4C9D] bg-opacity-10">
          <span className="text-5xl">{item.emoji}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{item.name}</h3>
          <span className="font-mono text-[#4C4C9D] font-medium">₹{item.price.toFixed(2)}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
        
        <motion.button
          onClick={() => addToCart(item)}
          className="flex items-center justify-center w-full py-2 bg-[#F5F7FA] hover:bg-[#4C4C9D] hover:text-white text-[#4C4C9D] rounded-lg transition-colors"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <PlusCircle size={18} className="mr-2" />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}