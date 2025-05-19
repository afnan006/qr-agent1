import React from 'react';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  // Size variants
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-center ${className}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity,
        }}
        className={`relative ${sizeClasses[size]}`}
      >
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full border-2 border-teal-300/30"></div>
        
        {/* Main spinner track */}
        <div className="absolute inset-0 rounded-full border-2 border-teal-300/50 border-t-transparent"></div>
        
        {/* Animated highlight */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-teal-500"
        ></motion.div>
        
        {/* Optional center icon (commented out but available) */}
        {/* <FiLoader className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-teal-500" /> */}
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner;