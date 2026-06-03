import api from './api';

export const productService = {
  getProducts: async (params?: any) => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return api.get(`/products${queryString}`);
  },

  getProductById: async (id: string) => {
    return api.get(`/products/${id}`);
  },
};
