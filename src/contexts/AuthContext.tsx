'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from 'firebase/auth';
import logger from '../utils/logger';

interface AuthContextValue {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};
    import('../services/authService').then(({ onAuthStateChange, checkAdminRole }) => {
      unsubscribe = onAuthStateChange(async (authUser: User | null) => {
        if (authUser) {
          try {
            setIsAdmin(await checkAdminRole(authUser.uid));
          } catch (e) {
            logger.error('管理者権限チェックエラー:', e);
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
        setUser(authUser);
        setLoading(false);
      });
    }).catch(e => {
      logger.error('Auth service load error:', e);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
