// import { createContext, useContext, useState, useEffect } from 'react';
// import { kitchenApi } from '../api/kitchenApi';

// const KitchenContext = createContext(null);

// export function KitchenProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [inventory, setInventory] = useState([]);

//   // Check for existing auth on mount
//   useEffect(() => {
//     const token = localStorage.getItem('kitchen_token');
//     const userData = localStorage.getItem('kitchen_user');
    
//     if (token && userData) {
//       try {
//         setUser(JSON.parse(userData));
//         loadInitialData();
//       } catch (err) {
//         console.error('Error parsing auth data:', err);
//         logout();
//       }
//     }
    
//     setLoading(false);
//   }, []);

//   const loadInitialData = async () => {
//     try {
//       const [ordersData, inventoryData] = await Promise.all([
//         kitchenApi.getOrders(),
//         kitchenApi.getInventory()
//       ]);
      
//       setOrders(ordersData);
//       setInventory(inventoryData);
//     } catch (err) {
//       console.error('Error loading initial data:', err);
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       setError(null);
//       setLoading(true);
      
//       const response = await kitchenApi.login({ email, password });
      
//       localStorage.setItem('kitchen_token', response.token);
//       localStorage.setItem('kitchen_user', JSON.stringify(response.user));
      
//       setUser(response.user);
//       await loadInitialData();
//       return response;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('kitchen_token');
//     localStorage.removeItem('kitchen_user');
//     setUser(null);
//     setOrders([]);
//     setInventory([]);
//   };

//   const updateOrderStatus = async (orderId, status) => {
//     try {
//       const updatedOrder = await kitchenApi.updateOrderStatus(orderId, status);
//       setOrders(prev => prev.map(order => 
//         order.id === orderId ? updatedOrder : order
//       ));
//       return updatedOrder;
//     } catch (err) {
//       console.error('Error updating order status:', err);
//       throw err;
//     }
//   };

//   const updateInventoryItem = async (itemId, updates) => {
//     try {
//       const updatedItem = await kitchenApi.updateInventoryItem(itemId, updates);
//       setInventory(prev => prev.map(item =>
//         item.id === itemId ? updatedItem : item
//       ));
//       return updatedItem;
//     } catch (err) {
//       console.error('Error updating inventory item:', err);
//       throw err;
//     }
//   };

//   return (
//     <KitchenContext.Provider
//       value={{
//         user,
//         loading,
//         error,
//         orders,
//         inventory,
//         login,
//         logout,
//         updateOrderStatus,
//         updateInventoryItem,
//         isAuthenticated: !!user,
//       }}
//     >
//       {children}
//     </KitchenContext.Provider>
//   );
// }

// export function useKitchen() {
//   const context = useContext(KitchenContext);
//   if (!context) {
//     throw new Error('useKitchen must be used within a KitchenProvider');
//   }
//   return context;
// }

// src/roles/kitchen/context/KitchenContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { kitchenApi } from '../api/kitchenApi';

const KitchenContext = createContext();

export function useKitchen() {
  return useContext(KitchenContext);
}

export function KitchenProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('kitchen_token');
    if (token) {
      try {
        loadInitialData(token);
      } catch (err) {
        console.error('Error loading initial data:', err);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const loadInitialData = async (token) => {
    try {
      const [ordersData, inventoryData] = await Promise.all([
        kitchenApi.getOrders(token),
        kitchenApi.getInventory(token),
      ]);
      setOrders(ordersData);
      setInventory(inventoryData);
    } catch (err) {
      console.error('Error loading initial data:', err);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { token: newToken, user: newUser } = await kitchenApi.login({ email, password });
      localStorage.setItem('kitchen_token', newToken);
      setUser(newUser);
      await loadInitialData(newToken);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('kitchen_token');
    setUser(null);
    setOrders([]);
    setInventory([]);
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('kitchen_token');
      const updatedOrder = await kitchenApi.updateOrderStatus(token, orderId, { status });
      setOrders((prev) => prev.map((order) => (order.id === orderId ? updatedOrder : order)));
    } catch (err) {
      console.error('Error updating order status:', err);
      throw err;
    }
  };

  const updateInventoryItem = async (itemId, updates) => {
    try {
      const token = localStorage.getItem('kitchen_token');
      const updatedItem = await kitchenApi.updateInventoryItem(token, itemId, updates);
      setInventory((prev) => prev.map((item) => (item.id === itemId ? updatedItem : item)));
    } catch (err) {
      console.error('Error updating inventory item:', err);
      throw err;
    }
  };

  return (
    <KitchenContext.Provider
      value={{
        user,
        orders,
        inventory,
        login,
        logout,
        updateOrderStatus,
        updateInventoryItem,
        loading,
      }}
    >
      {children}
    </KitchenContext.Provider>
  );
}