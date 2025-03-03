import { createContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        console.log('User signed in:', firebaseUser.email);
        try {
          const res = await axios.get('http://localhost:5000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Role fetched from /me:', res.data.role);
          setUser(firebaseUser);
          setRole(res.data.role || null); // Ensure role is null if undefined
        } catch (err) {
          console.error('Failed to fetch role:', err.response?.data || err.message);
          setUser(firebaseUser); // Keep user but no role
          setRole(null); // Role fetch failed
        }
      } else {
        console.log('No user signed in');
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const googleLogin = async (role) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      console.log('Google token:', token);
      const res = await axios.post(
        'http://localhost:5000/api/auth/google-login',
        { firebaseUid: result.user.uid, email: result.user.email, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Google login response:', res.data);
      setRole(res.data.role);
      return { email: result.user.email, role: res.data.role };
    } catch (err) {
      throw new Error(err.response?.data.message || 'Google login failed: ' + err.message);
    }
  };

  const emailLogin = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      const res = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Email login role:', res.data.role);
      setRole(res.data.role);
      return res.data.role;
    } catch (err) {
      throw new Error('Email login failed: ' + err.message);
    }
  };

  const register = async (email, password, role) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      email,
      firebaseUid: result.user.uid,
      role,
    });
    return res.data.otpToken;
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, googleLogin, emailLogin, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};