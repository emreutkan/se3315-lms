import axios from 'axios';
const API_BASE_URL = 'https://3315backend-d9hnd9dbfzg2a5gj.polandcentral-01.azurewebsites.net/api';
const api = axios.create({ baseURL: API_BASE_URL });

export const listBooks = async token => {
  console.log('listBooks called with token:', token);
  try {
    const response = await api.get('/books', { headers: { Authorization: `Bearer ${token}` } });
    console.log('listBooks response:', response);
    return response;
  } catch (error) {
    console.error('listBooks API error:', error);
    throw error;
  }
};
export const addBook = async (token, data) => {
  console.log('addBook called with token:', token, 'data:', data);
  try {
    const response = await api.post('/books', data, { headers: { Authorization: `Bearer ${token}` } });
    console.log('addBook response:', response);
    return response;
  } catch (error) {
    console.error('addBook API error:', error);
    throw error;
  }
};
export const assignBook = async (token, bookId, userId, returnDate) => {
  console.log('assignBook called with token:', token, 'bookId:', bookId, 'userId:', userId, 'returnDate:', returnDate);
  try {
    const response = await api.post('/loans/assign', { book_id: bookId, user_id: userId, return_date: returnDate }, { headers: { Authorization: `Bearer ${token}` } });
    console.log('assignBook response:', response);
    return response;
  } catch (error) {
    console.error('assignBook API error:', error);
    throw error;
  }
};
export const returnBook = async (token, bookId) => {
  console.log('returnBook called with token:', token, 'bookId:', bookId);
  try {
    const response = await api.post(`/loans/return/${bookId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    console.log('returnBook response:', response);
    return response;
  } catch (error) {
    console.error('returnBook API error:', error);
    throw error;
  }
};

