import React from 'react';
import { signOutAdmin } from '../services/authService';
import './AdminHeader.css';

const AdminHeader = ({ onLogout }) => {
  const handleLogout = async () => {
    if (window.confirm('ログアウトしますか？')) {
      try {
        await signOutAdmin();
        onLogout();
      } catch (error) {
        console.error('ログアウトエラー:', error);
        alert('ログアウトに失敗しました');
      }
    }
  };

  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <div className="admin-header-left">
          <h1 className="admin-header-title">管理者ダッシュボード</h1>
          <span className="admin-subtitle">耳かき屋さん 管理システム</span>
        </div>
        
        <div className="admin-header-right">
          <div className="admin-user-info">
            <span className="admin-role">管理者</span>
            <span className="admin-name">Admin User</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            ログアウト
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
