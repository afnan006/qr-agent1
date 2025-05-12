// // // // Mock API endpoints for superadmin functionality
// // // const BASE_URL = '/api/superadmin';

// // // // Simulated API delay
// // // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// // // // Mock data
// // // const mockOrganizations = [
// // //   { id: 1, name: 'Restaurant Chain A', status: 'active', locations: 25 },
// // //   { id: 2, name: 'Food Court B', status: 'active', locations: 12 },
// // //   { id: 3, name: 'Cafe Chain C', status: 'inactive', locations: 8 },
// // // ];

// // // const mockAdmins = [
// // //   { id: 1, name: 'John Doe', email: 'john@example.com', role: 'org_admin', status: 'active' },
// // //   { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'kitchen_admin', status: 'active' },
// // // ];

// // // export const superadminApi = {
// // //   // Auth endpoints
// // //   login: async (credentials) => {
// // //     await delay(1000);
// // //     if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
// // //       return {
// // //         token: 'mock_token_12345',
// // //         user: {
// // //           id: 1,
// // //           name: 'Super Admin',
// // //           email: credentials.email,
// // //           role: 'superadmin'
// // //         }
// // //       };
// // //     }
// // //     throw new Error('Invalid credentials');
// // //   },

// // //   // Organization endpoints
// // //   getOrganizations: async () => {
// // //     await delay(800);
// // //     return mockOrganizations;
// // //   },

// // //   createOrganization: async (orgData) => {
// // //     await delay(1000);
// // //     const newOrg = {
// // //       id: Date.now(),
// // //       ...orgData,
// // //       status: 'active'
// // //     };
// // //     mockOrganizations.push(newOrg);
// // //     return newOrg;
// // //   },

// // //   updateOrganization: async (id, updates) => {
// // //     await delay(800);
// // //     const orgIndex = mockOrganizations.findIndex(org => org.id === id);
// // //     if (orgIndex === -1) throw new Error('Organization not found');
    
// // //     mockOrganizations[orgIndex] = {
// // //       ...mockOrganizations[orgIndex],
// // //       ...updates
// // //     };
// // //     return mockOrganizations[orgIndex];
// // //   },

// // //   deleteOrganization: async (id) => {
// // //     await delay(800);
// // //     const orgIndex = mockOrganizations.findIndex(org => org.id === id);
// // //     if (orgIndex === -1) throw new Error('Organization not found');
    
// // //     mockOrganizations.splice(orgIndex, 1);
// // //     return { success: true };
// // //   },

// // //   // Admin endpoints
// // //   getAdmins: async () => {
// // //     await delay(800);
// // //     return mockAdmins;
// // //   },

// // //   createAdmin: async (adminData) => {
// // //     await delay(1000);
// // //     const newAdmin = {
// // //       id: Date.now(),
// // //       ...adminData,
// // //       status: 'active'
// // //     };
// // //     mockAdmins.push(newAdmin);
// // //     return newAdmin;
// // //   },

// // //   updateAdmin: async (id, updates) => {
// // //     await delay(800);
// // //     const adminIndex = mockAdmins.findIndex(admin => admin.id === id);
// // //     if (adminIndex === -1) throw new Error('Admin not found');
    
// // //     mockAdmins[adminIndex] = {
// // //       ...mockAdmins[adminIndex],
// // //       ...updates
// // //     };
// // //     return mockAdmins[adminIndex];
// // //   },

// // //   deleteAdmin: async (id) => {
// // //     await delay(800);
// // //     const adminIndex = mockAdmins.findIndex(admin => admin.id === id);
// // //     if (adminIndex === -1) throw new Error('Admin not found');
    
// // //     mockAdmins.splice(adminIndex, 1);
// // //     return { success: true };
// // //   }
// // // };
// // // src/roles/superadmin/api/superadminApi.js
// // const BASE_URL = 'https://qr-agent.onrender.com/api/superadmin';

// // export const superadminApi = {
// //   // SuperAdmin Login
// //   login: async (credentials) => {
// //     const response = await fetch(`${BASE_URL}/login`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(credentials),
// //     });
// //     if (!response.ok) throw new Error((await response.json()).error || 'Login failed');
// //     return response.json();
// //   },

// //   // Organization Endpoints
// //   createOrganization: async (orgData) => {
// //     const response = await fetch(`${BASE_URL}/organizations`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(orgData),
// //     });
// //     if (!response.ok) throw new Error((await response.json()).error || 'Failed to create organization');
// //     return response.json();
// //   },

