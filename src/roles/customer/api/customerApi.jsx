const BASE_URL = 'https://qr-agent.onrender.com/api/customer';

export const customerApi = {
  // Get Menu
  getMenu: async (organizationId) => {
    try {
      const response = await fetch(`${BASE_URL}/menu?organization_id=${organizationId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch menu');
      return response.json();
    } catch (err) {
      console.error('Error fetching menu:', err.message);
      throw err;
    }
  },

  // Place Order
  placeOrder: async (orderData) => {
    try {
      const response = await fetch(`${BASE_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) throw new Error((await response.json()).error || 'Failed to place order');
      return response.json();
    } catch (err) {
      console.error('Error placing order:', err.message);
      throw err;
    }
  },

  // Get Order Status
  getOrderStatus: async (orderId) => {
    try {
      const response = await fetch(`${BASE_URL}/order/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch order status');
      return response.json();
    } catch (err) {
      console.error('Error fetching order status:', err.message);
      throw err;
    }
  },

  // Add Item to Cart
  addItemToCart: async (cartItem) => {
    try {
      const response = await fetch(`${BASE_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(cartItem),
      });
      if (!response.ok) throw new Error((await response.json()).error || 'Failed to add item to cart');
      return response.json();
    } catch (err) {
      console.error('Error adding item to cart:', err.message);
      throw err;
    }
  },

  // View Cart
  viewCart: async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch cart');
      return response.json();
    } catch (err) {
      console.error('Error fetching cart:', err.message);
      throw err;
    }
  },

  // Remove Item from Cart
  removeCartItem: async (itemId) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error((await response.json()).error || 'Failed to remove item from cart');
      return response.json();
    } catch (err) {
      console.error('Error removing item from cart:', err.message);
      throw err;
    }
  },

  // Call Waiter
  callWaiter: async (tableId) => {
    try {
      const response = await fetch(`${BASE_URL}/waiter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ table_id: tableId }),
      });
      if (!response.ok) throw new Error((await response.json()).error || 'Failed to notify waiter');
      return response.json();
    } catch (err) {
      console.error('Error notifying waiter:', err.message);
      throw err;
    }
  },
};