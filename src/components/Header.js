import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ currentPage, onPageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-logo">
          <h1 className="header-title">yoon²</h1>
          <span className="header-subtitle">ear esthetic & acupressure salon</span>
        </div>
        
        <nav className={`header-nav ${isMobileMenuOpen ? 'header-nav-open' : ''}`}>
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
            className={`nav-link ${currentPage === 'calendar' ? 'active' : ''}`}
            onClick={() => handleNavClick('calendar')}
          >
            予約状況
          </button>
          <button 
            className={`nav-link ${currentPage === 'booking' ? 'active' : ''}`}
            onClick={() => handleNavClick('booking')}
          >
            予約・お問い合わせ
          </button>
          <button 
            className="nav-link nav-link-booking"
            onClick={() => handleNavClick('booking')}
          >
            LINEで予約
          </button>
        </nav>

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

export default Header;
