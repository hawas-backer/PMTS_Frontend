import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get API base URL from environment variable or use default
  const API_BASE_URL =  'http://localhost:8080';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/auth/status`, {
          withCredentials: true,
        });
        
        if (res.data.isAuthenticated) {
          setUser({
            email: res.data.user.email,
            name: res.data.user.name,
            batch: res.data.user.batch,
          });
          setRole(res.data.user.role);
          console.log('[AUTH] User authenticated:', res.data.user.email, res.data.user.role);
        }
      } catch (error) {
        console.error('[AUTH] No user authenticated:', error.response?.data.message || error.message);
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [API_BASE_URL]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      
      setUser({
        email: res.data.user.email,
        name: res.data.user.name,
        batch: res.data.user.batch,
      });
      setRole(res.data.user.role);
      
      console.log('[AUTH] Login successful:', res.data.user.email, res.data.user.role);
      
      return { 
        success: true, 
        user: res.data.user,
        role: res.data.user.role 
      };
    } catch (error) {
      console.error('[AUTH] Login error:', error.response?.data.message || error.message);
      return { 
        success: false, 
        message: error.response?.data.message || 'Login failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/auth/logout`, { withCredentials: true });
      setUser(null);
      setRole(null);
      console.log('[AUTH] Logged out');
      return { success: true };
    } catch (error) {
      console.error('[AUTH] Logout error:', error.response?.data.message || error.message);
      return { 
        success: false, 
        message: error.response?.data.message || 'Logout failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/send-alumni-otp`,
        userData,
        { withCredentials: true }
      );
      
      console.log('[AUTH] Alumni registration initiated:', userData.email);
      
      return { 
        success: true, 
        otpToken: res.data.otpToken,
        message: res.data.message 
      };
    } catch (error) {
      console.error('[AUTH] Registration error:', error.response?.data.message || error.message);
      return { 
        success: false, 
        message: error.response?.data.message || 'Registration failed' 
      };
    }
  };

  const verifyOTP = async (otpToken, otp) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/verify-alumni-password`,
        { otpToken, otp },
        { withCredentials: true }
      );
      
      return { 
        success: true, 
        message: res.data.message 
      };
    } catch (error) {
      console.error('[AUTH] OTP verification failed:', error.response?.data.message || error.message);
      return { 
        success: false, 
        message: error.response?.data.message || 'OTP verification failed' 
      };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role, 
      loading, 
      login, 
      logout, 
      register, 
      verifyOTP 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;