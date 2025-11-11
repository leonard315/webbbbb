import api from './api';

export const carService = {
  // Get all cars
  async getAllCars() {
    try {
      const response = await api.get('/cars');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch cars';
    }
  },

  // Get single car
  async getCar(id) {
    try {
      const response = await api.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch car';
    }
  },

  // Create car (admin only)
  async createCar(carData) {
    try {
      const response = await api.post('/cars', carData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create car';
    }
  },

  // Update car (admin only)
  async updateCar(id, carData) {
    try {
      const response = await api.put(`/cars/${id}`, carData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update car';
    }
  },

  // Delete car (admin only)
  async deleteCar(id) {
    try {
      const response = await api.delete(`/cars/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete car';
    }
  },

  // Search cars
  async searchCars(filters) {
    try {
      const response = await api.get('/cars/search', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to search cars';
    }
  }
};
