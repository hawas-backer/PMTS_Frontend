import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'Student') navigate('/student');
    else if (role === 'Alumni') navigate('/alumni');
    else if (role === 'Coordinator') navigate('/coordinator');
    else if (role === 'Advisor') navigate('/advisor');
    else navigate('/');
  }, [role, navigate]);

  return <div>Redirecting to your dashboard...</div>;
};

export default Dashboard;