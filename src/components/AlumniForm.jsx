import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';

const AlumniForm = ({ onGoogleLogin, setError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(''); // Clear previous errors
    try {
      const result = await login(email, password);
      console.log('[FRONTEND] Login result:', JSON.stringify(result, null, 2)); // Log full result

      if (result.success) {
        if (result.role === 'Alumni') {
          navigate(`/alumni`, { replace: true }); // Navigate to /alumni
        } else {
          setLocalError('This account is not registered as an Alumni');
          setError('This account is not registered as an Alumni');
        }
      } else {
        setLocalError(result.message || 'Login failed');
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      console.error('[FRONTEND] Login error:', err.response?.data || err.message);
      if (err.response?.status === 401 || err.response?.status === 403) {
        if (err.response?.data?.pending) {
          setLocalError('Your alumni account is pending approval. Please contact the administrator.');
          setError('Your alumni account is pending approval. Please contact the administrator.');
        } else {
          setLocalError(err.response?.data.message || 'Login failed');
          setError(err.response?.data.message || 'Login failed');
        }
      } else {
        const errorMsg = err.response?.data.message || 'Login failed';
        setLocalError(errorMsg);
        setError(errorMsg);
      }
    }
  };

  return (
    <form className="w-full max-w-md" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">Alumni Login</h1>
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
          aria-label="Email"
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
          aria-label="Password"
        />
      </div>
      <div className="flex justify-end mb-4">
        <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
          Forgot password?
        </Link>
      </div>
      <button
        className="w-full bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 rounded mb-2"
        type="submit"
      >
        Sign In
      </button>
      <button
        className="w-full bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 rounded mb-2 flex items-center justify-center"
        type="button"
        onClick={onGoogleLogin}
      >
        <FcGoogle className="mr-2" /> Login with Google
      </button>
      <div className="flex justify-between items-center text-sm mt-4">
        <p className="text-gray-600">Don't have an account?</p>
        <Link to="/alumni-register" className="text-blue-600 hover:underline">
          Register Now
        </Link>
      </div>
    </form>
  );
};

export { AlumniForm };