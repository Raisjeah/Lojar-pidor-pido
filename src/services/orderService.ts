import api from './api';

export const orderService = {
  createOrder: async (orderData: any) => {
    return api.post('/orders', orderData);
  },

  getMyOrders: async () => {
    return api.get('/orders');
  },

  getOrderById: async (id: string) => {
    return api.get(`/orders/${id}`);
  },

  updateOrderStatus: async (id: string, status: string) => {
    return api.put(`/orders/${id}/status`, { status });
  }
};
