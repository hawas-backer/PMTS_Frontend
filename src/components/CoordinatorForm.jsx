import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CoordinatorForm = ({ onGoogleLogin }) => {
  const { emailLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const role = await emailLogin(email, password);
      console.log('Coordinator login successful, role:', role);
      navigate(`/${role.toLowerCase()}`, { replace: true });
    } catch (err) {
      setError('Invalid email or password: ' + err.message);
      console.error('Coordinator login error:', err);
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col justify-center items-center">
        <form className="bg-white p-8 rounded" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">Coordinator Login</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
          <div className="mt-4 flex justify-center items-center">
            <p className="font-medium text-base">Don't have an account?</p>
            <Link to="/register" className="ml-2 font-medium text-base text-blue-800">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export { CoordinatorForm }; // Named export