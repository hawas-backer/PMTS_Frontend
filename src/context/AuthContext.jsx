// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/auth/status`, {
          withCredentials: true,
        });
        if (res.data.isAuthenticated) {
          setUser({
            email: res.data.user.email,
            name: res.data.user.name, // Store name
            batch: res.data.user.batch // Store batch
          });
          setRole(res.data.user.role);
          console.log('[AUTH] User authenticated:', res.data.user.email, res.data.user.role);
        }
      } catch (err) {
        setUser(null);
        setRole(null);
        console.log('[AUTH] No user authenticated:', err.response?.data.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser({
        email: res.data.user.email,
        name: res.data.user.name, // Store name
        batch: res.data.user.batch // Store batch
      });
      setRole(res.data.user.role);
      console.log('[AUTH] Login successful:', res.data.user.email, res.data.user.role);
      return res.data.user.role;
    } catch (err) {
      console.error('[AUTH] Login error:', err.response?.data.message || err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/auth/logout`, { withCredentials: true });
      setUser(null);
      setRole(null);
      console.log('[AUTH] Logged out');
    } catch (err) {
      console.error('[AUTH] Logout error:', err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default AuthProvider;