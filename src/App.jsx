import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

function AppContent() {
  const { user } = useContext(AuthContext);

  if (!user) return <LoginForm />;
  return user.isAdmin ? <AdminDashboard /> : <UserDashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

