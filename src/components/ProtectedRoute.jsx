import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useContext(AuthContext);

  console.log('ProtectedRoute check:', { user: !!user, role, loading, allowedRoles });

  // Wait for auth state to resolve
  if (loading) {
    return <div>Loading...</div>;
  }

  // No user authenticated
  if (!user) {
    console.log('No user authenticated, redirecting to /');
    return <Navigate to="/" replace />;
  }

  // Role is null or undefined, or not in allowedRoles
  if (!role || (allowedRoles && !allowedRoles.includes(role))) {
    console.log(`Access denied: Role "${role}" not allowed for [${allowedRoles}]`);
    return <Navigate to="/" replace />;
  }

  console.log(`Access granted: Role "${role}" matches [${allowedRoles}]`);
  return children;
};

export default ProtectedRoute;