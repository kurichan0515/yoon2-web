'use client';

import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';
import UnauthorizedPage from '../../views/common/UnauthorizedPage';

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/system/login');
  }, [loading, user, router]);

  if (loading || !user) return <LoadingSpinner />;
  if (!isAdmin) return <UnauthorizedPage />;
  return <>{children}</>;
};

export default PrivateRoute;
