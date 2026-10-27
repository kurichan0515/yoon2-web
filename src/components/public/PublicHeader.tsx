'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './PublicHeader.css';
import appConfig from '../../config/appConfig';
import { trackLineClick } from '../../services/analyticsService';

const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'MENU', href: '/#menu' },
  { label: 'ABOUT', href: '/about' },
  { label: 'ACCESS', href: '/#access' },
  { label: 'CONTACT', href: '/#reserve' },
];

const PublicHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ヒーロー（暗い写真面）を持つトップのみ、スクロール前は透過・白文字
  const hasHero = pathname === '/';
  const isTransparent = hasHero && !isScrolled && !isMenuOpen;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const diff = currentScrollY - lastScrollY.current;

          if (currentScrollY < 100) {
            setIsVisible(true);
            setIsScrolled(false);
          } else {
            setIsScrolled(true);
            if (diff > 5) {
              setIsVisible(false);
              if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
              scrollTimeout.current = setTimeout(() => setIsVisible(true), 150);
            } else if (diff < -5) {
              setIsVisible(true);
              if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            }
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    closeMenu();
    if (pathname !== '/') return;
    if (href === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const hash = href.split('#')[1];
    const target = hash ? document.getElementById(hash) : null;
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const lineUrl = appConfig.shop.lineUrl || appConfig.social.line.url;

  return (
    <header
      className={[
        'public-header',
        isVisible || isMenuOpen ? 'header-visible' : 'header-hidden',
        isScrolled ? 'header-scrolled' : '',
        isTransparent ? 'header-transparent' : '',
        isMenuOpen ? 'header-menu-open' : '',
      ].filter(Boolean).join(' ')}
    >
      <div className="public-header-container">
        <div className="public-header-left">
          <Link
            href="/"
            className="public-logo"
            onClick={(e) => handleNavClick(e, '/')}
          >
            <p className="public-logo-text">yoon<sup>2</sup></p>
          </Link>
        </div>

        <nav className="public-navigation" aria-label="メインナビゲーション">
          <ul className="public-nav-list">
            {NAV_ITEMS.map(item => (
              <li key={item.label}>
                <Link href={item.href} className="nav-link" onClick={(e) => handleNavClick(e, item.href)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="line-button"
            onClick={() => trackLineClick('Header')}
          >
            LINEで予約
            <span className="visually-hidden">（新しいウィンドウで開きます）</span>
          </a>
        </nav>

        <button
          type="button"
          className={`mobile-menu-toggle${isMenuOpen ? ' mobile-menu-toggle-open' : ''}`}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-drawer"
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          onClick={() => setIsMenuOpen(v => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-drawer" className={`mobile-drawer${isMenuOpen ? ' mobile-drawer-open' : ''}`} hidden={!isMenuOpen}>
        <ul className="mobile-drawer-list">
          {NAV_ITEMS.map(item => (
            <li key={item.label}>
              <Link href={item.href} className="mobile-drawer-link" onClick={(e) => handleNavClick(e, item.href)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mobile-drawer-cta"
          onClick={() => { trackLineClick('Header Drawer'); closeMenu(); }}
        >
          LINEで予約
          <span className="visually-hidden">（新しいウィンドウで開きます）</span>
        </a>
      </div>
    </header>
  );
};

export default PublicHeader;
