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
        
        <nav className={`public-navigation ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <Link to="/" className="nav-link">ホーム</Link>
          <Link to="/shop" className="nav-link">店舗情報</Link>
          <Link to="/calendar" className="nav-link">予約カレンダー</Link>
          <Link to="/courses" className="nav-link">コース情報</Link>
          <a 
            href={appConfig.shop.lineUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link line-link mobile-only"
          >
            LINEから予約
          </a>
        </nav>
        
        <div className="public-header-right">
          <a 
            href={appConfig.shop.lineUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="line-button"
          >
            LINEで予約
          </a>
        </div>

        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'mobile-menu-toggle-open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
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
