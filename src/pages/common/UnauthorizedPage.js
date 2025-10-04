import React from 'react';
import { Link } from 'react-router-dom';
import './UnauthorizedPage.css';

const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-page">
      <div className="unauthorized-container">
        <div className="unauthorized-icon">🚫</div>
        <h1>アクセス権限がありません</h1>
        <p>このページにアクセスするには管理者権限が必要です。</p>
        <div className="unauthorized-actions">
          <Link to="/" className="btn btn-primary">
            ホームに戻る
          </Link>
          <Link to="/system/login" className="btn btn-secondary">
            管理者ログイン
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
