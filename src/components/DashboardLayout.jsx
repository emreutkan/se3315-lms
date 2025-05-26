import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function DashboardLayout({ children }) {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="app">
      <header className="dashboard-header">
        <h1>{user.isAdmin ? 'Admin Panel' : 'User Panel'}</h1>
        <div className="user-info">
          <div className="user-badge">{user.isAdmin ? 'Administrator' : 'User'}</div>
          <span>Welcome, {user.username}</span>
          <button className="logout-btn" onClick={logout}>Log Out</button>
        </div>
      </header>
      <main className="dashboard-container">{children}</main>
    </div>
  );
}

