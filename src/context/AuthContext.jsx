import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const { sub: username, is_admin } = jwtDecode(token);
      setUser({ username, isAdmin: is_admin, token });
    }
  }, []);

  const login = token => {
    localStorage.setItem('access_token', token);
    const { sub: username, is_admin } = jwtDecode(token);
    setUser({ username, isAdmin: is_admin, token });
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

