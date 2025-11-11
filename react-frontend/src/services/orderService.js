import api from './api';

export const orderService = {
  // Get all orders (admin only)
  async getAllOrders() {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch orders';
    }
  },

  // Get user's orders
  async getUserOrders() {
    try {
      const response = await api.get('/orders/my-orders');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch your orders';
    }
  },

  // Create order
  async createOrder(orderData) {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create order';
    }
  },

  // Update order status (admin only)
  async updateOrderStatus(orderId, status, metadata = {}) {
    try {
      const response = await api.patch(`/orders/${orderId}/status`, {
        status,
        ...metadata
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update order status';
    }
  },

  // Get order details
  async getOrder(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch order';
    }
  }
};
