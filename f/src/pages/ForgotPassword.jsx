import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = `${username}@gcek.ac.in`;
    try {
      await sendPasswordResetEmail(auth, email);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      setError('Failed to send reset email');
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">
          Forgot Password
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
        {showPopup && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white border border-blue-600 shadow-lg rounded px-6 py-4">
            <p className="text-blue-800 font-medium">
              A password reset link has been sent to{' '}
              <span className="font-bold">{username}@gcek.ac.in</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;