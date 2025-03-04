// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, role, loading } = useAuth();

  console.log('ProtectedRoute check:', { user: !!user, role, loading, allowedRoles });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('No user authenticated, redirecting to /');
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    console.log(`Role ${role} not allowed for this route, redirecting to /`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;