import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const { sub: username, is_admin } = decoded;
        // Ensure is_admin is properly converted to boolean
        const isAdminBool = is_admin === true || is_admin === 'true' || is_admin === 1;
        console.log('JWT decoded:', { ...decoded, username, is_admin, convertedToBoolean: isAdminBool });
        setUser({ username, isAdmin: isAdminBool, token });
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('access_token'); // Remove invalid token
      }
    }
  }, []);

  const login = token => {
    localStorage.setItem('access_token', token);
    try {
      const decoded = jwtDecode(token);
      const { sub: username, is_admin } = decoded;
      // Ensure is_admin is properly converted to boolean, default to false if undefined
      const isAdminBool = is_admin === true || is_admin === 'true' || is_admin === 1;
      console.log('Login JWT decoded:', { ...decoded, username, is_admin, convertedToBoolean: isAdminBool });
      setUser({ username, isAdmin: isAdminBool, token });
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