// //   listOrganizations: async (filters = {}) => {
// //     const queryParams = new URLSearchParams(filters).toString();
// //     const response = await fetch(`${BASE_URL}/organizations${queryParams ? `?${queryParams}` : ''}`, {
// //       method: 'GET',
// //       headers: { 'Content-Type': 'application/json' },
// //     });
// //     if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch organizations');
// //     return response.json();
// //   },

// //   getOrganization: async (orgId) => {
// //     const response = await fetch(`${BASE_URL}/organizations/${orgId}`, {
// //       method: 'GET',
// //       headers: { 'Content-Type': 'application/json' },
// //     });
// //     if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch organization');
// //     return response.json();
// //   },

// //   updateOrganization: async (orgId, updates) => {
// //     const response = await fetch(`${BASE_URL}/organizations/${orgId}`, {
// //       method: 'PUT',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(updates),
// //     });
// //     if (!response.ok) throw new Error((await response.json()).error || 'Failed to update organization');
// //     return response.json();
// //   },

// //   deactivateOrganization: async (orgId) => {
// //     const response = await fetch(`${BASE_URL}/organizations/${orgId}`, {
// //       method: 'DELETE',
// //       headers: { 'Content-Type': 'application/json' },
// //     });
// //     if (!response.ok) throw new Error((await response.json()).error || 'Failed to deactivate organization');
// //     return response.json();
// //   },

// //   // Admin Endpoints
// //   createAdmin: async (adminData) => {
// //     const response = await fetch(`${BASE_URL}/admins`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(adminData),
// //     });
// //     if (!response.ok) throw new Error((await response.json()).error || 'Failed to create admin');
// //     return response.json();
// //   },

// //   listAdmins: async (filters = {}) => {
// //     const queryParams = new URLSearchParams(filters).toString();
// //     const response = await fetch(`${BASE_URL}/admins${queryParams ? `?${queryParams}` : ''}`, {
// //       method: 'GET',
// //       headers: { 'Content-Type': 'application/json' },
// //     });
// //     if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch admins');
// //     return response.json();
// //   },

// //   updateAdmin: async (adminId, updates) => {
// //     const response = await fetch(`${BASE_URL}/admins/${adminId}`, {
// //       method: 'PUT',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(updates),
// //     });
// //     if (!response.ok) throw new Error((await response.json()).error || 'Failed to update admin');
// //     return response.json();
// //   },

// //   deactivateAdmin: async (adminId) => {
// //     const response = await fetch(`${BASE_URL}/admins/${adminId}`, {
// //       method: 'DELETE',
// //       headers: { 'Content-Type': 'application/json' },
// //     });
// //     if (!response.ok) throw new Error((await response.json()).error || 'Failed to deactivate admin');
// //     return response.json();
// //   },
// // };
// // src/api/superadminApi.js
// const BASE_URL = 'https://qr-agent.onrender.com/superadmin';

// export const superadminApi = {
//   // SuperAdmin Login
//   login: async (credentials) => {
//     const response = await fetch(`${BASE_URL}/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(credentials),
//       mode:'cors',
//     });
//     if (!response.ok) throw new Error((await response.json()).error || 'Login failed');
//     return response.json();
//   },

//   // Organization Endpoints
//   createOrganization: async (orgData) => {
//     const response = await fetch(`${BASE_URL}/organizations`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(orgData),
//     });
//     if (!response.ok) throw new Error((await response.json()).error || 'Failed to create organization');
//     return response.json();
//   },

//   listOrganizations: async (filters = {}) => {
//     const queryParams = new URLSearchParams(filters).toString();
//     const response = await fetch(`${BASE_URL}/organizations${queryParams ? `?${queryParams}` : ''}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch organizations');
//     return response.json();
//   },

//   getOrganization: async (orgId) => {
//     const response = await fetch(`${BASE_URL}/organizations/${orgId}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch organization');
//     return response.json();
//   },

//   updateOrganization: async (orgId, updates) => {
//     const response = await fetch(`${BASE_URL}/organizations/${orgId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updates),
//     });
//     if (!response.ok) throw new Error((await response.json()).error || 'Failed to update organization');
//     return response.json();
//   },

//   deactivateOrganization: async (orgId) => {
//     const response = await fetch(`${BASE_URL}/organizations/${orgId}`, {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error((await response.json()).error || 'Failed to deactivate organization');
//     return response.json();
//   },

//   // Admin Endpoints
//   createAdmin: async (adminData) => {
//     const response = await fetch(`${BASE_URL}/admins`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(adminData),
//     });
//     if (!response.ok) throw new Error((await response.json()).error || 'Failed to create admin');
//     return response.json();
//   },

