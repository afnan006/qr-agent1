// // // //---------------------------ORIGINAL----------------------------
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { customerApi } from '../../api/customerApi';

export default function CartSlideOver() {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const [confirmation, setConfirmation] = useState(null); // Tracks item for confirmation

  const handleCheckout = () => {
    toggleCart();
    setShowPayment(true);
  };

  const handleRemoveItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to remove this item?')) return;

    try {
      await customerApi.removeCartItem(itemId); // Call API to remove item
      removeFromCart(itemId); // Update local state
    } catch (err) {
      alert(err.message || 'Failed to remove item from cart.');
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.items.length === 0) return;
    try {
      // Get customer name (from localStorage or context, adjust as needed)
      const tableId = localStorage.getItem('table_id');
      const organizationId = localStorage.getItem('organization_id');
      const groupId = localStorage.getItem('group_id');
      const memberToken = localStorage.getItem('member_token');
      const customerName = localStorage.getItem('customer_name') || 'Guest';

      let payload = {
        table_id: Number(tableId),
        organization_id: Number(organizationId),
        customer_name: customerName,
      };

      if (groupId && memberToken) {
        // Group order: do NOT send items, let backend use group cart
        payload.group_id = Number(groupId);
        payload.member_token = memberToken;
      } else {
        // Solo order: send items array
        payload.items = cart.items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
        }));
      }

      // Call the API
      const result = await customerApi.placeOrder(payload);

      // Optionally clear cart or show success
      alert('Order placed successfully!');
      toggleCart();
      // Optionally: clearCart();
    } catch (err) {
      alert(err.message || 'Failed to place order.');
    }
  };

  const slideVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 25 } },
    exit: { x: '100%', opacity: 0, transition: { duration: 0.3 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black bg-opacity-25 z-30"
            onClick={toggleCart}
          />
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-40 shadow-xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button
                  onClick={toggleCart}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {cart.items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center mb-4">
                      <Trash2 size={24} />
                    </div>
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {cart.items.map((item) => (
                      <div key={item.id} className="py-4 flex">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-xl">{item.emoji}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{item.name}</h3>
                            <span className="font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="mx-2 w-6 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 p-1 rounded-full hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-t p-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span className="font-mono">${cart.total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  disabled={cart.items.length === 0}
                  className={`w-full py-3 rounded-lg text-white font-medium ${
                    cart.items.length === 0 ? 'bg-gray-300' : 'bg-[#4C4C9D]'
                  }`}
                >
                  Place Order
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}