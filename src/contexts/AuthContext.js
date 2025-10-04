import React, { createContext, useContext, useState, useEffect } from 'react';
console.log('🔥 [AuthContext Debug] AuthContext.js loaded');

import { onAuthStateChange, checkAdminRole } from '../services/authService';
console.log('🔥 [AuthContext Debug] authService imports completed');

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  console.log('🔥 [AuthContext Debug] AuthProvider component created');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔥 [AuthContext Debug] useEffect called, setting up auth state listener');
    const unsubscribe = onAuthStateChange(async (user) => {
      console.log('🔥 [AuthContext Debug] onAuthStateChange callback triggered with user:', !!user);
      if (user) {
        try {
          const adminStatus = await checkAdminRole(user.uid);
          setIsAdmin(adminStatus);
        } catch (error) {
          console.error('管理者権限チェックエラー:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    isAdmin,
    loading,
    setUser,
    setIsAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
