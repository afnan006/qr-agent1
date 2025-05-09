import { delay } from '../../../shared/utils/delay';

// Mock data
const mockMenuItems = [
  {
    id: 1,
    name: 'Classic Burger',
    description: 'Juicy patty with lettuce, tomato, and cheese',
    price: 12.99,
    category: 'Main Course',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg'
  },
  {
    id: 2,
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan and croutons',
    price: 8.99,
    category: 'Starters',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
  }
];

const mockTables = [
  { id: 1, number: '101', status: 'available', capacity: 4 },
  { id: 2, number: '102', status: 'occupied', capacity: 6 },
  { id: 3, number: '103', status: 'reserved', capacity: 2 }
];

export const orgadminApi = {
  // Auth
  login: async (credentials) => {
    await delay(1000);
    if (credentials.email === 'orgadmin@example.com' && credentials.password === 'password') {
      return {
        token: 'mock_orgadmin_token',
        user: {
          id: 1,
          name: 'Org Admin',
          email: credentials.email,
          role: 'org_admin'
        }
      };
    }
    throw new Error('Invalid credentials');
  },

  // Menu Items
  getMenuItems: async () => {
    await delay(800);
    return mockMenuItems;
  },

  createMenuItem: async (itemData) => {
    await delay(1000);
    const newItem = {
      id: Date.now(),
      ...itemData
    };
    mockMenuItems.push(newItem);
    return newItem;
  },

  updateMenuItem: async (id, updates) => {
    await delay(800);
    const itemIndex = mockMenuItems.findIndex(item => item.id === id);
    if (itemIndex === -1) throw new Error('Menu item not found');
    
    mockMenuItems[itemIndex] = {
      ...mockMenuItems[itemIndex],
      ...updates
    };
    return mockMenuItems[itemIndex];
  },

  deleteMenuItem: async (id) => {
    await delay(800);
    const itemIndex = mockMenuItems.findIndex(item => item.id === id);
    if (itemIndex === -1) throw new Error('Menu item not found');
    
    mockMenuItems.splice(itemIndex, 1);
    return { success: true };
  },

  // Tables
  getTables: async () => {
    await delay(800);
    return mockTables;
  },

  updateTableStatus: async (id, status) => {
    await delay(500);
    const tableIndex = mockTables.findIndex(table => table.id === id);
    if (tableIndex === -1) throw new Error('Table not found');
    
    mockTables[tableIndex].status = status;
    return mockTables[tableIndex];
  }
};