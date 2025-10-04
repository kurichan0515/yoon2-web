import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';
import UnauthorizedPage from '../../pages/common/UnauthorizedPage';

const PrivateRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/system/login" replace />;
  }

  if (!isAdmin) {
    return <UnauthorizedPage />;
  }

  return children;
};

export default PrivateRoute;
