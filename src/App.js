import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import PrivateRoute from './components/common/PrivateRoute';
import Home from './pages/Home';
import ShopInfo from './pages/ShopInfo';
import CalendarPage from './pages/CalendarPage';
import CoursePage from './pages/CoursePage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AdminSettings from './pages/admin/AdminSettings';
import './App.css';

function App() {
  console.log('🔥 [App Debug] App component rendered');
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 一般ユーザー向けルート */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<ShopInfo />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="courses" element={<CoursePage />} />
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
  );
}

export default App;
