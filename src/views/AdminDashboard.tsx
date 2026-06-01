'use client';

import React, { useEffect } from 'react';
import appConfig from '../config/appConfig';
import './AdminDashboard.css';

const AdminDashboard = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const openUrl = (url: string) => {
    const w = window.open(url, '_blank', 'noopener,noreferrer');
    if (!w) window.location.href = url;
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>管理者ダッシュボード</h1>
          <p>yoon² 管理システム</p>
        </div>
        <div className="admin-menu">
          <div className="menu-grid">
            {[
              { icon: '📊', title: 'アナリティクス', desc: 'ページビュー分析', label: 'アナリティクスを見る', href: '/analytics' },
              { icon: '📅', title: '予約詳細', desc: 'Googleカレンダー連携', label: '予約詳細を見る', href: '/admin-booking-details' },
              { icon: '🏪', title: '店舗情報', desc: '基本情報の管理', label: 'ホームページで店舗情報を確認', href: '/' },
              { icon: '📱', title: 'LINE連携', desc: '公式LINE設定', label: 'LINE設定を確認', href: 'https://lin.ee/lyyKSqu' },
            ].map(({ icon, title, desc, label, href }) => (
              <div key={title} className="menu-card">
                <div className="menu-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <button className="menu-button" onClick={() => openUrl(href)}>{label}</button>
              </div>
            ))}
          </div>
        </div>
        <div className="system-info">
          <h3>システム情報</h3>
          <div className="info-grid">
            {[
              ['店舗名', appConfig.shop.name],
              ['電話番号', appConfig.shop.phone],
              ['営業時間', appConfig.shop.hours.weekday],
              ['定休日', appConfig.shop.holidays],
            ].map(([label, value]) => (
              <div key={label} className="info-card">
                <h4>{label}</h4>
                <p>{value as string}</p>
              </div>
            ))}
          </div>
        </div>
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
