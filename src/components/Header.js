import React from 'react';
import './Header.css';

const Header = ({ currentPage, onPageChange }) => {
  const handleNavClick = (page) => {
    onPageChange(page);
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">耳かき屋さん</h1>
        <nav className="header-nav">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            ホーム
          </button>
          <button 
            className={`nav-link ${currentPage === 'shop' ? 'active' : ''}`}
            onClick={() => handleNavClick('shop')}
          >
            店舗情報
          </button>
          <button 
            className={`nav-link ${currentPage === 'booking' ? 'active' : ''}`}
            onClick={() => handleNavClick('booking')}
          >
            予約
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
