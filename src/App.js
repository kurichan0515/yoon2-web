import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import PrivateRoute from './components/common/PrivateRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import Home from './pages/Home';
import googleAdsService from './services/googleAdsService';
import logger from './utils/logger';
import './App.css';

/* ルート単位のコード分割: 初期バンドルを軽くし FCP/LCP を改善 */
const HomeSns = lazy(() => import('./pages/HomeSns'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AnalyticsDashboard = lazy(() => import('./components/AnalyticsDashboard'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

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
        <Suspense fallback={<LoadingSpinner message="読み込み中..." />}>
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
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
