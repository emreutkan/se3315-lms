import axios from 'axios';
const API_BASE_URL = 'https://3315backend-d9hnd9dbfzg2a5gj.polandcentral-01.azurewebsites.net/api';
const api = axios.create({ baseURL: API_BASE_URL });

export const listUsers = async token => {
  console.log('listUsers called with token:', token);
  try {
    const response = await api.get('/users', { headers: { Authorization: `Bearer ${token}` } });
    console.log('listUsers response:', response);
    return response;
  } catch (error) {
    console.error('listUsers API error:', error);
    throw error;
  }
};
export const addUser = async (token, data) => {
  console.log('addUser called with token:', token, 'data:', data);
  try {
    const response = await api.post('/users', data, { headers: { Authorization: `Bearer ${token}` } });
    console.log('addUser response:', response);
    return response;
  } catch (error) {
    console.error('addUser API error:', error);
    throw error;
  }
};
