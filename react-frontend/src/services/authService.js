import api from './api';

export const authService = {
  // Login user
  async login(email, password) {
    try {
      const response = await api.post('/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('supercarsPH_user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Login error details:', error.response || error);
      
      // Handle validation errors
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat();
        throw errorMessages.join(', ');
      }
      
      // Handle network errors
      if (!error.response) {
        throw 'Cannot connect to server. Please make sure the backend is running.';
      }
      
      throw error.response?.data?.message || 'Login failed. Please check your credentials.';
    }
  },

  // Register user
  async register(name, email, password, password_confirmation) {
    try {
      const response = await api.post('/register', {
        name,
        email,
        password,
        password_confirmation
      });
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('supercarsPH_user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Registration error details:', error.response || error);
      
      // Handle validation errors
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat();
        throw errorMessages.join(', ');
      }
      
      // Handle network errors
      if (!error.response) {
        throw 'Cannot connect to server. Please make sure the backend is running.';
      }
      
      throw error.response?.data?.message || 'Registration failed. Please try again.';
    }
  },

  // Logout user
  async logout() {
    try {
      await api.post('/logout');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('supercarsPH_user');
      localStorage.removeItem('supercarsPH_isLoggedIn');
      localStorage.removeItem('supercarsPH_cart');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get user';
    }
  }
};
