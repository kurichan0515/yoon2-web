import React, { useState, useEffect } from 'react';
import appConfig from '../config/appConfig';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // ページの一番上にスクロール
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>管理者ダッシュボード</h1>
          <p>yoon² 管理システム</p>
        </div>

        {/* 管理機能メニュー */}
        <div className="admin-menu">
          <div className="menu-grid">
            <div className="menu-card">
              <div className="menu-icon">📊</div>
              <h3>アナリティクス</h3>
              <p>ページビュー分析</p>
              <button 
                className="menu-button"
                onClick={() => window.location.href = '/analytics'}
              >
                アナリティクスを見る
              </button>
            </div>

            <div className="menu-card">
              <div className="menu-icon">📅</div>
              <h3>予約詳細</h3>
              <p>Googleカレンダー連携</p>
              <button 
                className="menu-button"
                onClick={() => window.location.href = '/admin-booking-details'}
              >
                予約詳細を見る
              </button>
            </div>

            <div className="menu-card">
              <div className="menu-icon">🏪</div>
              <h3>店舗情報</h3>
              <p>基本情報の管理</p>
              <button 
                className="menu-button"
                onClick={() => window.location.href = '/shop'}
              >
                店舗情報を確認
              </button>
            </div>

            <div className="menu-card">
              <div className="menu-icon">📱</div>
              <h3>LINE連携</h3>
              <p>公式LINE設定</p>
              <button 
                className="menu-button"
                onClick={() => window.open('https://lin.ee/lyyKSqu', '_blank')}
              >
                LINE設定を確認
              </button>
            </div>
          </div>
        </div>

        {/* システム情報 */}
        <div className="system-info">
          <h3>システム情報</h3>
          <div className="info-grid">
            <div className="info-card">
              <h4>店舗名</h4>
              <p>{appConfig.shop.name}</p>
            </div>
            <div className="info-card">
              <h4>電話番号</h4>
              <p>{appConfig.shop.phone}</p>
            </div>
            <div className="info-card">
              <h4>営業時間</h4>
              <p>{appConfig.shop.hours.weekday}</p>
            </div>
            <div className="info-card">
              <h4>定休日</h4>
              <p>{appConfig.shop.holidays}</p>
            </div>
          </div>
        </div>

        {/* 注意事項 */}
        <div className="admin-notice">
          <h3>📝 管理に関する注意事項</h3>
          <ul>
            <li>予約管理はGoogleカレンダーで行ってください</li>
            <li>LINE公式アカウントでの予約受付を優先してください</li>
            <li>ページビュー分析でアクセス状況を確認できます</li>
            <li>店舗情報の変更は設定ファイルで行ってください</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
