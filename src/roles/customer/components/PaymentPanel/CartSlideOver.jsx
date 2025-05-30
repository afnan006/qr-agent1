import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useRef } from 'react';
export default function CartSlideOver() {
  const {
    cart = { items: [], total: 0 },
    personalCart = { items: [], total: 0 },
    groupCart = { items: [], total: 0 },
    isCartOpen,
    toggleCart,
    removeFromCart,
    fetchCart,
    menuMap = {},
    isMenuLoading,
    cartType,
    setCartType,
    isInGroup,
  } = useCart();

  useEffect(() => {
    fetchCart(cartType);
  }, [cartType, isCartOpen, fetchCart]);

  let itemsToShow = [];
  let totalToShow = 0;
  
  if (cartType === 'group') {
    itemsToShow = groupCart?.items || [];
    totalToShow = groupCart?.total || 0;
  } else {
    itemsToShow = isInGroup ? (personalCart?.items || []) : (cart?.items || []);
    totalToShow = isInGroup ? (personalCart?.total || 0) : (cart?.total || 0);
  }

  const handlePlaceOrder = async () => {
    if (!itemsToShow || itemsToShow.length === 0) return;
    try {
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
        payload.group_id = Number(groupId);
        payload.member_token = memberToken;
      }

      await customerApi.placeOrder(payload);
      alert('Order placed successfully!');
      toggleCart();
    } catch (err) {
      alert(err.message || 'Failed to place order.');
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to remove this item?')) return;
    try {
      await removeFromCart(itemId, cartType);
      await fetchCart(cartType);
    } catch (err) {
      alert(err.message || 'Failed to remove item from cart.');
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black bg-opacity-25 z-30"
            onClick={toggleCart}
          />
          <motion.div
            variants={{
              hidden: { x: '100%', opacity: 0 },
              visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 25 } },
              exit: { x: '100%', opacity: 0, transition: { duration: 0.3 } },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-40 shadow-xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button onClick={toggleCart} className="p-1 rounded-full hover:bg-gray-100">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex gap-2 mb-2 p-4">
                <button
                  className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                    cartType === 'personal'
                      ? 'bg-[#4C4C9D] text-white shadow'
                      : 'bg-gray-100 text-[#4C4C9D] hover:bg-gray-200'
                  }`}
                  onClick={() => setCartType('personal')}
                >
                  My Cart
                </button>
                <button
                  className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                    cartType === 'group'
                      ? 'bg-[#4C4C9D] text-white shadow'
                      : 'bg-gray-100 text-[#4C4C9D] hover:bg-gray-200'
                  }`}
                  onClick={() => setCartType('group')}
                >
                  Group Cart
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {isMenuLoading ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <p>Loading...</p>
                  </div>
                ) : !itemsToShow || itemsToShow.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center mb-4">
                      <Trash2 size={24} />
                    </div>
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {itemsToShow.map((item) => {
                      const menuItem = menuMap[String(item.menu_item_id)] || menuMap[String(item.id)];
                      return (
                        <div key={item.id} className="py-4 flex">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-xl">{menuItem?.emoji || '🍽️'}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium">
                                  {menuItem ? menuItem.name : `Unknown item (${item.menu_item_id || item.id})`}
                                </h3>
                                {cartType === 'group' && item.customer_name && (
                                  <p className="text-sm text-gray-500">Ordered by: {item.customer_name}</p>
                                )}
                              </div>
                              <span className="font-mono">
                                {typeof menuItem?.price === 'number'
                                  ? `₹${(menuItem.price * item.quantity).toFixed(2)}`
                                  : '--'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="mx-2 w-6 text-center">{item.quantity}</span>
                              <button
                                className="ml-2 text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="p-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Subtotal</span>
                  <span className="font-bold text-lg">
                    {typeof totalToShow === 'number'
                      ? `₹${totalToShow.toFixed(2)}`
                      : '--'}
                  </span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  disabled={!itemsToShow || itemsToShow.length === 0}
                  className={`w-full py-3 rounded-lg text-white font-medium ${
                    !itemsToShow || itemsToShow.length === 0 ? 'bg-gray-300' : 'bg-[#4C4C9D]'
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