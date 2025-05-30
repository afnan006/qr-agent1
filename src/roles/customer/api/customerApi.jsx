const BASE_URL = 'https://qr-agent.onrender.com/api/customer';
const API_URL = 'https://qr-agent.onrender.com/api';

export const customerApi = {
  // Get Menu
  getMenu: async () => {
    const orgId = localStorage.getItem('organization_id');
    const response = await fetch(`${BASE_URL}/menu?organization_id=${orgId}`, {
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
    const orgId = localStorage.getItem('organization_id');
    const tableId = localStorage.getItem('table_id');
    const groupId = localStorage.getItem('group_id');
    const memberToken = localStorage.getItem('member_token');
    const customerName = localStorage.getItem('customer_name') || 'Guest';
    
    const payload = {
      table_id: Number(tableId),
      organization_id: Number(orgId),
      menu_item_id: cartItem.id,
      quantity: cartItem.quantity,
      customer_name: customerName, // Include customer name with each item
    };

    if (groupId && memberToken) {
      payload.group_id = Number(groupId);
      payload.member_token = memberToken;
    }

    const headers = {
      'Content-Type': 'application/json',
    };

    const jwt = localStorage.getItem('jwt');
    if (jwt && !(groupId && memberToken)) {
      headers['Authorization'] = `Bearer ${jwt}`;
    }

    const response = await fetch(`${BASE_URL}/cart`, {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to add item to cart');
    return response.json();
  },
//view cart
  viewCart: async (isGroupCart = false) => {
  const groupId = localStorage.getItem('group_id');
  const memberToken = localStorage.getItem('member_token');
  
  let url = `${BASE_URL}/cart`;
  const headers = {
    'Content-Type': 'application/json',
  };

  // For group cart
  if (isGroupCart && groupId && memberToken) {
    url += `?group_id=${groupId}&member_token=${memberToken}`;
  } 
  // For personal cart in group
  else if (groupId && memberToken) {
    url += `?group_id=${groupId}&member_token=${memberToken}&personal=true`;
  } 
  // For personal cart (individual)
  else {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      headers['Authorization'] = `Bearer ${jwt}`;
    }
  }

  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers,
  });
  
  if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch cart');
  return response.json();
},

  // Remove Item from Cart
  removeCartItem: async (itemId) => {
    const groupId = localStorage.getItem('group_id');
    const memberToken = localStorage.getItem('member_token');
    const jwt = localStorage.getItem('jwt');
    let url = `${BASE_URL}/cart/${itemId}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    // If group member, add group_id and member_token as query params, do NOT send JWT
    if (groupId && memberToken) {
      url += `?group_id=${groupId}&member_token=${memberToken}`;
    } else if (jwt) {
      headers['Authorization'] = `Bearer ${jwt}`;
    }

    const response = await fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      headers,
    });

    if (!response.ok) {
      let errorMsg = 'Failed to remove item from cart';
      try {
        const errorData = await response.clone().json();
        errorMsg = errorData.error || errorMsg;
      } catch {
        errorMsg = response.statusText || errorMsg;
      }
      throw new Error(errorMsg);
    }
    return response.json();
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

  // Create Group
  createGroup: async (tableId, organizationId) => {
    try {
      const jwt = localStorage.getItem('jwt');
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

  // Join Group
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

  // Check Group Status
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

  // View Group Cart
  viewGroupCart: async () => {
    const groupId = localStorage.getItem('group_id');
    const memberToken = localStorage.getItem('member_token');
    if (!groupId || !memberToken) throw new Error('Not in a group');
    const url = `${BASE_URL}/cart?group_id=${groupId}&member_token=${memberToken}`;
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers,
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch group cart');
    return response.json();
  },

  // View Personal Cart
  viewPersonalCart: async () => {
    const groupId = localStorage.getItem('group_id');
    const memberToken = localStorage.getItem('member_token');
    if (!groupId || !memberToken) throw new Error('Not in a group');
    const url = `${BASE_URL}/cart?group_id=${groupId}&member_token=${memberToken}&personal=true`;
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers,
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch personal cart');
    return response.json();
  },

  // Initialize Group
  initializeGroup: async () => {
    try {
      const tableId = localStorage.getItem('table_id');
      const orgId = localStorage.getItem('organization_id');
      if (!orgId || !tableId) {
        throw new Error('Organization ID or Table ID not found');
      }
      // Example: after successful group creation
      const result = await customerApi.createGroup(tableId, orgId);
      // result should contain { group_id, member_token }
      if (result && result.group_id && result.member_token) {
        localStorage.setItem('group_id', result.group_id);
        localStorage.setItem('member_token', result.member_token);
        if (result.customer_name) {
          localStorage.setItem('customer_name', result.customer_name);
        }
      } else if (result && result.group_id) {
        // If backend does not return member_token, join as member
        const customerName = localStorage.getItem('customer_name') || 'Guest';
        const joinRes = await customerApi.joinGroup(result.group_id, customerName);
        if (joinRes && joinRes.member_token) {
          localStorage.setItem('group_id', result.group_id);
          localStorage.setItem('member_token', joinRes.member_token);
          if (joinRes.customer_name) {
            localStorage.setItem('customer_name', joinRes.customer_name);
          }
        }
      }
      return result;
    } catch (err) {
      console.error('Error initializing group:', err.message);
      throw err;
    }
  },
};