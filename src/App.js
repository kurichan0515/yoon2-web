import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminHeader from './components/AdminHeader';
import Home from './pages/Home';
import ShopInfo from './pages/ShopInfo';
import Booking from './pages/Booking';
import BookingConfirmation from './pages/BookingConfirmation';
import CalendarPage from './pages/CalendarPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminBookingDetails from './components/AdminBookingDetails';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import CourseCreatePage from './pages/CourseCreatePage';
import CoursePage from './pages/CoursePage';
import { onAuthStateChange, checkAdminRole } from './services/authService';
import appConfig from './config/appConfig';
import { logConfigValidation } from './utils/configValidator';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  // const [isAdmin, setIsAdmin] = useState(false); // 未使用のためコメントアウト
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 設定検証（開発モードのみ）
    logConfigValidation(appConfig);

    // URLパラメータをチェック
    const urlParams = new URLSearchParams(window.location.search);
    const adminParam = urlParams.get('admin');
    
    if (adminParam === 'login') {
      setCurrentPage('admin-login');
    }

    // 認証状態を監視
    const unsubscribe = onAuthStateChange(async (user) => {
      if (user) {
        // 管理者権限をチェック
        // const hasAdminRole = await checkAdminRole(user.uid);
        // setIsAdmin(hasAdminRole);
        if (currentPage === 'home') {
          setCurrentPage('admin-dashboard');
        }
      } else {
        // setIsAdmin(false);
        if (currentPage === 'admin-dashboard' || currentPage === 'analytics' || currentPage === 'admin-booking-details') {
          setCurrentPage('home');
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [currentPage]);

  const handleAdminLogin = () => {
    setCurrentPage('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'shop':
        return <ShopInfo />;
      case 'booking':
        return <Booking />;
      case 'booking-confirmation':
        return <BookingConfirmation />;
      case 'calendar':
        return <CalendarPage />;
      case 'admin-login':
        return <AdminLogin onLoginSuccess={handleAdminLogin} />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'admin-booking-details':
        return <AdminBookingDetails />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'course-create':
        return <CourseCreatePage onNavigate={setCurrentPage} />;
      case 'course':
        return <CoursePage onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigateToBooking={setCurrentPage} />;
    }
  };

  const renderHeader = () => {
    if (currentPage === 'admin-dashboard' || currentPage === 'admin-booking-details' || currentPage === 'analytics') {
      return <AdminHeader onLogout={handleAdminLogout} />;
    } else if (currentPage === 'admin-login') {
      return null; // ログインページではヘッダーを表示しない
    } else {
      return <Header currentPage={currentPage} onPageChange={setCurrentPage} />;
    }
  };

  const renderFooter = () => {
    if (currentPage === 'admin-login' || currentPage === 'admin-dashboard' || currentPage === 'admin-booking-details' || currentPage === 'analytics') {
      return null; // 管理者ページではフッターを表示しない
    } else {
      return <Footer />;
    }
  };

  if (isLoading) {
    return (
      <div className="App">
        <div className="loading-screen">
          <h2>読み込み中...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {renderHeader()}
      <main className="main-content">
        {renderPage()}
      </main>
      {renderFooter()}
    </div>
  );
}

export default App;
