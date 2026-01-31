import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import PrivateRoute from './components/common/PrivateRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import Home from './pages/Home';
import HomeSns from './pages/HomeSns';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AdminSettings from './pages/admin/AdminSettings';
import googleAdsService from './services/googleAdsService';
import logger from './utils/logger';
import './App.css';

function App() {
  logger.debug('App component rendered');
  
  // Google Adsサービスを初期化
  useEffect(() => {
    googleAdsService.initialize();
  }, []);
  
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          {/* SNSからの導線向けページ（独立したレイアウトなし） */}
          <Route path="/sns" element={<HomeSns />} />

          {/* 一般ユーザー向けルート */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
          </Route>

          {/* 管理者向けルート */}
          <Route path="/system/login" element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route path="/system" element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } />
            <Route path="/system/analytics" element={
              <PrivateRoute>
                <AnalyticsDashboard />
              </PrivateRoute>
            } />
            <Route path="/system/settings" element={
              <PrivateRoute>
                <AdminSettings />
              </PrivateRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
