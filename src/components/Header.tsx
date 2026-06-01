'use client';

import React, { useState, useEffect } from 'react';
import './Header.css';

interface Props {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header = ({ currentPage, onPageChange }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  const navItems: { page: string; label: string; extra?: string }[] = [
    { page: 'home',          label: 'ホーム' },
    { page: 'shop',          label: '店舗情報' },
    { page: 'calendar',      label: '予約状況' },
    { page: 'booking',       label: '予約・お問い合わせ' },
    { page: 'booking',       label: 'LINEで予約', extra: 'nav-link-booking' },
    { page: 'course-create', label: 'コース作成' },
  ];

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-logo">
          <h1 className="header-title">yoon²</h1>
          <span className="header-subtitle">ear esthetic &amp; acupressure salon</span>
        </div>
        <nav className={`header-nav ${isMobileMenuOpen ? 'header-nav-open' : ''}`}>
          {navItems.map(({ page, label, extra }, i) => (
            <button
              key={i}
              className={`nav-link ${extra ?? ''} ${currentPage === page ? 'active' : ''}`}
              onClick={() => handleNavClick(page)}
              data-page={page}
            >
              {label}
            </button>
          ))}
        </nav>
        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'mobile-menu-toggle-open' : ''}`}
          onClick={() => setIsMobileMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
