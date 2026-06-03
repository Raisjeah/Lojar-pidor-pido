import api from './api';

export const cartService = {
  getCart: async () => {
    return api.get('/cart');
  },

  addToCart: async (itemData: any) => {
    return api.post('/cart', itemData);
  },

  updateCartItem: async (itemId: string, quantity: number) => {
    return api.put(`/cart/${itemId}`, { quantity });
  },

  removeFromCart: async (itemId: string) => {
    return api.delete(`/cart/${itemId}`);
  },

  clearCart: async () => {
    return api.delete('/cart');
  }
};
