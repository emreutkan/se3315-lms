import axios from 'axios';
const api = axios.create({ baseURL: 'http://127.0.0.1:5000/api' });
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

