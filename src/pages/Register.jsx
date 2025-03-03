import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpToken, setOtpToken] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Checking email:', email);
      const res = await axios.post('http://localhost:5000/api/auth/check-email', { email });
      if (res.data.allowed) {
        const otpRes = await axios.post('http://localhost:5000/api/auth/send-registration-otp', { email });
        console.log('OTP token received:', otpRes.data.otpToken);
        setOtpToken(otpRes.data.otpToken);
        setOtpSent(true);
      } else {
        setError(res.data.message || 'This email is not allowed to register');
      }
    } catch (err) {
      setError(err.response?.data.message || 'Error checking email');
      console.error('Email check error:', err);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Verifying OTP:', { otpToken, otp });
      const res = await axios.post('http://localhost:5000/api/auth/verify-and-set-password', {
        email,
        otp,
        password,
        otpToken,
      });
      console.log('Password set response:', res.data);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data.message || 'OTP verification failed');
      console.error('OTP verification error:', err);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">Register</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {!otpSent ? (
          <form onSubmit={handleEmailSubmit}>
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
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <div className="mb-4">
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="password"
                placeholder="Set Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Verify and Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;