import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, DollarSign, Smartphone } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function PaymentModal({ isOpen, onClose }) {
  const { cart, clearCart } = useCart();
  const [paymentStep, setPaymentStep] = useState('details'); // details, processing, success
  
  // Tax rate 10%
  const tax = cart.total * 0.1;
  const total = cart.total + tax;
  
  const handlePayment = (method) => {
    setPaymentStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('success');
      
      // Clear cart after successful payment
      setTimeout(() => {
        clearCart();
        onClose();
      }, 2000);
    }, 1500);
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };
  
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };
  
  const getPaymentContent = () => {
    switch (paymentStep) {
      case 'processing':
        return (
          <div className="text-center py-10">
            <div className="w-12 h-12 border-4 border-[#4C4C9D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-medium mb-2">Processing Payment</h3>
            <p className="text-[#7A7F87]">Please wait while we process your payment...</p>
          </div>
        );
        
      case 'success':
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Payment Successful!</h3>
            <p className="text-[#7A7F87]">Thank you for your order.</p>
          </motion.div>
        );
        
      default:
        return (
          <>
            <div className="border-b pb-4 mb-4">
              <h3 className="text-xl font-medium mb-2">Order Summary</h3>
              
              <div className="max-h-60 overflow-y-auto mb-4">
                {cart.items.map(item => (
                  <div key={item.id} className="flex justify-between py-2 border-b border-gray-100">
                    <div className="flex gap-2">
                      <span>{item.quantity}x</span>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span className="font-mono">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="font-mono">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4">Payment Method</h3>
              
              <div className="space-y-3">
                <button 
                  onClick={() => handlePayment('card')}
                  className="w-full py-3 px-4 bg-white border border-gray-200 rounded-lg flex items-center hover:bg-gray-50"
                >
                  <CreditCard className="mr-3 text-[#4C4C9D]" />
                  <span>Credit Card</span>
                </button>
                
                <button 
                  onClick={() => handlePayment('wallet')}
                  className="w-full py-3 px-4 bg-white border border-gray-200 rounded-lg flex items-center hover:bg-gray-50"
                >
                  <Smartphone className="mr-3 text-[#4C4C9D]" />
                  <span>Digital Wallet</span>
                </button>
                
                <button 
                  onClick={() => handlePayment('cash')}
                  className="w-full py-3 px-4 bg-white border border-gray-200 rounded-lg flex items-center hover:bg-gray-50"
                >
                  <DollarSign className="mr-3 text-[#4C4C9D]" />
                  <span>Cash</span>
                </button>
              </div>
            </div>
          </>
        );
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-xl shadow-xl p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Checkout</h2>
              <button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            
            {getPaymentContent()}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}