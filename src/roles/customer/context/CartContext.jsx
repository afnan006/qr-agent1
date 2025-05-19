// import React, { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext(null);

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState(() => {
//     // Try to get cart from sessionStorage on initial load
//     const savedCart = sessionStorage.getItem('cart');
//     return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
//   });
  
//   const [isCartOpen, setIsCartOpen] = useState(false);
  
//   // Save cart to sessionStorage whenever it changes
//   useEffect(() => {
//     sessionStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);
  
//   const addToCart = (item) => {
//     setCart(prevCart => {
//       // Check if item already exists in cart
//       const existingItemIndex = prevCart.items.findIndex(i => i.id === item.id);
      
//       if (existingItemIndex >= 0) {
//         // If item exists, increment quantity
//         const updatedItems = [...prevCart.items];
//         updatedItems[existingItemIndex] = {
//           ...updatedItems[existingItemIndex],
//           quantity: updatedItems[existingItemIndex].quantity + 1
//         };
        
//         return {
//           items: updatedItems,
//           total: calculateTotal(updatedItems)
//         };
//       } else {
//         // If item doesn't exist, add it with quantity 1
//         const newItem = { ...item, quantity: 1 };
//         const updatedItems = [...prevCart.items, newItem];
        
//         return {
//           items: updatedItems,
//           total: calculateTotal(updatedItems)
//         };
//       }
//     });
//   };
  
//   const removeFromCart = (itemId) => {
//     setCart(prevCart => {
//       const updatedItems = prevCart.items.filter(item => item.id !== itemId);
//       return {
//         items: updatedItems,
//         total: calculateTotal(updatedItems)
//       };
//     });
//   };
  
//   const updateQuantity = (itemId, quantity) => {
//     if (quantity <= 0) {
//       removeFromCart(itemId);
//       return;
//     }
    
//     setCart(prevCart => {
//       const updatedItems = prevCart.items.map(item => 
//         item.id === itemId ? { ...item, quantity } : item
//       );
      
//       return {
//         items: updatedItems,
//         total: calculateTotal(updatedItems)
//       };
//     });
//   };
  
//   const clearCart = () => {
//     setCart({ items: [], total: 0 });
//   };
  
//   const toggleCart = () => {
//     setIsCartOpen(prev => !prev);
//   };
  
//   // Helper function to calculate total
//   const calculateTotal = (items) => {
//     return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   };
  
//   return (
//     <CartContext.Provider value={{
//       cart,
//       isCartOpen,
//       addToCart,
//       removeFromCart,
//       updateQuantity,
//       clearCart,
//       toggleCart
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// // import React, { createContext, useContext, useReducer } from 'react';

// // const CartContext = createContext();

// // const cartReducer = (state, action) => {
// //   switch (action.type) {
// //     case 'ADD_ITEM':
// //       const existingItem = state.find(item => item.id === action.payload.id);
// //       if (existingItem) {
// //         return state.map(item =>
// //           item.id === action.payload.id
// //             ? { ...item, quantity: item.quantity + 1 }
// //             : item
// //         );
// //       }
// //       return [...state, { ...action.payload, quantity: 1 }];
    
// //     case 'REMOVE_ITEM':
// //       const itemToRemove = state.find(item => item.id === action.payload);
// //       if (itemToRemove.quantity > 1) {
// //         return state.map(item =>
// //           item.id === action.payload
// //             ? { ...item, quantity: item.quantity - 1 }
// //             : item
// //         );
// //       }
// //       return state.filter(item => item.id !== action.payload);
    
// //     case 'CLEAR_CART':
// //       return [];
    
// //     default:
// //       return state;
// //   }
// // };

// // export const CartProvider = ({ children }) => {
// //   const [cart, dispatch] = useReducer(cartReducer, []);

// //   const addToCart = (item) => {
// //     dispatch({ type: 'ADD_ITEM', payload: item });
// //   };

// //   const removeFromCart = (itemId) => {
// //     dispatch({ type: 'REMOVE_ITEM', payload: itemId });
// //   };

// //   const clearCart = () => {
// //     dispatch({ type: 'CLEAR_CART' });
// //   };

// //   return (
// //     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // export const useCart = () => {
// //   return useContext(CartContext);
// // };


import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Cart Context
const CartContext = createContext(null);

// Cart Provider Component
export function CartProvider({ children }) {
  // State for cart items and total
  const [cart, setCart] = useState(() => {
    // Try to get cart from sessionStorage on initial load
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
  });

  // State for cart visibility (used in MenuPage)
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex((i) => i.id === item.id);
      if (existingItemIndex >= 0) {
        // If item exists, increment quantity
        const updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      } else {
        // If item doesn't exist, add it with quantity 1
        const newItem = { ...item, quantity: 1 };
        const updatedItems = [...prevCart.items, newItem];
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.id !== itemId);
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    });
  };

  // Update item quantity in cart
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    });
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  // Toggle cart visibility (used in MenuPage)
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Helper function to calculate total price
  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Provide cart state and methods to children
  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook to use Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};