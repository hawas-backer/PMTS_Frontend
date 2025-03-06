import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';

const AdvisorForm = ({ onGoogleLogin, setError }) => {
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
    <form className="w-full max-w-md" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">Advisor Login</h1>
      {localError && <p className="text-red-500 text-center mb-4">{localError}</p>}
      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-1" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        className="w-full bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 rounded mb-2"
        type="submit"
      >
        Login
      </button>
      <button
        className="w-full bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 rounded mb-2 flex items-center justify-center"
        type="button"
        onClick={onGoogleLogin}
      >
        <FcGoogle className="mr-2" /> Login with Google
      </button>
    </form>
  );
};

export { AdvisorForm };