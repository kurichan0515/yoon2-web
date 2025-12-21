import React, { createContext, useContext, useState, useEffect } from 'react';
import logger from '../utils/logger';

import { onAuthStateChange, checkAdminRole } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  logger.debug('AuthProvider component created');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    logger.debug('Setting up auth state listener');
    const unsubscribe = onAuthStateChange(async (user) => {
      logger.debug('Auth state changed', { hasUser: !!user });
      if (user) {
        try {
          const adminStatus = await checkAdminRole(user.uid);
          setIsAdmin(adminStatus);
        } catch (error) {
          logger.error('管理者権限チェックエラー:', error);
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
