// src/services/auth.js
import api from './api';

// Login user
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Register user
export const registerUser = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};


export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};
