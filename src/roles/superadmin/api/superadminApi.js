// Mock API endpoints for superadmin functionality
const BASE_URL = '/api/superadmin';

// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockOrganizations = [
  { id: 1, name: 'Restaurant Chain A', status: 'active', locations: 25 },
  { id: 2, name: 'Food Court B', status: 'active', locations: 12 },
  { id: 3, name: 'Cafe Chain C', status: 'inactive', locations: 8 },
];

const mockAdmins = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'org_admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'kitchen_admin', status: 'active' },
];

export const superadminApi = {
  // Auth endpoints
  login: async (credentials) => {
    await delay(1000);
    if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
      return {
        token: 'mock_token_12345',
        user: {
          id: 1,
          name: 'Super Admin',
          email: credentials.email,
          role: 'superadmin'
        }
      };
    }
    throw new Error('Invalid credentials');
  },

  // Organization endpoints
  getOrganizations: async () => {
    await delay(800);
    return mockOrganizations;
  },

  createOrganization: async (orgData) => {
    await delay(1000);
    const newOrg = {
      id: Date.now(),
      ...orgData,
      status: 'active'
    };
    mockOrganizations.push(newOrg);
    return newOrg;
  },

  updateOrganization: async (id, updates) => {
    await delay(800);
    const orgIndex = mockOrganizations.findIndex(org => org.id === id);
    if (orgIndex === -1) throw new Error('Organization not found');
    
    mockOrganizations[orgIndex] = {
      ...mockOrganizations[orgIndex],
      ...updates
    };
    return mockOrganizations[orgIndex];
  },

  deleteOrganization: async (id) => {
    await delay(800);
    const orgIndex = mockOrganizations.findIndex(org => org.id === id);
    if (orgIndex === -1) throw new Error('Organization not found');
    
    mockOrganizations.splice(orgIndex, 1);
    return { success: true };
  },

  // Admin endpoints
  getAdmins: async () => {
    await delay(800);
    return mockAdmins;
  },

  createAdmin: async (adminData) => {
    await delay(1000);
    const newAdmin = {
      id: Date.now(),
      ...adminData,
      status: 'active'
    };
    mockAdmins.push(newAdmin);
    return newAdmin;
  },

  updateAdmin: async (id, updates) => {
    await delay(800);
    const adminIndex = mockAdmins.findIndex(admin => admin.id === id);
    if (adminIndex === -1) throw new Error('Admin not found');
    
    mockAdmins[adminIndex] = {
      ...mockAdmins[adminIndex],
      ...updates
    };
    return mockAdmins[adminIndex];
  },

  deleteAdmin: async (id) => {
    await delay(800);
    const adminIndex = mockAdmins.findIndex(admin => admin.id === id);
    if (adminIndex === -1) throw new Error('Admin not found');
    
    mockAdmins.splice(adminIndex, 1);
    return { success: true };
  }
};