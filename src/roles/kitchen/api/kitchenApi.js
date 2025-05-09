// Mock API endpoints for kitchen functionality
const BASE_URL = '/api/kitchen';

// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockOrders = [
  {
    id: 1,
    table: '101',
    items: [
      { id: 1, name: 'Classic Burger', quantity: 2, notes: 'Medium well' },
      { id: 2, name: 'Caesar Salad', quantity: 1, notes: 'No croutons' }
    ],
    status: 'pending',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    table: '103',
    items: [
      { id: 3, name: 'Pasta Carbonara', quantity: 1, notes: 'Extra cheese' }
    ],
    status: 'in_progress',
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString()
  }
];

const mockInventory = [
  { id: 1, name: 'Ground chicken', quantity: 50, unit: 'kg', status: 'ok' },
  { id: 2, name: 'Tomatoes', quantity: 10, unit: 'kg', status: 'low' },
  { id: 3, name: 'Lettuce', quantity: 20, unit: 'kg', status: 'ok' }
];

const mockRecipes = [
  {
    id: 1,
    name: 'Classic Burger',
    ingredients: [
      { name: 'Ground chicken', quantity: 0.2, unit: 'kg' },
      { name: 'Lettuce', quantity: 0.05, unit: 'kg' },
      { name: 'Tomatoes', quantity: 0.05, unit: 'kg' }
    ],
    instructions: [
      'Form chicken into patties',
      'Season with salt and pepper',
      'Grill for 4-5 minutes each side'
    ]
  }
];

export const kitchenApi = {
  // Auth endpoints
  login: async (credentials) => {
    await delay(1000);
    if (credentials.email === 'kitchen@example.com' && credentials.password === 'password') {
      return {
        token: 'mock_token_kitchen',
        user: {
          id: 1,
          name: 'Kitchen Staff',
          email: credentials.email,
          role: 'kitchen'
        }
      };
    }
    throw new Error('Invalid credentials');
  },

  // Orders
  getOrders: async () => {
    await delay(800);
    return mockOrders;
  },

  updateOrderStatus: async (orderId, status) => {
    await delay(500);
    const orderIndex = mockOrders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) throw new Error('Order not found');
    
    mockOrders[orderIndex].status = status;
    return mockOrders[orderIndex];
  },

  // Inventory
  getInventory: async () => {
    await delay(800);
    return mockInventory;
  },

  updateInventoryItem: async (itemId, updates) => {
    await delay(500);
    const itemIndex = mockInventory.findIndex(item => item.id === itemId);
    if (itemIndex === -1) throw new Error('Inventory item not found');
    
    mockInventory[itemIndex] = {
      ...mockInventory[itemIndex],
      ...updates
    };
    return mockInventory[itemIndex];
  },

  // Recipes
  getRecipes: async () => {
    await delay(800);
    return mockRecipes;
  },

  updateRecipe: async (recipeId, updates) => {
    await delay(500);
    const recipeIndex = mockRecipes.findIndex(recipe => recipe.id === recipeId);
    if (recipeIndex === -1) throw new Error('Recipe not found');
    
    mockRecipes[recipeIndex] = {
      ...mockRecipes[recipeIndex],
      ...updates
    };
    return mockRecipes[recipeIndex];
  }
};