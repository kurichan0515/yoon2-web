import React, { createContext, useContext, useState, useEffect } from 'react';
import logger from '../utils/logger';

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
    let unsubscribe = () => {};
    import('../services/authService').then((authModule) => {
      const { onAuthStateChange, checkAdminRole } = authModule;
      logger.debug('Setting up auth state listener');
      unsubscribe = onAuthStateChange(async (authUser) => {
        logger.debug('Auth state changed', { hasUser: !!authUser });
        if (authUser) {
          try {
            const adminStatus = await checkAdminRole(authUser.uid);
            setIsAdmin(adminStatus);
          } catch (error) {
            logger.error('管理者権限チェックエラー:', error);
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
        setUser(authUser);
        setLoading(false);
      });
    }).catch((err) => {
      logger.error('Auth service load error:', err);
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
