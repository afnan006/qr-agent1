const BASE_URL = 'https://qr-agent.onrender.com/api/customer';
const API_URL = 'https://qr-agent.onrender.com/api';
export const customerApi = {
  // Get Menu
  getMenu: async () => {
    const response = await fetch(`${BASE_URL}/menu?organization_id=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch menu');
    return response.json();
  },
  

  // Place Order
  placeOrder: async (orderData) => {
    try {
      const response = await fetch(`${BASE_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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

  // Create Group (NEW: matches backend spec)
  createGroup: async (tableId, organizationId) => {
    try {
      const jwt = localStorage.getItem('jwt');
      // Convert to numbers
      const payload = {
        table_id: Number(tableId),
        organization_id: Number(organizationId),
      };
      const response = await fetch(`${API_URL}/group/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        // Try to parse error as JSON, fallback to text
        let errorMsg = 'Failed to create group';
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch {
          errorMsg = await response.text();
        }
        throw new Error(errorMsg);
      }
      return response.json();
    } catch (err) {
      console.error('Error creating group:', err.message);
      throw err;
    }
  },

  // Join Group (NEW: matches backend spec)
  joinGroup: async (groupId, name) => {
    try {
      const response = await fetch(`${API_URL}/group/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          group_id: groupId,
          name: name,
        }),
      });
      if (!response.ok) throw new Error((await response.json()).error || 'Failed to join group');
      return response.json();
    } catch (err) {
      console.error('Error joining group:', err.message);
      throw err;
    }
  },

  // Check Group Status (optional, matches backend spec)
  checkGroupStatus: async (groupId, memberToken) => {
    try {
      const jwt = localStorage.getItem('jwt');
      const url = `${API_URL}/group/status?group_id=${groupId}&member_token=${memberToken}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) throw new Error((await response.json()).error || 'Failed to check group status');
      return response.json();
    } catch (err) {
      console.error('Error checking group status:', err.message);
      throw err;
    }
  },

  // New method: initializeGroup
  initializeGroup: async () => {
    try {
      // Get the table string from storage (e.g., "Table12")
      const tableString = localStorage.getItem('table_id') || 'table_default';



      // Now use tableId as a number
      const orgId = organizationId || localStorage.getItem('organization_id');
      if (!orgId || !tableId) {
        alert('Organization ID or Table ID not found.');
        setIsLoading(false);
        return;
      }
      const result = await createGroup(tableId, orgId);
      return result;
    } catch (err) {
      console.error('Error initializing group:', err.message);
      throw err;
    }
  },


};