//   listAdmins: async (filters = {}) => {
//     const queryParams = new URLSearchParams(filters).toString();
//     const response = await fetch(`${BASE_URL}/admins${queryParams ? `?${queryParams}` : ''}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch admins');
//     return response.json();
//   },

//   updateAdmin: async (adminId, updates) => {
//     const response = await fetch(`${BASE_URL}/admins/${adminId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updates),
//     });
//     if (!response.ok) throw new Error((await response.json()).error || 'Failed to update admin');
//     return response.json();
//   },

//   deactivateAdmin: async (adminId) => {
//     const response = await fetch(`${BASE_URL}/admins/${adminId}`, {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error((await response.json()).error || 'Failed to deactivate admin');
//     return response.json();
//   },
// };

const BASE_URL = 'https://qr-agent.onrender.com/superadmin'; // For login
const API_URL = 'https://qr-agent.onrender.com/api/superadmin'; // For orgs and other CRUD
const TOKEN_KEY = 'superadmin_token';
const USER_KEY = 'superadmin_user';
const SESSION_TYPE_KEY = 'superadmin_session_type';
const TOKEN_EXPIRY_KEY = 'superadmin_token_expiry';

// Helper: Check if token exists and is valid
const isTokenValid = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return false;
  
  try {
    // If your token is a JWT, you could decode and check expiration
    // For now, we'll just check if token exists
    return true;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

// Helper: Get headers with auth
const getAuthHeaders = () => {
  // Check if token exists
  const token = localStorage.getItem(TOKEN_KEY);
  
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const superadminApi = {
  // Check if user is authenticated
  isAuthenticated: () => {
    return isTokenValid();
  },
  
  // SuperAdmin Login
  login: async (credentials, rememberMe = false) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      mode: 'cors',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }
    
    const data = await response.json();
    
    // Ensure consistent token storage
    const token = data.superadmin_token || data.token;
    
    if (!token) {
      throw new Error('No token received from server');
    }
    
    // Save token and user data
    localStorage.setItem(TOKEN_KEY, token);
    
    // If user data is available in the response, store it
    if (data.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }
    
    // Store session type and expiry if rememberMe is passed
    if (rememberMe) {
      localStorage.setItem(SESSION_TYPE_KEY, 'persistent');
      // Set expiry to 7 days
      const expiryTime = Date.now() + (7 * 24 * 60 * 60 * 1000);
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
    } else {
      localStorage.setItem(SESSION_TYPE_KEY, 'temporary');
      // Set expiry to 1 hour
      const expiryTime = Date.now() + (60 * 60 * 1000);
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
    }

    return {
      ...data,
      superadmin_token: token // Ensure consistent token property
    };
  },

  // Validate existing token
  validateToken: async () => {
    if (!isTokenValid()) return false;
    
    try {
      // Make a lightweight API call to verify the token is still accepted by the server
      // For this implementation, we'll use the organizations endpoint as a test
      // In a production environment, you should have a dedicated token validation endpoint
      const response = await fetch(`${API_URL}/organizations`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      // If the token is accepted, the response will be ok (status 200-299)
      // If not, the server will return 401 Unauthorized
      return response.ok;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  },

  // SuperAdmin Logout (clear session)
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    
    // Clear any other session data if needed
    // sessionStorage.clear();
  },

  // Organization Endpoints
  createOrganization: async (orgData) => {
    const response = await fetch(`${API_URL}/organizations`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(orgData),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to create organization');
    return response.json();
  },

  listOrganizations: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/organizations${queryParams ? `?${queryParams}` : ''}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch organizations');
    return response.json();
  },

  getOrganization: async (orgId) => {
    const response = await fetch(`${API_URL}/organizations/${orgId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch organization');
    return response.json();
  },

  updateOrganization: async (orgId, updates) => {
    const response = await fetch(`${API_URL}/organizations/${orgId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to update organization');
    return response.json();
  },

  deactivateOrganization: async (orgId) => {
    const response = await fetch(`${API_URL}/organizations/${orgId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to deactivate organization');
    return response.json();
  },

  // Admin Endpoints
  createAdmin: async (adminData) => {
    const response = await fetch(`${API_URL}/admins`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(adminData),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to create admin');
    return response.json();
  },

  listAdmins: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/admins${queryParams ? `?${queryParams}` : ''}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch admins');
    return response.json();
  },

  updateAdmin: async (adminId, updates) => {
    const response = await fetch(`${API_URL}/admins/${adminId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to update admin');
    return response.json();
  },

  deactivateAdmin: async (adminId) => {
    const response = await fetch(`${API_URL}/admins/${adminId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to deactivate admin');
    return response.json();
  },
};
