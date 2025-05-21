// const BASE_URL = 'https://qr-agent.onrender.com'; // For login
// const API_URL = 'https://qr-agent.onrender.com/api/kitchen'; // For all kitchen APIs

// export const kitchenApi = {
//   // Authentication
//   login: async (credentials) => {
//     try {
//       const response = await fetch(`${BASE_URL}/staff-login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Login failed');
//       }

//       // Expecting { token: "..." }
//       return response.json();
//     } catch (err) {
//       console.error('Login API Error:', err);
//       throw err;
//     }
//   },

//   // Get kitchen orders with filters and sorting
//   getOrders: async (token, filters = {}) => {
//     const params = new URLSearchParams(filters).toString();
//     const url = `/orders${params ? `?${params}` : ''}`;
//     const response = await fetch(`${API_URL}${url}`, {
//       method: 'GET',
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || 'Failed to fetch orders');
//     }
//     return response.json();
//   },

//   // Update order status
//   updateOrderStatus: async (token, orderId, statusUpdate) => {
//     const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
//       method: 'PUT',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(statusUpdate),
//     });
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || 'Failed to update order status');
//     }
//     return response.json();
//   },
// };


const BASE_URL = 'https://qr-agent.onrender.com';
const API_URL = 'https://qr-agent.onrender.com/api/kitchen';

export const kitchenApi = {
  // ✅ Login with correct staff_token return
  login: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/staff-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      return response.json(); // Returns { staff_token: "..." }
    } catch (err) {
      console.error('Login API Error:', err);
      throw err;
    }
  },

  // ✅ Get orders with optional filters
  getOrders: async (token, filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const url = `/orders${params ? `?${params}` : ''}`;
    const response = await fetch(`${API_URL}${url}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch orders');
    }
    return response.json();
  },

  // ✅ Update order status
  updateOrderStatus: async (token, orderId, statusUpdate) => {
    const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statusUpdate),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update order status');
    }
    return response.json();
  },
};
