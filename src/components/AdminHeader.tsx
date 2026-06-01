'use client';

import React from 'react';
import { signOutAdmin } from '../services/authService';
import './AdminHeader.css';

interface Props {
  onLogout: () => void;
}

const AdminHeader = ({ onLogout }: Props) => {
  const handleLogout = async () => {
    if (!window.confirm('ログアウトしますか？')) return;
    try {
      await signOutAdmin();
      onLogout();
    } catch {
      alert('ログアウトに失敗しました');
    }
  };

  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <div className="admin-header-left">
          <h1 className="admin-header-title">管理者ダッシュボード</h1>
          <span className="admin-subtitle">yoon² 管理システム</span>
        </div>
        <div className="admin-header-right">
          <div className="admin-user-info">
            <span className="admin-role">管理者</span>
            <span className="admin-name">Admin User</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">ログアウト</button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
