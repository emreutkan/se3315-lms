import axios from 'axios';
const API_BASE_URL = 'https://3315backend-d9hnd9dbfzg2a5gj.polandcentral-01.azurewebsites.net/api';
const api = axios.create({ baseURL: API_BASE_URL });

export const login = async (username, password) => {
  console.log('login called with username:', username);
  try {
    const response = await api.post('/auth/login', { username, password });
    return response;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};

export const register = async (username, password, email, role) => {
  console.log('register called with username:', username);
  try {
    const response = await api.post('/auth/register', {
      username,
      password,
      email,
      role
    });
    return response;
  } catch (error) {
    console.error('Registration API error:', error);
    throw error;
  }
};

