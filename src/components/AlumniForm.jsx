import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const AlumniForm = ({ onGoogleLogin }) => {
  const { emailLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailLogin(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col justify-center items-center">
        <form className="bg-white p-8 rounded" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">
            Alumni Login
          </h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="border-b border-gray-300 mb-6"></div>
          </div>
          <div className="mb-6">
            <input
              className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="border-b border-gray-300 mb-6"></div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
          <button
            type="button"
            onClick={onGoogleLogin}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Login with Google
          </button>
          <div className="text-blue-600 hover:text-blue-800 text-sm mt-4 flex justify-center">
            <Link
              className="text-blue-600 hover:text-blue-800 text-sm flex justify-center"
              to="/forgotpassword"
            >
              Forgot password?
            </Link>
          </div>
          <div className="mt-8 flex justify-center items-center">
            <p className="font-medium text-base">Don't have an account?</p>
            <Link
              to="/alumniregister"
              className="ml-2 font-medium text-base text-blue-800"
            >
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};