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

const BASE_URL = 'https://qr-agent.onrender.com/superadmin';

// Helper: Get headers with auth
const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('superadmin_token') || ''}`
});

export const superadminApi = {
  // SuperAdmin Login
  login: async (credentials) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      mode: 'cors',
    });

    if (!response.ok) throw new Error((await response.json()).error || 'Login failed');
    
    const data = await response.json();
    
    // Save token for future API calls
    if (data.token) {
      localStorage.setItem('superadmin_token', data.token);
    }

    return data;
  },

  // SuperAdmin Logout (clear session)
  logout: () => {
    localStorage.removeItem('superadmin_token');
  },

  // Organization Endpoints
  createOrganization: async (orgData) => {
    const response = await fetch(`${BASE_URL}/organizations`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(orgData),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to create organization');
    return response.json();
  },

  listOrganizations: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`${BASE_URL}/organizations${queryParams ? `?${queryParams}` : ''}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch organizations');
    return response.json();
  },

  getOrganization: async (orgId) => {
    const response = await fetch(`${BASE_URL}/organizations/${orgId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch organization');
    return response.json();
  },

  updateOrganization: async (orgId, updates) => {
    const response = await fetch(`${BASE_URL}/organizations/${orgId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to update organization');
    return response.json();
  },

  deactivateOrganization: async (orgId) => {
    const response = await fetch(`${BASE_URL}/organizations/${orgId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to deactivate organization');
    return response.json();
  },

  // Admin Endpoints
  createAdmin: async (adminData) => {
    const response = await fetch(`${BASE_URL}/admins`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(adminData),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to create admin');
    return response.json();
  },

  listAdmins: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`${BASE_URL}/admins${queryParams ? `?${queryParams}` : ''}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to fetch admins');
    return response.json();
  },

  updateAdmin: async (adminId, updates) => {
    const response = await fetch(`${BASE_URL}/admins/${adminId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to update admin');
    return response.json();
  },

  deactivateAdmin: async (adminId) => {
    const response = await fetch(`${BASE_URL}/admins/${adminId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error((await response.json()).error || 'Failed to deactivate admin');
    return response.json();
  },
};
