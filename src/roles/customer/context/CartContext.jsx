import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Try to get cart from sessionStorage on initial load
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Save cart to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (item) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.items.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // If item exists, increment quantity
        const updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      } else {
        // If item doesn't exist, add it with quantity 1
        const newItem = { ...item, quantity: 1 };
        const updatedItems = [...prevCart.items, newItem];
        
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      }
    });
  };
  
  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item.id !== itemId);
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    });
  };
  
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    });
  };
  
  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };
  
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };
  
  // Helper function to calculate total
  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};