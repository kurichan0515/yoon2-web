import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import appConfig from '../../config/appConfig';
import './PublicHeader.css';

const PublicHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="public-header">
      <div className="public-header-container">
        <div className="public-header-left">
          <Link to="/" className="public-logo">
            <h1>{appConfig.shop.name}</h1>
          </Link>
        </div>
        
        <nav className={`public-navigation ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`} aria-label="メインナビゲーション">
          <Link to="/" className="nav-link" aria-label="ホームページへ移動">ホーム</Link>
          <Link to="/shop" className="nav-link" aria-label="店舗情報ページへ移動">店舗情報</Link>
          <Link to="/calendar" className="nav-link" aria-label="予約カレンダーページへ移動">予約カレンダー</Link>
          <Link to="/courses" className="nav-link" aria-label="コース情報ページへ移動">コース情報</Link>
          <a 
            href={appConfig.shop.lineUrl || appConfig.social.line.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link line-link mobile-only"
            aria-label="LINEで予約（新しいウィンドウで開きます）"
          >
            LINEから予約
          </a>
        </nav>
        
        <div className="public-header-right">
          <a 
            href={appConfig.shop.lineUrl || appConfig.social.line.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="line-button"
            aria-label="LINEで予約・お問い合わせ（新しいウィンドウで開きます）"
          >
            LINEで予約
          </a>
        </div>

        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'mobile-menu-toggle-open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default PublicHeader;
