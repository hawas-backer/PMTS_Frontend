// frontend/src/components/CoordinatorForm.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CoordinatorForm = ({ onGoogleLogin, setError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const role = await login(email, password);
      console.log('[FRONTEND] Login successful, role:', role);
      navigate(`/${role}`, { replace: true });
    } catch (err) {
      const errorMsg = err.response?.data.message || 'Login failed';
      setLocalError(errorMsg);
      setError(errorMsg);
      console.error('[FRONTEND] Login error:', errorMsg);
    }
  };

  return (
    <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">Coordinator Login</h1>
      {localError && <p className="text-red-500 text-center mb-4">{localError}</p>}
      <div className="mb-4">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2" type="submit">
        Login
      </button>
      <button
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={onGoogleLogin}
      >
        Login with Google
      </button>
    </form>
  );
};

export { CoordinatorForm };