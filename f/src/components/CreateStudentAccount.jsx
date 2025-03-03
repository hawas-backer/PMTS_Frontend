import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const CreateStudentAccount = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== reEnterPassword) {
      setError('Passwords do not match!');
      return;
    }
    try {
      if (!user) throw new Error('User not authenticated');
      const token = await user.getIdToken();
      await axios.post(
        'http://localhost:5000/api/auth/update-profile',
        { name, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/student');
    } catch (err) {
      setError('Failed to create account: ' + err.message);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <form className="bg-white p-8 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
          Create Student Account
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-6">
          <input
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="border-b border-gray-300 mb-6"></div>
        </div>
        <div className="mb-6">
          <input
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="border-b border-gray-300 mb-6"></div>
        </div>
        <div className="mb-6">
          <input
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="password"
            placeholder="Re-enter your password"
            value={reEnterPassword}
            onChange={(e) => setReEnterPassword(e.target.value)}
            required
          />
          <div className="border-b border-gray-300 mb-6"></div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateStudentAccount;