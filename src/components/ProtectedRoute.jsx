import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" />;
  if (roles && !roles.includes(role)) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;