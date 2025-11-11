import api from './api';

export const userService = {
  // Get all users (admin only)
  async getAllUsers() {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch users';
    }
  },

  // Create user (admin only)
  async createUser(userData) {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create user';
    }
  },

  // Update user (admin only)
  async updateUser(userId, userData) {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update user';
    }
  },

  // Delete user (admin only)
  async deleteUser(userId) {
    try {
      const response = await api.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete user';
    }
  },

  // Suspend user (admin only)
  async suspendUser(userId) {
    try {
      const response = await api.patch(`/users/${userId}/suspend`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to suspend user';
    }
  }
};
